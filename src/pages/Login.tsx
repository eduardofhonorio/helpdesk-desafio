import { useState, type FormEvent } from 'react'
import { login } from '../services/auth'

type Props = {
  onLogin: (token: string) => void
}

export function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { access_token } = await login(email, password, admin)
      onLogin(access_token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível conectar à API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h1>HelpDesk</h1>
        <p className="subtitle">Entre com sua conta</p>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@helpdesk.local"
          autoComplete="username"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <label className="checkbox">
          <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
          Entrar como administrador
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
