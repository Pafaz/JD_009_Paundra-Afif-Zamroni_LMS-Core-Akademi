'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Home,
  GraduationCap,
  Calendar,
  Plus,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'

interface StudentLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'My Courses', href: '/student/courses', icon: GraduationCap },
  { name: 'Schedule', href: '/student/schedule', icon: Calendar },
  { name: 'Join Course', href: '/student/join', icon: Plus },
]

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter() 
  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch (err: any) {
      console.log(err)
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-slate-800 shadow-xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Core Akademi</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Core Akademi</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 rounded-xl transition-all duration-200"
              >
                <item.icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </Button>
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300" onClick={handleLogout} >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}