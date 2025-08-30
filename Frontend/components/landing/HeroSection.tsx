'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, Users, Clock, Award } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Master{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Digital Skills
              </span>{' '}
              with 1-on-1 Mentoring
            </h1>
            
            <p className="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Learn IoT and Web Development through personalized sessions with expert mentors. 
              Book flexible schedules, get hands-on guidance, and accelerate your learning journey.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  Start Learning Now
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">500+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">50+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Mentors</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">98%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Online Learning Session"
                className="rounded-xl w-full h-auto shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Live Session Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}