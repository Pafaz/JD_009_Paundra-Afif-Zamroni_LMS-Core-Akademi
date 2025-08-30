'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MentorLayout from '@/components/mentor/MentorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Search,
    MessageSquare,
    Calendar,
    TrendingUp,
    User,
    Mail,
    Phone,
    BookOpen,
    Clock,
    Star
} from 'lucide-react'

const mockStudents = [
    {
        id: '1',
        name: 'Michael Johnson',
        email: 'michael.j@email.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: ['React Development', 'IoT Fundamentals'],
        totalSessions: 12,
        completedSessions: 8,
        averageRating: 4.8,
        lastSession: '2024-01-15',
        progress: 75,
        status: 'active'
    },
    {
        id: '2',
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: ['Full Stack Development'],
        totalSessions: 8,
        completedSessions: 6,
        averageRating: 4.9,
        lastSession: '2024-01-12',
        progress: 60,
        status: 'active'
    },
    {
        id: '3',
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: ['Arduino Programming'],
        totalSessions: 15,
        completedSessions: 15,
        averageRating: 4.7,
        lastSession: '2024-01-10',
        progress: 100,
        status: 'completed'
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.w@email.com',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: ['React Development'],
        totalSessions: 4,
        completedSessions: 2,
        averageRating: 5.0,
        lastSession: '2024-01-14',
        progress: 25,
        status: 'active'
    }
]

export default function MentorStudentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')

    const filteredStudents = mockStudents.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter
        return matchesSearch && matchesFilter
    })

    return (
        <MentorLayout>
            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                My Students
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage and track your students' progress
                            </p>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white dark:bg-slate-800"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedFilter('all')}
                            >
                                All Students
                            </Button>
                            <Button
                                variant={selectedFilter === 'active' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedFilter('active')}
                            >
                                Active
                            </Button>
                            <Button
                                variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedFilter('completed')}
                            >
                                Completed
                            </Button>
                        </div>
                    </div>

                    {/* Students Grid */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {filteredStudents.map((student, index) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={student.avatar} alt={student.name} />
                                            <AvatarFallback>
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {student.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                {student.email}
                                            </p>
                                            <Badge
                                                className={`mt-2 ${student.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
                                                    }`}
                                            >
                                                {student.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" variant="outline">
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Progress Overview */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Overall Progress
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {student.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${student.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Calendar className="h-4 w-4 text-indigo-600 mr-1" />
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {student.completedSessions}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Sessions</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {student.averageRating}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <BookOpen className="h-4 w-4 text-green-600 mr-1" />
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {student.enrolledCourses.length}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
                                    </div>
                                </div>

                                {/* Enrolled Courses */}
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Enrolled Courses:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {student.enrolledCourses.map((courseName, courseIndex) => (
                                            <Badge key={courseIndex} variant="outline" className="text-xs">
                                                {courseName}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Last Session */}
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    Last session: {new Date(student.lastSession).toLocaleDateString()}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Message
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <TrendingUp className="h-4 w-4 mr-2" />
                                        View Progress
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-12">
                            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No students found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {searchQuery ? 'Try adjusting your search terms' : 'Students will appear here once they enroll in your courses'}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </MentorLayout>
    )
}