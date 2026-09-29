import SummaryCard from './SummaryCard';
import CategoryChart from './CategoryChart';
import {
  formatCurrency,
  getTotalExpenses,
  getTotalAmount,
  getCurrentMonthSpending,
  getHighestSpendingCategory,
} from '../utils/calculations';

function Dashboard({ expenses, onLoadSampleData }) {
  const totalExpenses = getTotalExpenses(expenses);
  const totalAmount = getTotalAmount(expenses);
  const monthSpending = getCurrentMonthSpending(expenses);
  const topCategory = getHighestSpendingCategory(expenses);

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your spending habits</p>
        </div>
        {expenses.length === 0 && (
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={onLoadSampleData}>
            <i className="bi bi-download me-1"></i>
            Load Sample Data
          </button>
        )}
      </div>

      <div className="row g-3 mb-4">
        <SummaryCard
          title="Total Expenses"
          value={totalExpenses}
          icon="bi-receipt"
          accent="blue"
        />
        <SummaryCard
          title="Total Spent"
          value={formatCurrency(totalAmount)}
          icon="bi-currency-rupee"
          accent="green"
        />
        <SummaryCard
          title="This Month"
          value={formatCurrency(monthSpending)}
          icon="bi-calendar-month"
          accent="orange"
        />
        <SummaryCard
          title="Top Category"
          value={topCategory}
          icon="bi-trophy"
          accent="purple"
        />
      </div>

      <div className="content-card">
        <h2 className="content-card__title">
          <i className="bi bi-pie-chart me-2"></i>
          Spending by Category
        </h2>
        <CategoryChart expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
