import { formatCurrency, formatDate } from '../utils/calculations';

const CATEGORY_BADGES = {
  Food: 'badge-food',
  Travel: 'badge-travel',
  Education: 'badge-education',
  Shopping: 'badge-shopping',
  Entertainment: 'badge-entertainment',
  Other: 'badge-other',
};

function ExpenseItem({ expense, onDelete, layout }) {
  const badgeClass = CATEGORY_BADGES[expense.category] || 'badge-other';

  if (layout === 'card') {
    return (
      <div className="expense-card">
        <div className="expense-card__header">
          <h3 className="expense-card__title">{expense.title}</h3>
          <span className="expense-card__amount">{formatCurrency(expense.amount)}</span>
        </div>
        <div className="expense-card__meta">
          <span className={`category-badge ${badgeClass}`}>{expense.category}</span>
          <span className="expense-card__date">
            <i className="bi bi-calendar3 me-1"></i>
            {formatDate(expense.date)}
          </span>
        </div>
        {expense.description && (
          <p className="expense-card__description">{expense.description}</p>
        )}
        <button
          type="button"
          className="btn btn-outline-danger btn-sm mt-2"
          onClick={() => onDelete(expense.id)}
        >
          <i className="bi bi-trash me-1"></i>
          Delete
        </button>
      </div>
    );
  }

  return (
    <tr>
      <td className="fw-medium">{expense.title}</td>
      <td className="text-end fw-semibold">{formatCurrency(expense.amount)}</td>
      <td>
        <span className={`category-badge ${badgeClass}`}>{expense.category}</span>
      </td>
      <td>{formatDate(expense.date)}</td>
      <td className="text-muted">{expense.description || '—'}</td>
      <td className="text-end">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.title}`}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
