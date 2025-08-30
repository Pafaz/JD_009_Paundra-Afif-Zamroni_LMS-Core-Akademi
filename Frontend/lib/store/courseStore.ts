'use client'

import { create } from 'zustand'
import axios from 'axios'
import api from '../axios'
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type MaterialType = 'PDF' | 'PPT' | 'VIDEO'
export type StatusBooking = 'PENDING' | 'APPROVED' | 'REJECTED'
export type BookingMethod = 'ONLINE' | 'OFFLINE'

export interface Material {
  id: string
  title: string
  type: MaterialType
  url: string
  courseId: string
}

export interface Session {
  id: string
  date: Date
  link?: string
  status: StatusBooking
  method: BookingMethod
  deletedAt?: Date
  mentorId: string
  studentId: string
}

export interface Course {
  id: string
  title: string
  code: string
  price: number
  image: string
  difficulty: Difficulty
  description: string
  durationWeeks: number
  students?: string[]
  materials?: Material[]
  sessions?: Session[]
  createdAt: Date
  updatedAt: Date
}

interface CourseState {
  courses: Course[]
  enrolledCourses: Course[]
  currentCourse: Course | null
  isLoading: boolean

  fetchCourses: () => Promise<void>
  fetchEnrolledCourses: () => Promise<void>
  enrollInCourse: (courseId: string) => Promise<void>
  createCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  enrolledCourses: [],
  currentCourse: null,
  isLoading: false,

  fetchCourses: async () => {
    set({ isLoading: true })
    try {
      const res = await api.get<Course[]>(`/courses`)
      console.log("API /courses response:", res.data)
      set({ courses: res.data, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      set({ isLoading: false })
    }
  },

  fetchEnrolledCourses: async () => {
    set({ isLoading: true })
    try {
      const res = await api.get<Course[]>(`/courses`)
      set({ enrolledCourses: res.data, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error)
      set({ isLoading: false })
    }
  },

  enrollInCourse: async (code: string) => {
    try {
      const res = await api.post<Course>(`/courses/join`, { code })
      set((state) => ({
        enrolledCourses: [...state.enrolledCourses, res.data],
      }))
    } catch (error) {
      console.error('Failed to enroll in course:', error)
    }
  },

  createCourse: async (courseData) => {
    set({ isLoading: true })
    
    try {
      const res = await api.post<Course>(`/courses`, courseData)
      console.log("API /courses response:", res.data)
      set((state) => ({
        courses: [...state.courses, res.data],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Failed to create course:', error)
      set({ isLoading: false })
    }
  },

  updateCourse: async (courseId, updates) => {
    try {
      console.log("Updating course:", courseId, updates);
      const res = await api.put<Course>(`/courses/${courseId}`, updates)
      console.log("API /courses response:", res.data);
      
      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId ? res.data : course
        ),
      }))
    } catch (error) {
      console.error('Failed to update course:', error)
    }
  },
}))
