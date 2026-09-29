function EmptyState({ message, icon = 'bi-inbox' }) {
  return (
    <div className="empty-state">
      <i className={`bi ${icon}`}></i>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
