'use client'

import { useState } from 'react'
import { Menu, X, BookOpen, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Core Akademi
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors">
              Courses
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a
              href="#courses"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </a>

            <div className="flex space-x-2 px-3 py-2">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/auth/register" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}