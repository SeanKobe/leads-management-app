import { useState } from 'react'
 
function LeadForm({ onAddLead }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [source, setSource] = useState('Website')
 
  function handleSubmit(e) {
    e.preventDefault()
 
    const newLead = {
      id: Date.now(),
      name,
      email,
      phone,
      status: 'New',
      source,
      createdDate: new Date().toISOString().split('T')[0],
    }
    onAddLead(newLead)
 
    setName('')
    setEmail('')
    setPhone('')
    setSource('Website')
  }
 
  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className="form-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        className="form-input"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <select className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Facebook Ads">Facebook Ads</option>
        <option value="Cold Call">Cold Call</option>
      </select>
      <button type="submit" className="btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Lead
      </button>
    </form>
  )
}
 
export default LeadForm