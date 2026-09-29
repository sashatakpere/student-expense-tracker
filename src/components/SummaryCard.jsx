function SummaryCard({ title, value, icon, accent }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className={`summary-card summary-card--${accent}`}>
        <div className="summary-card__icon">
          <i className={`bi ${icon}`}></i>
        </div>
        <div>
          <p className="summary-card__label">{title}</p>
          <p className="summary-card__value">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
