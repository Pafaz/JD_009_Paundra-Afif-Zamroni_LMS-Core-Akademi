'use client'

import { motion } from 'framer-motion'
import { Users, DollarSign, Star, TrendingUp, Calendar, Clock, Award, BookOpen, BarChart3, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  {
    title: 'Total Students',
    value: '47',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    change: '+5 this month'
  },
  {
    title: 'Average Rating',
    value: '4.9',
    icon: Star,
    color: 'from-yellow-500 to-yellow-600',
    change: 'Based on 89 reviews'
  },
  {
    title: 'Course Completion',
    value: '94%',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    change: '+3% this quarter'
  }
]

const upcomingSessions = [
  {
    student: 'Michael Johnson',
    course: 'React Development',
    time: 'Today 2:00 PM',
    duration: '60 min',
    type: 'Project Review'
  },
  {
    student: 'Emma Davis',
    course: 'IoT Fundamentals',
    time: 'Today 4:30 PM',
    duration: '90 min',
    type: 'Hands-on Lab'
  },
  {
    student: 'Alex Chen',
    course: 'Full Stack Development',
    time: 'Tomorrow 10:00 AM',
    duration: '60 min',
    type: 'Code Review'
  }
]

const recentActivities = [
  {
    type: 'session',
    title: 'Completed session with David Rodriguez',
    course: 'Arduino Programming',
    time: '2 hours ago',
    icon: Clock,
    color: 'text-green-500'
  },
  {
    type: 'enrollment',
    title: 'New student enrolled in IoT Course',
    course: 'IoT Fundamentals',
    time: '4 hours ago',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    type: 'review',
    title: 'Received 5-star review from Lisa Wang',
    course: 'React Development',
    time: '1 day ago',
    icon: Star,
    color: 'text-yellow-500'
  }
]

export default function MentorDashboardHome() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Good morning, Sarah! ☀️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have 3 sessions scheduled for today. Great work on maintaining your 4.9 rating!
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {stat.title}
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Sessions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upcoming Sessions
              </h2>
              <Button variant="ghost" size="sm">
                View Calendar
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.student}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {session.course} • {session.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.time}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              
              <div className="space-y-4">
                <Button className="w-full justify-start bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-3" />
                  Create New Course
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-3" />
                  Set Availability
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  View Analytics
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center mr-3 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}