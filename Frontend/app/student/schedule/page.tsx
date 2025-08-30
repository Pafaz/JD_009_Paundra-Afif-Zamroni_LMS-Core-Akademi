'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from '@/components/student/StudentLayout'
import { useScheduleStore } from '@/lib/store/scheduleStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    Plus,
    User,
    MessageSquare,
    Star
} from 'lucide-react'

export default function StudentSchedulePage() {
    const { sessions, fetchSessions, bookSession } = useScheduleStore()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [bookingForm, setBookingForm] = useState({
        courseId: '',
        title: '',
        description: '',
        date: '',
        time: '',
        duration: 60
    })

    useEffect(() => {
        fetchSessions()
    }, [fetchSessions])

    const handleBookSession = async (e: React.FormEvent) => {
        e.preventDefault()

        const sessionData = {
            courseId: bookingForm.courseId,
            mentorId: 'mentor1',
            studentId: 'student1',
            title: bookingForm.title,
            description: bookingForm.description,
            scheduledAt: new Date(`${bookingForm.date}T${bookingForm.time}`),
            duration: bookingForm.duration,
            status: 'scheduled' as const
        }

        await bookSession(sessionData)
        setIsBookingOpen(false)
        setBookingForm({
            courseId: '',
            title: '',
            description: '',
            date: '',
            time: '',
            duration: 60
        })
    }

    const upcomingSessions = sessions.filter(s =>
        s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
    )

    const completedSessions = sessions.filter(s => s.status === 'completed')

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
                                My Schedule
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage your 1-on-1 learning sessions
                            </p>
                        </div>

                        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Book Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Book a New Session</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleBookSession} className="space-y-4">
                                    <div>
                                        <Label htmlFor="course">Course</Label>
                                        <Select value={bookingForm.courseId} onValueChange={(value) => setBookingForm({ ...bookingForm, courseId: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a course" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">React Development</SelectItem>
                                                <SelectItem value="2">IoT Fundamentals</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="title">Session Title</Label>
                                        <Input
                                            id="title"
                                            value={bookingForm.title}
                                            onChange={(e) => setBookingForm({ ...bookingForm, title: e.target.value })}
                                            placeholder="e.g., React Hooks Review"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={bookingForm.description}
                                            onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                                            placeholder="What would you like to focus on?"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={bookingForm.date}
                                                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="time">Time</Label>
                                            <Input
                                                id="time"
                                                type="time"
                                                value={bookingForm.time}
                                                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Select value={bookingForm.duration.toString()} onValueChange={(value) => setBookingForm({ ...bookingForm, duration: parseInt(value) })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="60">60 minutes</SelectItem>
                                                <SelectItem value="90">90 minutes</SelectItem>
                                                <SelectItem value="120">120 minutes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Book Session
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Calendar */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Calendar
                            </h3>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                            />
                        </div>

                        {/* Sessions List */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Upcoming Sessions */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Upcoming Sessions ({upcomingSessions.length})
                                </h3>

                                <div className="space-y-4">
                                    {upcomingSessions.map((session, index) => (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-indigo-200 dark:border-indigo-800"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {session.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {session.description}
                                                    </p>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                                            {new Date(session.scheduledAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                                    <Video className="h-4 w-4 mr-2" />
                                                    Join
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {upcomingSessions.length === 0 && (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No upcoming sessions. Book a new session to get started!
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Completed Sessions */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Completed Sessions ({completedSessions.length})
                                </h3>

                                <div className="space-y-4">
                                    {completedSessions.map((session, index) => (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {session.title}
                                                    </h4>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                                            {new Date(session.scheduledAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {session.duration} min
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className="bg-green-500">Completed</Badge>
                                                    {session.feedback && (
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-3 w-3 ${i < session.feedback!.rating
                                                                            ? 'text-yellow-400 fill-current'
                                                                            : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </StudentLayout>
    )
}