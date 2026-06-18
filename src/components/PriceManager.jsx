import { useState, useEffect } from 'react'
import { getPrices, updatePrices } from '../api'

const s = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '6px',
  },
  desc: { fontSize: '0.85rem', color: '#888', marginBottom: '24px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  fieldCard: (color) => ({
    background: color,
    borderRadius: '12px',
    padding: '16px',
    border: `1.5px solid ${color === '#FFFBF0' ? '#DAA520' : '#A9A9A9'}`,
  }),
  label: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: '600',
    marginBottom: '8px',
  },
  input: (isGold) => ({
    width: '100%',
    padding: '10px 13px',
    border: `1.5px solid ${isGold ? '#DAA520' : '#A9A9A9'}`,
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    background: isGold ? '#fffef5' : '#ffffff',
    color: '#1a1a1a',
  }),
  btn: {
    padding: '12px 32px',
    background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
    color: '#FFD700',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  success: {
    display: 'inline-block',
    marginLeft: '14px',
    color: '#27ae60',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
  error: {
    display: 'inline-block',
    marginLeft: '14px',
    color: '#c0392b',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
}

export default function PriceManager() {
  const [gold750, setGold750] = useState('')
  const [gold916, setGold916] = useState('')
  const [silver, setSilver] = useState('')
  const [saved, setSaved] = useState({ gold750: '', gold916: '', silver: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const isDirty = String(gold750) !== String(saved.gold750) ||
                  String(gold916) !== String(saved.gold916) ||
                  String(silver)  !== String(saved.silver)

  useEffect(() => {
    getPrices()
      .then(data => {
        setGold750(data.gold750 || '')
        setGold916(data.gold916 || '')
        setSilver(data.silver || '')
        setSaved({ gold750: data.gold750 || '', gold916: data.gold916 || '', silver: data.silver || '' })
      })
      .catch(() => {})
  }, [])

  async function handleSave() {
    if (!gold750 || !gold916 || !silver) {
      setIsError(true)
      setMessage('All fields are required.')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      await updatePrices({
        gold750: parseFloat(gold750),
        gold916: parseFloat(gold916),
        silver: parseFloat(silver),
      })
      setSaved({ gold750: parseFloat(gold750), gold916: parseFloat(gold916), silver: parseFloat(silver) })
      setIsError(false)
      setMessage('Prices updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setIsError(true)
      setMessage('Failed to update prices. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.card}>
      <h2 style={s.title}>💰 Price Settings</h2>
      <p style={s.desc}>Set the current market price per 10 grams</p>

      <div style={s.grid}>
        <div style={s.fieldCard('#FFFBF0')}>
          <label style={{ ...s.label, color: '#856404' }}>🥇 Gold 750 KDM (per 10g)</label>
          <input
            type="number"
            style={s.input(true)}
            value={gold750}
            onChange={e => setGold750(e.target.value)}
            placeholder="e.g. 55000"
          />
        </div>

        <div style={s.fieldCard('#FFFBF0')}>
          <label style={{ ...s.label, color: '#856404' }}>🥇 Gold 916 KDM (per 10g)</label>
          <input
            type="number"
            style={s.input(true)}
            value={gold916}
            onChange={e => setGold916(e.target.value)}
            placeholder="e.g. 65000"
          />
        </div>

        <div style={s.fieldCard('#F8F9FA')}>
          <label style={{ ...s.label, color: '#495057' }}>🥈 Silver (per 10g)</label>
          <input
            type="number"
            style={s.input(false)}
            value={silver}
            onChange={e => setSilver(e.target.value)}
            placeholder="e.g. 800"
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button
          style={{ ...s.btn, opacity: (loading || !isDirty) ? 0.55 : 1, cursor: (loading || !isDirty) ? 'not-allowed' : 'pointer' }}
          onClick={handleSave}
          disabled={loading || !isDirty}
        >
          {loading ? 'Saving...' : isDirty ? '💾 Update Prices' : '✓ Prices Saved'}
        </button>
        {message && (
          <span style={isError ? s.error : s.success}>{message}</span>
        )}
      </div>
    </div>
  )
}
