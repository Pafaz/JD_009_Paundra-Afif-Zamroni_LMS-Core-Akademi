'use client'

import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'MENTOR'
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ user: any; token: string }>
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      })

      const { user, token } = res.data
      localStorage.setItem('token', token)

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      })

      return { user, token }
    } catch (err: any) {
      set({ isLoading: false })
      throw new Error(err.response?.data?.message || 'Login failed')
    }
  },


  register: async (userData) => {
    set({ isLoading: true })

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData)
      const { message } = res.data
      console.log(res.data);

      set({ isLoading: false })
      return message
    } catch (err: any) {
      console.log(err)
      set({ isLoading: false })
      throw new Error(err.response?.data?.message || 'Registration failed')
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      isAuthenticated: false
    })
  },

  updateProfile: (data) => {
    const currentUser = get().user
    if (currentUser) {
      set({
        user: { ...currentUser, ...data }
      })
    }
  }
}))
