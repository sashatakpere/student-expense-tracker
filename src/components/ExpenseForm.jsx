import { useState } from 'react';
import { CATEGORIES } from '../utils/calculations';

const initialForm = {
  title: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
};

function ExpenseForm({ onAddExpense }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }

    if (!form.category) {
      newErrors.category = 'Please select a category.';
    }

    if (!form.date) {
      newErrors.date = 'Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAddExpense({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
    });

    setForm({ ...initialForm, date: new Date().toISOString().split('T')[0] });
    setErrors({});
  };

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Expense</h1>
          <p className="page-subtitle">Record a new expense entry</p>
        </div>
      </div>

      <div className="content-card form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Expense Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Lunch at cafeteria"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="amount" className="form-label">
                Amount (₹) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="0"
                step="0.01"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="category" className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="date" className="form-label">
                Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                value={form.date}
                onChange={handleChange}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Description <span className="text-muted">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={form.description}
                onChange={handleChange}
                placeholder="Add any additional notes..."
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-lg me-1"></i>
                Add Expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
