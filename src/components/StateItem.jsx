function StateItem({ label, value, type }) {
  return (
    <div className={`state-item state-item--${type}`}>
      <span className="state-label">{label}</span>
      <span className="state-value">{String(value)}</span>
    </div>
  )
}
export default StateItem
