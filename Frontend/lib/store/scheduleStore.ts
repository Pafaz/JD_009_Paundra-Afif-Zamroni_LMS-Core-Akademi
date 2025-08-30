'use client'

import { create } from 'zustand'

export interface Session {
  id: string
  courseId: string
  mentorId: string
  studentId: string
  title: string
  description: string
  scheduledAt: Date
  duration: number // in minutes
  status: 'scheduled' | 'completed' | 'cancelled'
  meetingLink?: string
  feedback?: {
    rating: number
    comment: string
  }
}

export interface Availability {
  id: string
  mentorId: string
  dayOfWeek: number // 0-6, Sunday-Saturday
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isActive: boolean
}

interface ScheduleState {
  sessions: Session[]
  availability: Availability[]
  isLoading: boolean
  
  fetchSessions: () => Promise<void>
  bookSession: (sessionData: Omit<Session, 'id'>) => Promise<void>
  cancelSession: (sessionId: string) => Promise<void>
  updateSessionStatus: (sessionId: string, status: Session['status']) => void
  addFeedback: (sessionId: string, feedback: { rating: number; comment: string }) => void
  setAvailability: (mentorId: string, slots: Omit<Availability, 'id' | 'mentorId'>[]) => Promise<void>
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  sessions: [],
  availability: [],
  isLoading: false,

  fetchSessions: async () => {
    set({ isLoading: true })
    
    // Mock data
    const mockSessions: Session[] = [
      {
        id: '1',
        courseId: '1',
        mentorId: 'mentor1',
        studentId: 'student1',
        title: 'React Hooks Deep Dive',
        description: 'Learn advanced React hooks and custom hook patterns',
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        status: 'scheduled',
        meetingLink: 'https://meet.google.com/abc-def-ghi'
      },
      {
        id: '2',
        courseId: '2',
        mentorId: 'mentor1',
        studentId: 'student1',
        title: 'IoT Sensor Integration',
        description: 'Hands-on session with temperature and humidity sensors',
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        duration: 90,
        status: 'scheduled'
      }
    ]
    
    set({ sessions: mockSessions, isLoading: false })
  },

  bookSession: async (sessionData) => {
    set({ isLoading: true })
    
    const newSession: Session = {
      ...sessionData,
      id: Math.random().toString(36).substr(2, 9)
    }
    
    set({ 
      sessions: [...get().sessions, newSession], 
      isLoading: false 
    })
  },

  cancelSession: async (sessionId: string) => {
    const { sessions } = get()
    const updatedSessions = sessions.map(session =>
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const }
        : session
    )
    
    set({ sessions: updatedSessions })
  },

  updateSessionStatus: (sessionId: string, status) => {
    const { sessions } = get()
    const updatedSessions = sessions.map(session =>
      session.id === sessionId 
        ? { ...session, status }
        : session
    )
    
    set({ sessions: updatedSessions })
  },

  addFeedback: (sessionId: string, feedback) => {
    const { sessions } = get()
    const updatedSessions = sessions.map(session =>
      session.id === sessionId 
        ? { ...session, feedback }
        : session
    )
    
    set({ sessions: updatedSessions })
  },

  setAvailability: async (mentorId: string, slots) => {
    const newSlots = slots.map(slot => ({
      ...slot,
      id: Math.random().toString(36).substr(2, 9),
      mentorId
    }))
    
    set({ availability: newSlots })
  }
}))