'use client'

import HeroSection from './HeroSection'
import ValueProposition from './ValueProposition'
import CoursePreview from './CoursePreview'
import TestimonialsSection from './TestimonialsSection'
import CTASection from './CTASection'
import Footer from './Footer'
import Navbar from './Navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <CoursePreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}