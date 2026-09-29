import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import { loadExpenses, saveExpenses, getSampleExpenses } from './utils/storage';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setExpenses(loadExpenses());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveExpenses(expenses);
    }
  }, [expenses, isLoaded]);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
    setActiveView('expenses');
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleLoadSampleData = () => {
    setExpenses(getSampleExpenses());
  };

  const renderView = () => {
    switch (activeView) {
      case 'expenses':
        return <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />;
      case 'add':
        return <ExpenseForm onAddExpense={handleAddExpense} />;
      case 'dashboard':
      default:
        return (
          <Dashboard expenses={expenses} onLoadSampleData={handleLoadSampleData} />
        );
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <main className="container app-main">{renderView()}</main>
      <footer className="app-footer">
        <div className="container text-center">
          <small>Student Expense Tracker &mdash; Built with React</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
