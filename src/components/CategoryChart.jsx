import { CATEGORIES, formatCurrency, getCategoryTotals } from '../utils/calculations';

const CATEGORY_COLORS = {
  Food: '#e74c3c',
  Travel: '#3498db',
  Education: '#2ecc71',
  Shopping: '#f39c12',
  Entertainment: '#9b59b6',
  Other: '#95a5a6',
};

function CategoryChart({ expenses }) {
  const totals = getCategoryTotals(expenses);
  const maxTotal = Math.max(...Object.values(totals), 1);
  const hasData = expenses.length > 0;

  if (!hasData) {
    return (
      <div className="chart-empty">
        <i className="bi bi-bar-chart"></i>
        <p>Add expenses to see category breakdown</p>
      </div>
    );
  }

  return (
    <div className="category-chart">
      {CATEGORIES.map((category) => {
        const amount = totals[category];
        const percentage = (amount / maxTotal) * 100;

        return (
          <div className="chart-row" key={category}>
            <div className="chart-row__header">
              <span className="chart-row__label">
                <span
                  className="chart-row__dot"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                ></span>
                {category}
              </span>
              <span className="chart-row__amount">{formatCurrency(amount)}</span>
            </div>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: CATEGORY_COLORS[category],
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryChart;
