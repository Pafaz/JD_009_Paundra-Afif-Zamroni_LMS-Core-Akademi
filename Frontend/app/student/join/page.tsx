'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from '@/components/student/StudentLayout'
import { useCourseStore } from '@/lib/store/courseStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Search,
    BookOpen,
    Clock,
    Users,
    Star,
    CheckCircle,
    AlertCircle
} from 'lucide-react'

export default function JoinCoursePage() {
    const { enrollInCourse } = useCourseStore()
    const [courseCode, setCourseCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [foundCourse, setFoundCourse] = useState<any>(null)
    const [error, setError] = useState('')

    const mockCourseData = {
        'LH-123456': {
            id: '1',
            title: 'React Development Masterclass',
            description: 'Master React development with hooks, context, and modern patterns',
            mentorName: 'Sarah Chen',
            category: 'web-development',
            difficulty: 'intermediate',
            duration: '10 weeks',
            price: 399,
            rating: 4.8,
            studentsCount: 256,
            image: 'https://images.pexels.com/photos/11035544/pexels-photo-11035544.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        'LH-789012': {
            id: '2',
            title: 'IoT Fundamentals',
            description: 'Learn the basics of Internet of Things and embedded systems',
            mentorName: 'David Rodriguez',
            category: 'iot',
            difficulty: 'beginner',
            duration: '8 weeks',
            price: 299,
            rating: 4.9,
            studentsCount: 124,
            image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
    }

    const handleSearchCourse = async () => {
        setIsLoading(true)
        setError('')
        setFoundCourse(null)

        // Simulate API call
        setTimeout(() => {
            const course = mockCourseData[courseCode as keyof typeof mockCourseData]

            if (course) {
                setFoundCourse(course)
            } else {
                setError('Course not found. Please check the course code and try again.')
            }

            setIsLoading(false)
        }, 1000)
    }

    const handleJoinCourse = async () => {
        if (foundCourse) {
            await enrollInCourse(foundCourse.id)
            setFoundCourse(null)
            setCourseCode('')
            // Show success message or redirect
        }
    }

    return (
        <StudentLayout>
            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Join a Course
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter the course code provided by your mentor to join a course
                        </p>
                    </div>

                    {/* Course Code Input */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="courseCode" className="text-lg font-medium">
                                    Course Code
                                </Label>
                                <div className="flex gap-4 mt-2">
                                    <Input
                                        id="courseCode"
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                                        placeholder="LH-XXXXXX"
                                        className="text-lg font-mono tracking-wider"
                                        maxLength={9}
                                    />
                                    <Button
                                        onClick={handleSearchCourse}
                                        disabled={!courseCode || isLoading}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                    >
                                        {isLoading ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        ) : (
                                            <>
                                                <Search className="h-4 w-4 mr-2" />
                                                Search
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                                    <p className="text-red-700 dark:text-red-400">{error}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Course Preview */}
                    {foundCourse && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                        >
                            <div className="relative h-48">
                                <img
                                    src={foundCourse.image}
                                    alt={foundCourse.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        {foundCourse.title}
                                    </h2>
                                    <p className="text-white/90 text-sm">
                                        by {foundCourse.mentorName}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="secondary">
                                        {foundCourse.category === 'iot' ? 'IoT' : 'Web Development'}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`${foundCourse.difficulty === 'beginner' ? 'text-green-600 border-green-600' :
                                                foundCourse.difficulty === 'intermediate' ? 'text-yellow-600 border-yellow-600' :
                                                    'text-red-600 border-red-600'
                                            }`}
                                    >
                                        {foundCourse.difficulty}
                                    </Badge>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {foundCourse.description}
                                </p>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Clock className="h-4 w-4 text-indigo-600 mr-1" />
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {foundCourse.duration}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Users className="h-4 w-4 text-indigo-600 mr-1" />
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {foundCourse.studentsCount}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {foundCourse.rating}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-indigo-600">
                                        ${foundCourse.price}
                                    </span>
                                    <Button
                                        onClick={handleJoinCourse}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Join Course
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Help Section */}
                    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Need Help?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Course codes are provided by your mentor and typically look like.
                            If you dont have a course code, contact your mentor or browse available courses.
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Contact Support
                            </Button>
                            <Button variant="outline" size="sm">
                                Browse Courses
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </StudentLayout>
    )
}