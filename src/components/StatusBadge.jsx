function StatusBadge({ status }) {
  const styles = {
    New: { background: 'rgba(79,140,255,0.15)', color: '#7fb0ff', border: '1px solid rgba(79,140,255,0.3)' },
    Contacted: { background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' },
    Qualified: { background: 'rgba(52,199,89,0.15)', color: '#4ade80', border: '1px solid rgba(52,199,89,0.3)' },
    Lost: { background: 'rgba(255,69,58,0.15)', color: '#ff6b6b', border: '1px solid rgba(255,69,58,0.3)' },
  }

  return (
    <span
      style={{
        ...styles[status],
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
        padding: '6px 13px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}

export default StatusBadge