'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import MentorLayout from '@/components/mentor/MentorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Upload,
    FileText,
    Video,
    Image as ImageIcon,
    Download,
    Edit,
    Trash2,
    Plus,
    File,
    Link as LinkIcon
} from 'lucide-react'

const mockMaterials = [
    {
        id: '1',
        title: 'React Fundamentals Guide',
        type: 'pdf',
        size: '2.4 MB',
        uploadedAt: '2024-01-10',
        downloads: 45,
        url: '#'
    },
    {
        id: '2',
        title: 'Component Lifecycle Video',
        type: 'video',
        size: '125 MB',
        uploadedAt: '2024-01-08',
        downloads: 32,
        url: '#'
    },
    {
        id: '3',
        title: 'Hooks Cheat Sheet',
        type: 'image',
        size: '890 KB',
        uploadedAt: '2024-01-05',
        downloads: 67,
        url: '#'
    }
]

export default function CourseMaterialsPage() {
    const params = useParams()
    const courseId = params.id as string
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [uploadForm, setUploadForm] = useState({
        title: '',
        description: '',
        type: '',
        file: null as File | null,
        url: ''
    })

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()

        // Simulate upload process
        console.log('Uploading material:', uploadForm)

        setIsUploadOpen(false)
        setUploadForm({
            title: '',
            description: '',
            type: '',
            file: null,
            url: ''
        })
    }

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'video':
                return Video
            case 'image':
                return ImageIcon
            case 'pdf':
                return FileText
            default:
                return File
        }
    }

    const getFileColor = (type: string) => {
        switch (type) {
            case 'video':
                return 'text-red-600'
            case 'image':
                return 'text-green-600'
            case 'pdf':
                return 'text-blue-600'
            default:
                return 'text-gray-600'
        }
    }

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
                                Course Materials
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Upload and manage learning materials for your course
                            </p>
                        </div>

                        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Material
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Upload New Material</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleUpload} className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Material Title</Label>
                                        <Input
                                            id="title"
                                            value={uploadForm.title}
                                            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                                            placeholder="e.g., React Hooks Guide"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={uploadForm.description}
                                            onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                                            placeholder="Brief description of the material..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="type">Material Type</Label>
                                        <Select value={uploadForm.type} onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pdf">PDF Document</SelectItem>
                                                <SelectItem value="video">Video</SelectItem>
                                                <SelectItem value="image">Image</SelectItem>
                                                <SelectItem value="link">External Link</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {uploadForm.type === 'link' ? (
                                        <div>
                                            <Label htmlFor="url">URL</Label>
                                            <Input
                                                id="url"
                                                type="url"
                                                value={uploadForm.url}
                                                onChange={(e) => setUploadForm({ ...uploadForm, url: e.target.value })}
                                                placeholder="https://example.com"
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <Label htmlFor="file">Upload File</Label>
                                            <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    Click to upload or drag and drop
                                                </p>
                                                <Input
                                                    id="file"
                                                    type="file"
                                                    onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                                                    className="hidden"
                                                    accept={uploadForm.type === 'video' ? 'video/*' : uploadForm.type === 'image' ? 'image/*' : '.pdf,.doc,.docx'}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => document.getElementById('file')?.click()}
                                                >
                                                    Choose File
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full">
                                        Upload Material
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Materials Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockMaterials.map((material, index) => {
                            const IconComponent = getFileIcon(material.type)
                            const iconColor = getFileColor(material.type)

                            return (
                                <motion.div
                                    key={material.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center ${iconColor}`}>
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <div className="flex space-x-1">
                                            <Button size="sm" variant="ghost">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {material.title}
                                    </h3>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <div className="flex justify-between">
                                            <span>Size:</span>
                                            <span>{material.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Uploaded:</span>
                                            <span>{new Date(material.uploadedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Downloads:</span>
                                            <span>{material.downloads}</span>
                                        </div>
                                    </div>

                                    <Button size="sm" className="w-full" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>

                    {mockMaterials.length === 0 && (
                        <div className="text-center py-12">
                            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No materials uploaded yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Start by uploading your first course material
                            </p>
                            <Button onClick={() => setIsUploadOpen(true)}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload First Material
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </MentorLayout>
    )
}