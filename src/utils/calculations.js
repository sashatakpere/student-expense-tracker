export const CATEGORIES = [
  'Food',
  'Travel',
  'Education',
  'Shopping',
  'Entertainment',
  'Other',
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTotalExpenses(expenses) {
  return expenses.length;
}

export function getTotalAmount(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getCurrentMonthSpending(expenses) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses
    .filter((expense) => {
      const date = new Date(expense.date + 'T00:00:00');
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
}

export function getCategoryTotals(expenses) {
  const totals = {};
  CATEGORIES.forEach((cat) => {
    totals[cat] = 0;
  });

  expenses.forEach((expense) => {
    if (totals[expense.category] !== undefined) {
      totals[expense.category] += expense.amount;
    } else {
      totals['Other'] += expense.amount;
    }
  });

  return totals;
}

export function getHighestSpendingCategory(expenses) {
  if (expenses.length === 0) return '—';

  const totals = getCategoryTotals(expenses);
  let highest = '—';
  let maxAmount = 0;

  Object.entries(totals).forEach(([category, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      highest = category;
    }
  });

  return maxAmount > 0 ? highest : '—';
}

export function filterAndSortExpenses(expenses, { search, category, sortBy }) {
  let result = [...expenses];

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    result = result.filter(
      (expense) =>
        expense.title.toLowerCase().includes(query) ||
        (expense.description && expense.description.toLowerCase().includes(query))
    );
  }

  if (category && category !== 'All') {
    result = result.filter((expense) => expense.category === category);
  }

  switch (sortBy) {
    case 'oldest':
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'highest':
      result.sort((a, b) => b.amount - a.amount);
      break;
    case 'lowest':
      result.sort((a, b) => a.amount - b.amount);
      break;
    case 'newest':
    default:
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  return result;
}
