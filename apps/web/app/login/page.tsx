'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { refreshUser } = useAuth()
  const router = useRouter()

  async function login() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    if (response.ok) {
      await refreshUser()
      router.push('/dashboard')
    } else {
      console.error('Login failed')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem' }}
        />

        <button onClick={login} style={{ padding: '0.5rem', cursor: 'pointer' }}>
          Login
        </button>
      </div>
    </div>
  )
}
