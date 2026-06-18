import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import GoldSection from '../components/GoldSection'
import SilverSection from '../components/SilverSection'
import { getPrices, getCategories } from '../api'

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #fdf6e3 0%, #f5f0e8 50%, #ece8f0 100%)',
  },
  content: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '20px 14px 60px',
  },
  titleBlock: {
    textAlign: 'center',
    marginBottom: '28px',
    padding: '18px 0 10px',
  },
  pageTitle: {
    fontSize: '1.9rem',
    fontWeight: '800',
    color: '#1a1200',
    letterSpacing: '0.5px',
  },
  pageTitleSub: {
    fontSize: '1rem',
    color: '#7a6000',
    marginTop: '4px',
    fontWeight: '400',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#888',
    fontSize: '1.1rem',
  },
  error: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#c0392b',
    background: '#fff0f0',
    borderRadius: '12px',
    margin: '20px 0',
    fontWeight: '500',
  },
}

export default function Calculator() {
  const [prices, setPrices] = useState(null)
  const [goldCategories, setGoldCategories] = useState([])
  const [silverCategories, setSilverCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [priceData, goldCats, silverCats] = await Promise.all([
          getPrices(),
          getCategories('gold'),
          getCategories('silver'),
        ])
        setPrices(priceData)
        setGoldCategories(goldCats)
        setSilverCategories(silverCats)
      } catch {
        setError('डेटा लोड नहीं हो सका। कृपया पुनः प्रयास करें।')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={s.page}>
      <Navbar />
      <div style={s.content}>
        <div style={s.titleBlock}>
          <h1 style={s.pageTitle}>💰 भाव कैलकुलेटर</h1>
          <p style={s.pageTitleSub}>सोना व चाँदी का सटीक मूल्य जानें</p>
        </div>

        {loading && <p style={s.loading}>⏳ भाव लोड हो रहा है...</p>}
        {error && <div style={s.error}>⚠️ {error}</div>}

        {!loading && !error && prices && (
          <>
            <GoldSection
              prices={{ gold750: prices.gold750, gold916: prices.gold916 }}
              categories={goldCategories}
            />
            <SilverSection
              prices={{ silver: prices.silver }}
              categories={silverCategories}
            />
          </>
        )}
      </div>
    </div>
  )
}
