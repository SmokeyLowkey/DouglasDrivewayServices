import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Curved Decorative Driveway",
    description: "Custom curved concrete driveway with premium stone landscaping accents",
    image: "/images/curved-driveway.jpg",
    category: "Installation",
    location: "Toronto, ON",
  },
  {
    id: 2,
    title: "Professional Driveway Cleaning",
    description: "Complete driveway washing and restoration service",
    image: "/images/washed-driveway.jpg",
    category: "Cleaning",
    location: "Mississauga, ON",
  },
  {
    id: 3,
    title: "Complete Driveway Transformation",
    description: "Before and after: Complete driveway resurfacing and restoration",
    image: "/images/before-after-driveway.jpg",
    category: "Restoration",
    location: "Brampton, ON",
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Gallery</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our portfolio of completed driveway projects showcasing quality craftsmanship and attention to
              detail
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                    <span>{project.location}</span>
                  </div>

                  <Link href="/schedule">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Get Similar Work Done
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Driveway?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have enhanced their properties with our professional driveway
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Estimate
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-orange-600 border-white hover:bg-white hover:text-slate-900"
                >
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
