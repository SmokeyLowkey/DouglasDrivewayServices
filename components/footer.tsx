import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">
                D
              </div>
              <div>
                <h3 className="text-xl font-bold">Douglas Driveway Services</h3>
                <p className="text-sm text-slate-300">Professional Solutions</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Transforming properties with expert driveway services and cutting-edge AI technology for the best customer
              experience.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  Driveway Installation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  Repair & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  Sealcoating
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  Snow Removal
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-orange-400 transition-colors">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-orange-400 transition-colors">
                  Schedule Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>info@douglasdrivewayservices.ca</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Greater Toronto Area, ON</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>
                  Mon-Fri: 7AM-6PM
                  <br />
                  Sat: 8AM-4PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & AI Features */}
        <div className="border-t border-slate-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Facebook className="w-5 h-5 text-slate-400 hover:text-orange-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-slate-400 hover:text-orange-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-slate-400 hover:text-orange-400 cursor-pointer transition-colors" />
              </div>
              <div className="text-sm text-slate-400">Powered by AI Technology</div>
            </div>
            <div className="text-sm text-slate-400">© 2024 Douglas Driveway Services. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
