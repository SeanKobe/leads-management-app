import { useState, useEffect } from 'react'
import './App.css'

import Toast from './components/Toast'
import StatusBadge from './components/StatusBadge'
import LeadForm from './components/LeadForm'
import EditPanel from './components/EditPanel'

const initialLeads = [
  { id: 1, name: 'Maria Santos', email: 'maria.santos@email.com', phone: '0917-123-4567', status: 'New', source: 'Website', createdDate: '2026-09-20' },
  { id: 2, name: 'John Cruz', email: 'john.cruz@email.com', phone: '0918-234-5678', status: 'Contacted', source: 'Referral', createdDate: '2026-09-19' },
  { id: 3, name: 'Ana Reyes', email: 'ana.reyes@email.com', phone: '0919-345-6789', status: 'Qualified', source: 'Facebook Ads', createdDate: '2026-09-18' },
  { id: 4, name: 'Mark Villanueva', email: 'mark.villanueva@email.com', phone: '0920-456-7890', status: 'Lost', source: 'Cold Call', createdDate: '2026-09-17' },
  { id: 5, name: 'Grace Lim', email: 'grace.lim@email.com', phone: '0921-567-8901', status: 'New', source: 'Website', createdDate: '2026-09-16' },
  { id: 6, name: 'Paolo Dela Cruz', email: 'paolo.delacruz@email.com', phone: '0922-678-9012', status: 'Contacted', source: 'Referral', createdDate: '2026-09-15' },
]

function App() {
 const [leads, setLeads] = useState(() => {
  const saved = localStorage.getItem('leads')
  return saved ? JSON.parse(saved) : initialLeads
})
  const [editingLead, setEditingLead] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
const [statusFilter, setStatusFilter] = useState('All')
const [sortBy, setSortBy] = useState('newest')
const [toastMessage, setToastMessage] = useState('')

function showToast(message) {
  setToastMessage(message)
  setTimeout(() => setToastMessage(''), 2500)
}
useEffect(() => {
  localStorage.setItem('leads', JSON.stringify(leads))
}, [leads])
        function handleAddLead(newLead) {
    setLeads([newLead, ...leads])
    showToast('Lead added successfully')
  }

  function handleDeleteLead(id) {
    const confirmed = window.confirm('Are you sure you want to delete this lead?')
    if (confirmed) {
      setLeads(leads.filter((lead) => lead.id !== id))
      showToast('Lead deleted')
    }
  }

  function handleUpdateLead(updatedLead) {
    setLeads(leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)))
    setEditingLead(null)
    showToast('Lead updated successfully')
  }

const filteredLeads = leads
  .filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })
  .sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
    if (sortBy === 'oldest') return new Date(a.createdDate) - new Date(b.createdDate)
    return new Date(b.createdDate) - new Date(a.createdDate)
  })

  return (
    <div className="app">
      <h1>Leads Management</h1>

      <LeadForm
  onAddLead={handleAddLead}
/>

<div className="toolbar">
  <div className="search-wrap">
    <input
      type="text"
      className="search-input"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <svg className="search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7.5"></circle>
      <line x1="21" y1="21" x2="16.4" y2="16.4"></line>
    </svg>
  </div>
  <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="All">All Status</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Lost">Lost</option>
  </select>

    <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="newest">Sort: Newest first</option>
      <option value="oldest">Sort: Oldest first</option>
      <option value="name-asc">Sort: Name (A–Z)</option>
      <option value="name-desc">Sort: Name (Z–A)</option>
    </select>
  </div>


     <div className="leads-grid">
  {filteredLeads.length === 0 ? (
    <div className="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span className="empty-state-title">No leads found</span>
      <span className="empty-state-subtitle">Try adjusting your search or filters</span>
    </div>
  ) : (
    filteredLeads.map((lead) => (
    <div className="lead-card" key={lead.id}>
      <div className="lead-card-header">
        <span className="lead-name">{lead.name}</span>
        <StatusBadge status={lead.status} />
      </div>
      <div className="lead-meta">
        <div className="lead-meta-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M2 7l10 6 10-6"></path>
          </svg>
          <span>{lead.email}</span>
        </div>
        <div className="lead-meta-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>{lead.phone}</span>
        </div>
      </div>
      <div className="lead-card-footer">
        <span className="source-tag">{lead.source}</span>
        <span className="lead-date">{lead.createdDate}</span>
        <div className="lead-actions">
          <button className="icon-btn" aria-label="Edit lead" onClick={() => setEditingLead(lead)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button className="icon-btn icon-btn-danger" aria-label="Delete lead" onClick={() => handleDeleteLead(lead.id)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    ))
  )}
</div>

<Toast message={toastMessage} />

{editingLead && (
  <EditPanel
    key={editingLead.id}
    lead={editingLead}
    onClose={() => setEditingLead(null)}
    onUpdateLead={handleUpdateLead}
  />
)}
    </div>
  )
}

export default App