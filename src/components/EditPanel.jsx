import { useState } from 'react'

function EditPanel({ lead, onClose, onUpdateLead }) {
  const [name, setName] = useState(lead.name)
  const [email, setEmail] = useState(lead.email)
  const [phone, setPhone] = useState(lead.phone)
  const [status, setStatus] = useState(lead.status)
  const [source, setSource] = useState(lead.source)
  const [saveState, setSaveState] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    if (saveState !== 'idle') return

    setSaveState('loading')
    setTimeout(() => {
      onUpdateLead({ ...lead, name, email, phone, status, source })
            setSaveState('success')
      setTimeout(() => {
        onClose()
      }, 900)
    }, 1400)
  }

  return (
    <div className="panel-overlay" onClick={saveState === 'idle' ? onClose : undefined}>
      <form className="edit-panel" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="edit-panel-header">
          <div>
            <span className="edit-panel-title">
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
  Edit Lead
</span>
            <span className="edit-panel-subtitle">{lead.name}</span>
          </div>
          <button type="button" className="icon-btn" aria-label="Close panel" onClick={onClose} disabled={saveState !== 'idle'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="edit-panel-fields">
          <div className="field-group">
            <label htmlFor="editName">Name</label>
            <input id="editName" className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field-group">
            <label htmlFor="editEmail">Email</label>
            <input id="editEmail" className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field-group">
            <label htmlFor="editPhone">Phone</label>
            <input id="editPhone" className="form-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="editStatus">Status</label>
              <select id="editStatus" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="editSource">Source</label>
              <select id="editSource" className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </div>
          </div>
        </div>

        <div className="edit-panel-actions">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={saveState !== 'idle'}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn-primary${saveState === 'success' ? ' btn-success' : ''}`}
            disabled={saveState !== 'idle'}
          >
            {saveState === 'idle' && 'Save Changes'}
            {saveState === 'loading' && <span className="btn-spinner"></span>}
                        {saveState === 'success' && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Saved
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPanel