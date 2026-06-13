'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { IUser } from '@healdoor/types'
import { getCurrentUser } from '../lib/auth'

interface AuthContextType {
  user: IUser | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const data = await getCurrentUser()
      if (data?.user) {
        setUser(data.user as IUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
