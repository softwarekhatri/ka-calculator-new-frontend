import { useState, useEffect } from 'react'
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api'

const EMPTY_FORM = {
  name: '',
  purchaseTunch: '',
  saleTunch: '',
  addOnPrice: '0',
  makingCharge: '',
  makingChargeType: 'per_gram',
  purchaseMakingCharge: '0',
  purchaseMakingChargeType: 'fixed',
}

export default function CategoryManager({ type, title }) {
  const isGold = type === 'gold'
  const colors = isGold
    ? { headerBg: 'linear-gradient(135deg, #f5c518, #c47a00)', accent: '#c47a00', accentLight: '#fff8e0', border: '#e0c050', labelColor: '#7a4f00', btnBg: 'linear-gradient(135deg, #e8a000, #c47a00)', badgeBg: '#fff3c0', badgeText: '#856404' }
    : { headerBg: 'linear-gradient(135deg, #d8dde2, #6a7a8a)', accent: '#4a5a6a', accentLight: '#f0f4f8', border: '#b8c0ca', labelColor: '#3a4a58', btnBg: 'linear-gradient(135deg, #6a7a8a, #4a5a6a)', badgeBg: '#e4eaf0', badgeText: '#3a4a58' }

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  function showMsg(msg, err = false) {
    setMessage(msg); setIsError(err)
    setTimeout(() => setMessage(''), 3500)
  }

  async function fetchCategories() {
    setLoading(true)
    try { setCategories(await getAllCategories(type)) }
    catch { showMsg('Failed to load categories.', true) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchCategories() }, [type])

  function renderField(val, setter, label, opts = {}) {
    const inputStyle = {
      padding: '9px 12px', border: `1.5px solid ${colors.border}`, borderRadius: '8px',
      fontSize: '0.88rem', background: '#fff', width: '100%', boxSizing: 'border-box',
    }
    return (
      <div style={{ flex: opts.flex || '1 1 130px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: colors.labelColor, display: 'block', marginBottom: '4px' }}>
          {label}
        </label>
        {opts.type === 'select' ? (
          <select style={inputStyle} value={val} onChange={e => setter(e.target.value)}>
            {opts.options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
          </select>
        ) : (
          <input
            type={opts.type || 'number'}
            step="0.01" min="0"
            style={inputStyle}
            value={val}
            onChange={e => setter(e.target.value)}
            placeholder={opts.placeholder || ''}
          />
        )}
      </div>
    )
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim()) { showMsg('Item name is required.', true); return }
    setSaving(true)
    try {
      await createCategory({
        name: form.name.trim(), type,
        purchaseTunch: parseFloat(form.purchaseTunch) || 100,
        saleTunch: parseFloat(form.saleTunch) || 100,
        addOnPrice: parseFloat(form.addOnPrice) || 0,
        makingCharge: parseFloat(form.makingCharge) || 0,
        makingChargeType: form.makingChargeType,
        purchaseMakingCharge: parseFloat(form.purchaseMakingCharge) || 0,
        purchaseMakingChargeType: form.purchaseMakingChargeType,
      })
      setForm(EMPTY_FORM); setShowAdd(false)
      showMsg('✅ Item added successfully!')
      fetchCategories()
    } catch (err) {
      showMsg(err?.response?.data?.message || 'Failed to add item.', true)
    } finally { setSaving(false) }
  }

  function startEdit(cat) {
    setEditId(cat._id)
    setEditForm({
      name: cat.name,
      purchaseTunch: cat.purchaseTunch,
      saleTunch: cat.saleTunch,
      addOnPrice: cat.addOnPrice,
      makingCharge: cat.makingCharge,
      makingChargeType: cat.makingChargeType,
      purchaseMakingCharge: cat.purchaseMakingCharge,
      purchaseMakingChargeType: cat.purchaseMakingChargeType,
    })
  }

  async function handleUpdate(id) {
    if (!editForm.name.trim()) { showMsg('Name is required.', true); return }
    setSaving(true)
    try {
      await updateCategory(id, {
        name: editForm.name.trim(),
        purchaseTunch: parseFloat(editForm.purchaseTunch) || 100,
        saleTunch: parseFloat(editForm.saleTunch) || 100,
        addOnPrice: parseFloat(editForm.addOnPrice) || 0,
        makingCharge: parseFloat(editForm.makingCharge) || 0,
        makingChargeType: editForm.makingChargeType,
        purchaseMakingCharge: parseFloat(editForm.purchaseMakingCharge) || 0,
        purchaseMakingChargeType: editForm.purchaseMakingChargeType,
      })
      setEditId(null); setEditForm(null)
      showMsg('✅ Updated successfully!')
      fetchCategories()
    } catch { showMsg('Failed to update.', true) }
    finally { setSaving(false) }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete "${name}"?`)) return
    try { await deleteCategory(id); showMsg('Deleted.'); fetchCategories() }
    catch { showMsg('Failed to delete.', true) }
  }

  const s = {
    wrap: { background: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px' },
    header: { background: colors.headerBg, padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' },
    headerTitle: { fontSize: '1.1rem', fontWeight: '800', color: isGold ? '#1a1200' : '#fff', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' },
    body: { padding: '20px 20px 24px' },
    msg: { fontSize: '0.86rem', fontWeight: '600', color: isError ? '#c0392b' : '#218838', marginBottom: '12px', padding: '8px 14px', background: isError ? '#fff0f0' : '#f0fff4', borderRadius: '8px', border: `1px solid ${isError ? '#f5c0c0' : '#c3e6cb'}` },
    addToggleBtn: { padding: '8px 18px', background: colors.btnBg, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' },
    addPanel: { background: colors.accentLight, border: `1.5px solid ${colors.border}`, borderRadius: '14px', padding: '18px', marginBottom: '20px' },
    addPanelTitle: { fontSize: '0.85rem', fontWeight: '700', color: colors.labelColor, marginBottom: '14px' },
    formRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' },
    submitBtn: { padding: '10px 24px', background: colors.btnBg, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', marginTop: '6px' },
    cancelBtn: { padding: '10px 18px', background: '#f0f0f0', color: '#555', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', marginTop: '6px', marginLeft: '10px' },
    tableWrap: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '520px' },
    th: { textAlign: 'left', padding: '9px 12px', fontSize: '0.72rem', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #eee', whiteSpace: 'nowrap' },
    td: { padding: '10px 12px', fontSize: '0.88rem', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' },
    badge: { background: colors.badgeBg, color: colors.badgeText, padding: '3px 9px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: '600', whiteSpace: 'nowrap' },
    actionBtn: (v) => ({
      padding: '4px 12px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700',
      background: v === 'edit' ? '#e8f4fd' : v === 'save' ? '#e8faf0' : v === 'cancel' ? '#f0f0f0' : '#fdf0f0',
      color: v === 'edit' ? '#2980b9' : v === 'save' ? '#27ae60' : v === 'cancel' ? '#777' : '#c0392b',
      marginLeft: '5px',
    }),
    editPanel: { background: colors.accentLight, border: `1.5px solid ${colors.border}`, borderRadius: '12px', padding: '16px', marginTop: '8px' },
    empty: { textAlign: 'center', padding: '28px', color: '#bbb', fontSize: '0.9rem' },
    fieldRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', gap: '8px' },
    fieldLabel: { fontSize: '0.78rem', color: '#888', fontWeight: '500', whiteSpace: 'nowrap' },
  }

  const makingTypeOptions = [
    { val: 'per_gram', label: 'Per Gram' },
    { val: 'per_10g', label: 'Per 10 Gram' },
    { val: 'fixed', label: 'Fixed Amount' },
  ]
  const purchaseMakingTypeOptions = [
    { val: 'per_gram', label: 'Per Gram' },
    { val: 'per_10g', label: 'Per 10 Gram' },
    { val: 'fixed', label: 'Fixed Amount' },
  ]

  function renderForm(data, setData) {
    const set = (key) => (val) => setData(prev => ({ ...prev, [key]: val }))
    const groupLabel = (text) => (
      <div style={{ fontSize: '0.72rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: colors.accent, borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '5px', marginBottom: '10px', marginTop: '4px' }}>
        {text}
      </div>
    )
    return (
      <>
        <div style={s.formRow}>
          {renderField(data.name, set('name'), 'Item / Variant Name', { type: 'text', flex: '1 1 200px', placeholder: 'e.g. Gents Ring 22 Carat' })}
        </div>

        {groupLabel('Purchase Fields')}
        <div style={s.formRow}>
          {renderField(data.purchaseTunch, set('purchaseTunch'), 'Purchase Tunch (%)', { placeholder: '100' })}
          {renderField(data.purchaseMakingCharge, set('purchaseMakingCharge'), 'Purchase Making Charge (₹)', { placeholder: '0' })}
          {renderField(data.purchaseMakingChargeType, set('purchaseMakingChargeType'), 'Purchase Making Charge Type', { type: 'select', options: purchaseMakingTypeOptions })}
        </div>

        {groupLabel('Sale Fields')}
        <div style={s.formRow}>
          {renderField(data.saleTunch, set('saleTunch'), 'Sale Tunch (%)', { placeholder: '91.6' })}
          {renderField(data.addOnPrice, set('addOnPrice'), 'Sale Add-on Price (per 10g ₹)', { placeholder: '0' })}
          {renderField(data.makingCharge, set('makingCharge'), 'Sale Making Charge (₹)', { placeholder: '150' })}
          {renderField(data.makingChargeType, set('makingChargeType'), 'Sale Making Charge Type', { type: 'select', options: makingTypeOptions })}
        </div>
      </>
    )
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.headerTitle}>{isGold ? '🥇' : '🥈'} {title}</span>
        <button style={s.addToggleBtn} onClick={() => { setShowAdd(v => !v); setEditId(null) }}>
          {showAdd ? '✕ Close' : '+ Add Item'}
        </button>
      </div>

      <div style={s.body}>
        {message && <p style={s.msg}>{message}</p>}

        {showAdd && (
          <div style={s.addPanel}>
            <div style={s.addPanelTitle}>Add New Item / Variant</div>
            <form onSubmit={handleAdd}>
              {renderForm(form, setForm)}
              <button type="submit" style={s.submitBtn} disabled={saving}>
                {saving ? 'Adding...' : '+ Add Item'}
              </button>
              <button type="button" style={s.cancelBtn} onClick={() => { setShowAdd(false); setForm(EMPTY_FORM) }}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p style={s.empty}>Loading...</p>
        ) : categories.length === 0 ? (
          <p style={s.empty}>No items yet. Add one above.</p>
        ) : (
          <div>
            {categories.map(cat => {
              const makingTypeLabel = { per_gram: 'Per Gram', per_10g: 'Per 10g', fixed: 'Fixed' }
              return (
                <div key={cat._id} style={{ border: `1.5px solid ${colors.border}`, borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
                  {/* Item header row */}
                  <div style={{ background: colors.accentLight, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <strong style={{ fontSize: '0.97rem', color: '#1a1a1a' }}>{cat.name}</strong>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {editId === cat._id ? (
                        <>
                          <button style={s.actionBtn('save')} onClick={() => handleUpdate(cat._id)} disabled={saving}>Save</button>
                          <button style={s.actionBtn('cancel')} onClick={() => { setEditId(null); setEditForm(null) }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button style={s.actionBtn('edit')} onClick={() => startEdit(cat)}>Edit</button>
                          <button style={s.actionBtn('delete')} onClick={() => handleDelete(cat._id, cat.name)}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Fields grid */}
                  {editId !== cat._id && (
                    <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0' }}>
                      {/* Purchase section */}
                      <div style={{ padding: '8px 12px', borderRight: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: colors.accent, marginBottom: '8px' }}>Purchase</div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Tunch</span>
                          <span style={s.badge}>{cat.purchaseTunch}%</span>
                        </div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Making Charge</span>
                          <span style={s.badge}>₹{cat.purchaseMakingCharge}</span>
                        </div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Making Type</span>
                          <span style={s.badge}>{makingTypeLabel[cat.purchaseMakingChargeType] || cat.purchaseMakingChargeType}</span>
                        </div>
                      </div>

                      {/* Sale section */}
                      <div style={{ padding: '8px 12px' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: colors.accent, marginBottom: '8px' }}>Sale</div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Tunch</span>
                          <span style={s.badge}>{cat.saleTunch}%</span>
                        </div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Add-on Price</span>
                          <span style={s.badge}>₹{cat.addOnPrice} / 10g</span>
                        </div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Making Charge</span>
                          <span style={s.badge}>₹{cat.makingCharge}</span>
                        </div>
                        <div style={s.fieldRow}>
                          <span style={s.fieldLabel}>Making Type</span>
                          <span style={s.badge}>{makingTypeLabel[cat.makingChargeType] || cat.makingChargeType}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Edit form */}
                  {editId === cat._id && editForm && (
                    <div style={{ ...s.editPanel, margin: '0', borderRadius: '0', border: 'none', borderTop: `1.5px solid ${colors.border}` }}>
                      {renderForm(editForm, setEditForm)}
                      <button style={s.submitBtn} onClick={() => handleUpdate(cat._id)} disabled={saving}>
                        {saving ? 'Saving...' : '💾 Save Changes'}
                      </button>
                      <button style={s.cancelBtn} onClick={() => { setEditId(null); setEditForm(null) }}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
