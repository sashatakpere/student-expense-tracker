import { useState } from 'react';
import ExpenseFilters from './ExpenseFilters';
import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';
import { filterAndSortExpenses } from '../utils/calculations';

function ExpenseList({ expenses, onDelete }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredExpenses = filterAndSortExpenses(expenses, { search, category, sortBy });
  const hasExpenses = expenses.length > 0;
  const hasResults = filteredExpenses.length > 0;

  const handleDelete = (id) => {
    const expense = expenses.find((e) => e.id === id);
    const confirmed = window.confirm(
      `Are you sure you want to delete "${expense?.title || 'this expense'}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1 className="page-title">Expenses</h1>
          <p className="page-subtitle">View, search, and manage your expenses</p>
        </div>
      </div>

      {hasExpenses && (
        <div className="content-card mb-4">
          <ExpenseFilters
            search={search}
            category={category}
            sortBy={sortBy}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onSortChange={setSortBy}
          />
        </div>
      )}

      <div className="content-card">
        {!hasExpenses && (
          <EmptyState message="No expenses recorded yet. Add your first expense." />
        )}

        {hasExpenses && !hasResults && (
          <EmptyState
            message="No expenses match your search or filter."
            icon="bi-search"
          />
        )}

        {hasResults && (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover expense-table mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th className="text-end">Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      onDelete={handleDelete}
                      layout="table"
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-none expense-cards">
              {filteredExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={handleDelete}
                  layout="card"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
