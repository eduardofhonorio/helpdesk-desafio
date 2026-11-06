import { useEffect, useState } from 'react'
import { getMe, type User } from '../services/auth'

type Props = {
  token: string
  onLogout: () => void
}

export function Home({ token, onLogout }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getMe(token).then(setUser).catch((err: Error) => setError(err.message))
  }, [token])

  return (
    <main className="container">
      <section className="card">
        <h1>Login realizado ✅</h1>
        {user && (
          <p>
            Olá, <strong>{user.name}</strong> ({user.role})
          </p>
        )}
        {error && <p className="error">{error}</p>}

        <label>access_token</label>
        <textarea className="token" readOnly value={token} rows={6} />

        <button onClick={onLogout}>Sair</button>
      </section>
    </main>
  )
}
