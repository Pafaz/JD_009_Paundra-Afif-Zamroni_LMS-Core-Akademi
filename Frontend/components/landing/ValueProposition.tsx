'use client'

import { motion } from 'framer-motion'
import { PersonStanding, Calendar, Trophy, Zap } from 'lucide-react'

const features = [
  {
    icon: PersonStanding,
    title: '1-on-1 Personalized Learning',
    description: 'Get dedicated attention from expert mentors who adapt to your learning pace and style.'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience with our easy-to-use scheduling system.'
  },
  {
    icon: Trophy,
    title: 'Expert Mentors',
    description: 'Learn from industry professionals with years of experience in IoT and Web Development.'
  },
  {
    icon: Zap,
    title: 'Accelerated Progress',
    description: 'Achieve your learning goals faster with focused, hands-on guidance and real-world projects.'
  }
]

export default function ValueProposition() {
  return (
    <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Core Akademi?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of digital education with our innovative 1-on-1 learning platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}