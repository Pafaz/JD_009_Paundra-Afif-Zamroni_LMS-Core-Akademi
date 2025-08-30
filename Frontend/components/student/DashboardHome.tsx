'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, CheckCircle, TrendingUp, Clock, Award, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  {
    title: 'Active Courses',
    value: '3',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    change: '+2 this month'
  },
  {
    title: 'Upcoming Sessions',
    value: '5',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    change: 'Next: Tomorrow 2PM'
  },
  {
    title: 'Completed Lessons',
    value: '24',
    icon: CheckCircle,
    color: 'from-purple-500 to-purple-600',
    change: '+8 this week'
  },
  {
    title: 'Learning Streak',
    value: '12',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600',
    change: 'days in a row'
  }
]

const recentActivities = [
  {
    type: 'lesson',
    title: 'Completed "React Hooks Deep Dive"',
    course: 'React Development',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    type: 'session',
    title: 'Upcoming session with Sarah Chen',
    course: 'IoT Fundamentals',
    time: 'Tomorrow at 2:00 PM',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    type: 'achievement',
    title: 'Earned "JavaScript Master" badge',
    course: 'Full Stack Development',
    time: '1 day ago',
    icon: Award,
    color: 'text-yellow-500'
  }
]

export default function DashboardHome() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to continue your learning journey? You have 2 upcoming sessions this week.
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
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  <div className={`w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center mr-4 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.course}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
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
                <Calendar className="h-4 w-4 mr-3" />
                Book New Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-3" />
                Join New Course
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-3" />
                View Schedule
              </Button>
            </div>
          </div>

          {/* Next Session */}
          <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Next Session
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-indigo-700 dark:text-indigo-400">
                React State Management
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                with Sarah Chen
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tomorrow, 2:00 PM - 3:00 PM
              </p>
            </div>
            <Button size="sm" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700">
              Join Session
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}