'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MentorLayout from '@/components/mentor/MentorLayout'
import { useCourseStore } from '@/lib/store/courseStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Users, Clock, Star, Edit, Copy, Eye, BookOpen, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CourseForm from '@/components/mentor/course-form'

export default function MentorCoursesPage() {
    const { courses, fetchCourses, createCourse, updateCourse } = useCourseStore()
    const [courseForm, setCourseForm] = useState({
        title: '',
        description: '',
        difficulty: '' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | '',
        durationWeeks: 0,
        price: 0,
        image: ''
    })
    const [editCourseId, setEditCourseId] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    // Reset form & mode
    const resetForm = () => {
        setCourseForm({
            title: '',
            description: '',
            difficulty: '',
            durationWeeks: 0,
            price: 0,
            image: ''
        })
        setEditCourseId(null)
    }

    const openCreate = () => {
        resetForm()
        setIsModalOpen(true)
    }

    const openEdit = (course: Course) => {
        setCourseForm({
            title: course.title,
            description: course.description,
            difficulty: course.difficulty,
            durationWeeks: course.durationWeeks,
            price: course.price,
            image: course.image
        })
        setEditCourseId(course.id)
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        resetForm()
        setIsModalOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (editCourseId) {
            await updateCourse(editCourseId, courseForm)
        } else {
            await createCourse({
                title: courseForm.title,
                description: courseForm.description,
                difficulty: courseForm.difficulty || 'BEGINNER',
                durationWeeks: courseForm.durationWeeks,
                price: courseForm.price,
                image: courseForm.image || 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600',
            })
        }

        setIsModalOpen(false)
        resetForm()
    }

    const filteredCourses = (courses ?? []).filter(
        (course) =>
            course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course?.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <MentorLayout>
            <div className="p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Courses</h1>
                            <p className="text-gray-600 dark:text-gray-400">Create and manage your courses</p>
                        </div>

                        {/* Trigger Create */}
                        <Button onClick={openCreate} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Course
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white dark:bg-slate-800"
                        />
                    </div>

                    {/* Courses Grid */}
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
                                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${course.difficulty === 'BEGINNER'
                                                        ? 'text-green-600 border-green-600'
                                                        : course.difficulty === 'INTERMEDIATE'
                                                            ? 'text-yellow-600 border-yellow-600'
                                                            : 'text-red-600 border-red-600'
                                                    }`}
                                            >
                                                {course.difficulty}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {course.durationWeeks} weeks
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-3 w-3 mr-1" />
                                                {course.students?.length || 0}
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                                                {course.materials?.length || 0} materials
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 mb-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Course Code</p>
                                                <p className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{course.code}</p>
                                            </div>
                                            <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(course.code)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => openEdit(course)}>
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </Button>
                                            <Button size="sm" className="flex-1" onClick={() => router.push(`/mentor/courses/${course.id}/detail`)}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Modal Create/Edit */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>{editCourseId ? 'Edit Course' : 'Create New Course'}</DialogTitle>
                            </DialogHeader>
                            <CourseForm formData={courseForm} setFormData={setCourseForm} onSubmit={handleSubmit} onCancel={handleCancel} submitLabel={editCourseId ? 'Save Changes' : 'Create Course'} />
                        </DialogContent>
                    </Dialog>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {searchQuery ? 'Try adjusting your search terms' : 'Create your first course to get started'}
                            </p>
                            {!searchQuery && (
                                <Button onClick={openCreate}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Course
                                </Button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </MentorLayout>
    )
}
