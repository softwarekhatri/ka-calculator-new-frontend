import { useState } from 'react'
import ResultCard from './ResultCard'

const s = {
  section: {
    background: '#fff',
    border: '2px solid #e8c84a',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '24px',
    boxShadow: '0 6px 32px rgba(218,165,32,0.18)',
  },
  header: {
    background: 'linear-gradient(135deg, #f5c518 0%, #e8a000 60%, #c47a00 100%)',
    padding: '22px 28px 18px',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '14px',
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: '900',
    color: '#1a0f00',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textShadow: '0 1px 3px rgba(255,255,255,0.3)',
  },
  headerTitleHindi: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#3d2200',
    marginTop: '2px',
    letterSpacing: '0.5px',
  },
  badgesRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  badge: {
    background: 'rgba(0,0,0,0.18)',
    color: '#fff8e0',
    padding: '8px 16px',
    borderRadius: '10px',
    fontSize: '0.88rem',
    fontWeight: '700',
    border: '1px solid rgba(255,255,255,0.25)',
    whiteSpace: 'nowrap',
    letterSpacing: '0.3px',
    backdropFilter: 'blur(4px)',
  },
  badgeLabel: {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: '400',
    color: '#ffe08a',
    marginBottom: '2px',
    letterSpacing: '0.5px',
  },
  badgePrice: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#ffffff',
  },
  body: { padding: '22px 22px 26px' },
  label: {
    display: 'block',
    fontSize: '0.92rem',
    fontWeight: '700',
    color: '#7a4f00',
    marginBottom: '7px',
    letterSpacing: '0.2px',
  },
  labelSub: {
    fontWeight: '400',
    fontSize: '0.78rem',
    color: '#b07a20',
  },
  input: {
    width: '100%',
    padding: '13px 14px',
    border: '2px solid #e0c050',
    borderRadius: '12px',
    fontSize: '1.05rem',
    background: '#fffef5',
    color: '#1a1a1a',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    fontWeight: '600',
  },
  select: {
    width: '100%',
    padding: '13px 14px',
    border: '2px solid #e0c050',
    borderRadius: '12px',
    fontSize: '0.97rem',
    background: '#fffef5',
    color: '#1a1a1a',
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontWeight: '500',
  },
  field: { marginBottom: '16px' },
  btn: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #e8a000 0%, #c47a00 100%)',
    color: '#fff',
    fontWeight: '800',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'opacity 0.2s, transform 0.1s',
    marginTop: '6px',
    boxShadow: '0 5px 18px rgba(196,122,0,0.4)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  noCategories: {
    color: '#c8a000',
    fontSize: '0.85rem',
    fontStyle: 'italic',
    padding: '12px 0',
  },
  error: {
    color: '#c0392b',
    fontSize: '0.88rem',
    marginBottom: '12px',
    background: '#fff0f0',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #f5c0c0',
  },
}

function detectGoldType(categoryName) {
  if (categoryName.includes('18')) return '750'
  if (categoryName.includes('22')) return '916'
  return '916'
}

export default function GoldSection({ prices, categories }) {
  const [weight, setWeight] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const w = parseFloat(weight)
    if (!w || w <= 0) {
      setError('⚠️ कृपया सही वजन दर्ज करें।')
      return
    }
    if (!selectedCategoryId) {
      setError('⚠️ कृपया आभूषण का प्रकार चुनें।')
      return
    }
    const cat = categories.find(c => c._id === selectedCategoryId)
    if (!cat) return

    const goldType = detectGoldType(cat.name)
    const real10gPrice = goldType === '750' ? prices.gold750 : prices.gold916

    // Sale price
    const salePricePerTenG = (cat.saleTunch / 100) * real10gPrice + (cat.addOnPrice || 0)
    const saleMetalPrice = (w / 10) * salePricePerTenG
    const making = cat.makingChargeType === 'per_gram'
      ? cat.makingCharge * w
      : cat.makingChargeType === 'per_10g'
        ? (w / 10) * cat.makingCharge
        : cat.makingCharge
    const finalPrice = saleMetalPrice + making

    // Purchase price (खरदारी मूल्य)
    const purchasePricePerTenG = (cat.purchaseTunch / 100) * real10gPrice
    const purchaseMetalPrice = (w / 10) * purchasePricePerTenG
    const purchaseMaking = cat.purchaseMakingChargeType === 'per_gram'
      ? cat.purchaseMakingCharge * w
      : cat.purchaseMakingChargeType === 'per_10g'
        ? (w / 10) * cat.purchaseMakingCharge
        : cat.purchaseMakingCharge
    const purchasePrice = purchaseMetalPrice + purchaseMaking

    setResult({ saleMetalPrice, making, finalPrice, purchasePrice, weight: w, categoryName: cat.name, cat, goldType })
  }

  return (
    <section style={s.section}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTop}>
          <div>
            <div style={s.headerTitle}>
              🥇 सोना
            </div>
            <div style={s.headerTitleHindi}>Gold — आज का भाव (प्रति 10 ग्राम)</div>
          </div>
        </div>
        <div style={s.badgesRow}>
          <div style={s.badge}>
            <span style={s.badgeLabel}>750 KDM (18 कैरेट)</span>
            <span style={s.badgePrice}>₹ {(prices.gold750 || 0).toLocaleString('en-IN')}</span>
          </div>
          <div style={s.badge}>
            <span style={s.badgeLabel}>916 KDM (22 कैरेट)</span>
            <span style={s.badgePrice}>₹ {(prices.gold916 || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>
        <div style={s.grid}>
          {/* Weight */}
          <div style={s.field}>
            <label style={s.label}>
              वजन <span style={s.labelSub}>(Weight in grams)</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="जैसे: 5.5"
              value={weight}
              onChange={e => { setWeight(e.target.value); setResult(null) }}
              style={s.input}
              onFocus={e => { e.target.style.borderColor = '#c47a00'; e.target.style.boxShadow = '0 0 0 3px rgba(218,165,32,0.18)' }}
              onBlur={e => { e.target.style.borderColor = '#e0c050'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Category */}
          <div style={s.field}>
            <label style={s.label}>
              आभूषण का प्रकार <span style={s.labelSub}>(Category)</span>
            </label>
            {categories.length === 0 ? (
              <p style={s.noCategories}>कोई श्रेणी नहीं। Admin से जोड़ें।</p>
            ) : (
              <select
                value={selectedCategoryId}
                onChange={e => { setSelectedCategoryId(e.target.value); setResult(null) }}
                style={s.select}
              >
                <option value="">-- प्रकार चुनें --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {error && <p style={s.error}>{error}</p>}

        <button
          style={s.btn}
          onClick={calculate}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          🧮 सोने का भाव निकालें
        </button>

        {result && <ResultCard {...result} metalType="gold" real10gPrice={detectGoldType(categories.find(c=>c._id===selectedCategoryId)?.name||'') === '750' ? prices.gold750 : prices.gold916} />}
      </div>
    </section>
  )
}
