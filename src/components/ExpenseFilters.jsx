import { CATEGORIES } from '../utils/calculations';

function ExpenseFilters({ search, category, sortBy, onSearchChange, onCategoryChange, onSortChange }) {
  return (
    <div className="filters-bar">
      <div className="row g-3 align-items-end">
        <div className="col-md-5">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="categoryFilter" className="form-label">
            Category
          </label>
          <select
            id="categoryFilter"
            className="form-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="sortBy" className="form-label">
            Sort By
          </label>
          <select
            id="sortBy"
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;
