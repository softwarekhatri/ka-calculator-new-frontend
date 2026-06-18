import { useState } from 'react'
import Navbar from '../components/Navbar'
import PriceManager from '../components/PriceManager'
import CategoryManager from '../components/CategoryManager'

const s = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 16px 48px',
  },
  header: {
    marginBottom: '28px',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  subtitle: { fontSize: '0.9rem', color: '#888' },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '28px',
    background: '#e4e6eb',
    borderRadius: '12px',
    padding: '4px',
    width: 'fit-content',
  },
  tab: (active) => ({
    padding: '9px 22px',
    borderRadius: '9px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: active ? '600' : '500',
    fontSize: '0.9rem',
    background: active ? '#ffffff' : 'transparent',
    color: active ? '#1a1a2e' : '#666',
    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    transition: 'all 0.2s',
  }),
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('prices')

  return (
    <div style={s.page}>
      <Navbar />
      <div style={s.content}>
        <div style={s.header}>
          <h1 style={s.title}>Admin Dashboard</h1>
          <p style={s.subtitle}>Manage prices and jewellery categories</p>
        </div>

        <div style={s.tabs}>
          <button style={s.tab(activeTab === 'prices')} onClick={() => setActiveTab('prices')}>
            💰 Price Settings
          </button>
          <button style={s.tab(activeTab === 'categories')} onClick={() => setActiveTab('categories')}>
            📦 Categories
          </button>
        </div>

        {activeTab === 'prices' && <PriceManager />}
        {activeTab === 'categories' && (
          <>
            <CategoryManager type="gold" title="Gold Categories" />
            <CategoryManager type="silver" title="Silver Categories" />
          </>
        )}
      </div>
    </div>
  )
}
