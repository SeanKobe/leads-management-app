# Leads Management App

A simple, polished Leads Management web app built as a take-home assessment for a Junior Frontend Software Engineer role. Built with React (functional components + hooks) and plain CSS — no UI libraries.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL printed in your terminal in a browser.

## Features Implemented

**Core requirements**
- Leads list view (card layout) showing Name, Email, Phone, Status, Source, and Created Date
- Add New Lead form with required-field validation and email format validation
- Edit Lead via a slide-in panel, pre-filled with the lead's current values
- Delete Lead with a confirmation step before removal
- Status badges for New, Contacted, Qualified, and Lost, each visually distinct
- Search by name or email
- Filter by status

**Extra credit**
- Sort by Name (A–Z / Z–A) and by Created Date (newest/oldest first)
- Data persists to `localStorage`, so it survives a page refresh
- Fully responsive layout for mobile and desktop
- Empty state shown when no leads match the current search/filters
- Toast notifications confirming add, update, and delete actions
- Additional polish: hover and focus states across all interactive elements, a loading/success animation on save, and a hover-scale "floating" effect on lead cards (desktop only)

## Approach & Trade-offs

- **Component structure:** `LeadForm` (creating a lead), `EditPanel` (editing a lead, as a slide-in panel), `StatusBadge`, and `Toast`, all composed together in `App`.
- **No backend:** leads are seeded as in-memory sample data and persisted to `localStorage`, per the assessment's guidance that a backend isn't required.
- **Styling:** plain CSS with custom properties for spacing, radius, and color tokens, rather than a UI library like Tailwind.
- **Status badge colors** are defined as inline styles in `StatusBadge` rather than CSS classes — a deliberate simplicity trade-off for a small, fixed set of status values.
- **Mobile layout:** fully responsive, though a further "native app" style mobile pattern (floating add button + bottom panel) was identified but scoped out to protect stability ahead of the deadline.