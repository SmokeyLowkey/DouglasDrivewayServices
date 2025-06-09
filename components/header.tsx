"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">
              D
            </div>
            <div>
              <h1 className="text-xl font-bold">Douglas Driveway Services</h1>
              <p className="text-sm text-slate-300">Professional Driveway Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-orange-400 transition-colors">
              Services
            </Link>
            <Link href="/gallery" className="hover:text-orange-400 transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="hover:text-orange-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="text-black border-orange-600 hover:bg-orange-600 hover:text-slate-900">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Link href="/schedule">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
              <Link href="/services" className="hover:text-orange-400 transition-colors">
                Services
              </Link>
              <Link href="/gallery" className="hover:text-orange-400 transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="hover:text-orange-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white hover:text-slate-900"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Link href="/schedule">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
