const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5050'
const TOKEN_KEY = 'helpdesk:access_token'

export type AuthResponse = {
  access_token: string
  refresh_token: string
  type: string
}

export type User = {
  id: number
  name: string
  email: string
  role: string
}

export async function login(email: string, password: string, admin = false): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admin ? { email, password, admin: true } : { email, password }),
  })

  if (!response.ok) {
    throw new Error(response.status === 403 ? 'E-mail ou senha inválidos.' : `Erro ${response.status} ao autenticar.`)
  }

  const data: AuthResponse = await response.json()
  localStorage.setItem(TOKEN_KEY, data.access_token)
  return data
}

export async function getMe(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Sessão expirada. Faça login novamente.')
  return response.json()
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
}
