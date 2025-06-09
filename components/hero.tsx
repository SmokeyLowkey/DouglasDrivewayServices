import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Phone, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional <span className="text-orange-500">Driveway</span> Services
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Transform your property with our expert driveway installation, repair, and maintenance services. Quality
                workmanship backed by years of experience.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <span className="text-slate-300">500+ Satisfied Customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Estimate
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-orange-600 border-white hover:bg-white hover:text-slate-900 px-8 py-3"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (555) 123-4567
              </Button>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-orange-500" />
                New AI-Powered Features
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• 24/7 AI Chat Assistant for instant support</li>
                <li>• Smart appointment scheduling system</li>
                <li>• Voice-activated navigation and assistance</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
              <img
                src="/images/curved-driveway.jpg"
                alt="Professional curved concrete driveway with decorative stone landscaping"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                Free Estimates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
