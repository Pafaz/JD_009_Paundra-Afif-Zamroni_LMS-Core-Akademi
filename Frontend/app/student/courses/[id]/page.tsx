'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import StudentLayout from '@/components/student/StudentLayout'
import { useCourseStore } from '@/lib/store/courseStore'
import { useScheduleStore } from '@/lib/store/scheduleStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Play,
    Clock,
    Users,
    Star,
    Calendar,
    CheckCircle,
    FileText,
    Video,
    Download,
    MessageSquare,
    BookOpen
} from 'lucide-react'

export default function CourseDetailPage() {
    const params = useParams()
    const courseId = params.id as string
    const { courses, enrolledCourses } = useCourseStore()
    const { sessions } = useScheduleStore()

    const course = courses.find(c => c.id === courseId) || enrolledCourses.find(c => c.id === courseId)
    const isEnrolled = enrolledCourses.some(c => c.id === courseId)
    const courseSessions = sessions.filter(s => s.courseId === courseId)

    const mockLessons = [
        {
            id: '1',
            title: 'Introduction to React Components',
            description: 'Learn the fundamentals of React components and JSX',
            duration: 45,
            isCompleted: true,
            videoUrl: 'https://example.com/video1',
            materials: ['React Basics Guide.pdf', 'Component Examples.zip']
        },
        {
            id: '2',
            title: 'State Management with Hooks',
            description: 'Master useState and useEffect hooks',
            duration: 60,
            isCompleted: true,
            videoUrl: 'https://example.com/video2',
            materials: ['Hooks Cheatsheet.pdf', 'Practice Exercises.zip']
        },
        {
            id: '3',
            title: 'Building Interactive UIs',
            description: 'Create dynamic user interfaces with event handling',
            duration: 75,
            isCompleted: false,
            videoUrl: 'https://example.com/video3',
            materials: ['UI Patterns Guide.pdf', 'Interactive Examples.zip']
        }
    ]

    const mockFeedback = [
        {
            id: '1',
            sessionTitle: 'React Hooks Deep Dive',
            mentorName: 'Sarah Chen',
            date: '2024-01-15',
            rating: 5,
            comment: 'Excellent session! John showed great understanding of hooks and asked thoughtful questions. Keep up the great work!'
        },
        {
            id: '2',
            sessionTitle: 'Component Architecture',
            mentorName: 'Sarah Chen',
            date: '2024-01-08',
            rating: 4,
            comment: 'Good progress on component design. Focus more on prop validation and error handling in the next session.'
        }
    ]

    if (!course) {
        return (
            <StudentLayout>
                <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h1>
                </div>
            </StudentLayout>
        )
    }

    return (
        <StudentLayout>
            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Course Header */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8">
                        <div className="relative h-64">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-white/20 text-white border-white/30">
                                        {course.category === 'iot' ? 'IoT' : 'Web Development'}
                                    </Badge>
                                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                                        {course.difficulty}
                                    </Badge>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
                                <p className="text-white/90">{course.description}</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2" />
                                    {course.studentsCount} students
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                                    {course.rating} rating
                                </div>
                                <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    {mockLessons.length} lessons
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Content */}
                    <Tabs defaultValue="lessons" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800 rounded-xl p-1">
                            <TabsTrigger value="lessons">Lessons</TabsTrigger>
                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            <TabsTrigger value="materials">Materials</TabsTrigger>
                            <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>

                        {/* Lessons Tab */}
                        <TabsContent value="lessons">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Course Lessons
                                    </h2>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {mockLessons.filter(l => l.isCompleted).length} of {mockLessons.length} completed
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {mockLessons.map((lesson, index) => (
                                        <motion.div
                                            key={lesson.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className={`p-6 rounded-xl border transition-all duration-300 ${lesson.isCompleted
                                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                                    : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lesson.isCompleted
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400'
                                                        }`}>
                                                        {lesson.isCompleted ? (
                                                            <CheckCircle className="h-6 w-6" />
                                                        ) : (
                                                            <Play className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {lesson.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                            {lesson.description}
                                                        </p>
                                                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {lesson.duration} minutes
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant={lesson.isCompleted ? "outline" : "default"}
                                                    className={!lesson.isCompleted ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" : ""}
                                                >
                                                    {lesson.isCompleted ? 'Review' : 'Start Lesson'}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Schedule Tab */}
                        <TabsContent value="schedule">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        1-on-1 Sessions
                                    </h2>
                                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Book New Session
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {courseSessions.map((session, index) => (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-gray-600"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                        {session.title}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                                        {session.description}
                                                    </p>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            {new Date(session.scheduledAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {session.duration} minutes
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge
                                                        variant={session.status === 'completed' ? 'default' : 'secondary'}
                                                        className={session.status === 'completed' ? 'bg-green-500' : ''}
                                                    >
                                                        {session.status}
                                                    </Badge>
                                                    {session.status === 'scheduled' && (
                                                        <Button size="sm">Join Session</Button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Materials Tab */}
                        <TabsContent value="materials">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Course Materials
                                </h2>

                                <div className="grid gap-6">
                                    {mockLessons.map((lesson, index) => (
                                        <motion.div
                                            key={lesson.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                {lesson.title}
                                            </h3>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {lesson.videoUrl && (
                                                    <div className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-600">
                                                        <Video className="h-8 w-8 text-indigo-600 mr-3" />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900 dark:text-white">Video Lesson</p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.duration} minutes</p>
                                                        </div>
                                                        <Button size="sm" variant="outline">
                                                            <Play className="h-4 w-4 mr-2" />
                                                            Watch
                                                        </Button>
                                                    </div>
                                                )}

                                                {lesson.materials?.map((material, materialIndex) => (
                                                    <div key={materialIndex} className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-600">
                                                        <FileText className="h-8 w-8 text-green-600 mr-3" />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900 dark:text-white">{material}</p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">PDF Document</p>
                                                        </div>
                                                        <Button size="sm" variant="outline">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Feedback Tab */}
                        <TabsContent value="feedback">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Session Feedback
                                </h2>

                                <div className="space-y-6">
                                    {mockFeedback.map((feedback, index) => (
                                        <motion.div
                                            key={feedback.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {feedback.sessionTitle}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        with {feedback.mentorName} • {new Date(feedback.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < feedback.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300 dark:text-gray-600'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {feedback.comment}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </StudentLayout>
    )
}