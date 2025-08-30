import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">Core Akademi</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering digital learners through personalized 1-on-1 mentoring in IoT and Web Development.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <LinkedIn className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3" />
                core.akademi@gmail.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3" />
                +62 123 456 789
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3" />
                Banyuwangi, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 . All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ for digital learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}