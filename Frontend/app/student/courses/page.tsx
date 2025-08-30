'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from '@/components/student/StudentLayout'
import { useCourseStore } from '@/lib/store/courseStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  Star, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Play,
  BookOpen
} from 'lucide-react'

export default function StudentCoursesPage() {
  const { courses, enrolledCourses, fetchCourses, enrollInCourse } = useCourseStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEnroll = async (courseId: string) => {
    await enrollInCourse(courseId)
  }

  return (
    <StudentLayout>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Courses
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your enrolled courses and explore new learning opportunities
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === 'iot' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('iot')}
              >
                IoT
              </Button>
              <Button
                variant={selectedCategory === 'web-development' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('web-development')}
              >
                Web Dev
              </Button>
            </div>

            <div className="flex gap-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          {enrolledCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Continue Learning
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          Enrolled
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {course.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Progress: 65%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-16 h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Available Courses */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Available Courses
            </h2>
            
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              course.difficulty === 'beginner' ? 'text-green-600 border-green-600' :
                              course.difficulty === 'intermediate' ? 'text-yellow-600 border-yellow-600' :
                              'text-red-600 border-red-600'
                            }`}
                          >
                            {course.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {course.studentsCount}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-indigo-600">
                            ${course.price}
                          </span>
                          <Button 
                            onClick={() => handleEnroll(course.id)}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full sm:w-48 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              {course.category === 'iot' ? 'IoT' : 'Web Development'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {course.difficulty}
                            </Badge>
                          </div>
                          <span className="text-2xl font-bold text-indigo-600">
                            Rp {course.price}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {course.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {course.studentsCount}
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              {course.rating}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleEnroll(course.id)}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </StudentLayout>
  )
}