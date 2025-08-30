"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | ""

interface CourseFormProps {
    formData: {
        title: string
        description: string
        difficulty: Difficulty
        durationWeeks: number
        price: number
        image: string
    }
    setFormData: (data: any) => void
    onSubmit: (e: React.FormEvent) => void
    submitLabel?: string
}

export default function CourseForm({ formData, setFormData, onSubmit, submitLabel = "Save" }: CourseFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Advanced React Development"
                    required
                />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what students will learn..."
                    rows={3}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                        value={formData.difficulty}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                difficulty: value as Difficulty,
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BEGINNER">Beginner</SelectItem>
                            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                            <SelectItem value="ADVANCED">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={formData.durationWeeks}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                durationWeeks: parseInt(e.target.value) || 0,
                            })
                        }
                        placeholder="e.g., 8"
                        required
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="price">Price (Rp)</Label>
                <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    placeholder="299"
                    required
                />
            </div>

            <div>
                <Label htmlFor="image">Course Image URL</Label>
                <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://pinterest.com/image.jpg"
                />
            </div>

            <Button type="submit" className="w-full">
                {submitLabel}
            </Button>
        </form>
    )
}
