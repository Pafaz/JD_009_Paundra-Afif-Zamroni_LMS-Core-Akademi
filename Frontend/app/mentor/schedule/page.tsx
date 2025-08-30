'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MentorLayout from '@/components/mentor/MentorLayout'
import { useScheduleStore } from '@/lib/store/scheduleStore'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    Plus,
    Calendar as CalendarIcon,
    Clock,
    User,
    Video,
    Settings,
    CheckCircle,
    X
} from 'lucide-react'

export default function MentorSchedulePage() {
    const { sessions, availability, fetchSessions, setAvailability } = useScheduleStore()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
    const [availabilityForm, setAvailabilityForm] = useState({
        dayOfWeek: '',
        startTime: '',
        endTime: ''
    })

    useEffect(() => {
        fetchSessions()
    }, [fetchSessions])

    const handleSetAvailability = async (e: React.FormEvent) => {
        e.preventDefault()

        const newSlot = {
            dayOfWeek: parseInt(availabilityForm.dayOfWeek),
            startTime: availabilityForm.startTime,
            endTime: availabilityForm.endTime,
            isActive: true
        }

        await setAvailability('mentor1', [newSlot])
        setIsAvailabilityOpen(false)
        setAvailabilityForm({
            dayOfWeek: '',
            startTime: '',
            endTime: ''
        })
    }

    const upcomingSessions = sessions.filter(s =>
        s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
    ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

    const todaySessions = upcomingSessions.filter(s =>
        new Date(s.scheduledAt).toDateString() === new Date().toDateString()
    )

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
                                Schedule Management
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage your availability and upcoming sessions
                            </p>
                        </div>

                        <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Set Availability
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Set Your Availability</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSetAvailability} className="space-y-4">
                                    <div>
                                        <Label htmlFor="dayOfWeek">Day of Week</Label>
                                        <Select value={availabilityForm.dayOfWeek} onValueChange={(value) => setAvailabilityForm({ ...availabilityForm, dayOfWeek: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {dayNames.map((day, index) => (
                                                    <SelectItem key={index} value={index.toString()}>
                                                        {day}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="startTime">Start Time</Label>
                                            <Input
                                                id="startTime"
                                                type="time"
                                                value={availabilityForm.startTime}
                                                onChange={(e) => setAvailabilityForm({ ...availabilityForm, startTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="endTime">End Time</Label>
                                            <Input
                                                id="endTime"
                                                type="time"
                                                value={availabilityForm.endTime}
                                                onChange={(e) => setAvailabilityForm({ ...availabilityForm, endTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Add Availability Slot
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

                            {/* Current Availability */}
                            <div className="mt-6">
                                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                                    Weekly Availability
                                </h4>
                                <div className="space-y-2">
                                    {availability.length > 0 ? (
                                        availability.map((slot, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {dayNames[slot.dayOfWeek]}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {slot.startTime} - {slot.endTime}
                                                    </p>
                                                </div>
                                                <Button size="sm" variant="ghost">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                            No availability set
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sessions */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Today's Sessions */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Today`&apos;`s Sessions ({todaySessions.length})
                                </h3>

                                <div className="space-y-4">
                                    {todaySessions.map((session, index) => (
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
                                                            <User className="h-4 w-4 mr-1" />
                                                            Student Name
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                                    <Video className="h-4 w-4 mr-2" />
                                                    Start
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {todaySessions.length === 0 && (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No sessions scheduled for today
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upcoming Sessions */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Upcoming Sessions
                                </h3>

                                <div className="space-y-4">
                                    {upcomingSessions.filter(s =>
                                        new Date(s.scheduledAt).toDateString() !== new Date().toDateString()
                                    ).map((session, index) => (
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
                                                            {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <User className="h-4 w-4 mr-1" />
                                                            Student Name
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge>Scheduled</Badge>
                                                    <Button size="sm" variant="outline">
                                                        Reschedule
                                                    </Button>
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
        </MentorLayout>
    )
}