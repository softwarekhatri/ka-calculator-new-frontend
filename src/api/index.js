import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ka_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function login(username, password) {
  const res = await api.post('/auth/login', { username, password })
  return res.data
}

export async function getMe() {
  const res = await api.get('/auth/me')
  return res.data
}

export async function getCategories(type) {
  const params = type ? { type } : {}
  const res = await api.get('/categories', { params })
  return res.data
}

export async function getAllCategories(type) {
  const params = type ? { type } : {}
  const res = await api.get('/categories/all', { params })
  return res.data
}

export async function createCategory(data) {
  const res = await api.post('/categories', data)
  return res.data
}

export async function updateCategory(id, data) {
  const res = await api.put(`/categories/${id}`, data)
  return res.data
}

export async function deleteCategory(id) {
  const res = await api.delete(`/categories/${id}`)
  return res.data
}

export async function getPrices() {
  const res = await api.get('/prices')
  return res.data
}

export async function updatePrices(data) {
  const res = await api.post('/prices', data)
  return res.data
}

export default api
