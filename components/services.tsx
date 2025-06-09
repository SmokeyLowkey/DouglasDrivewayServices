import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hammer, Wrench, Sparkles, Shield, Calendar } from "lucide-react"

const services = [
  {
    icon: Hammer,
    title: "Driveway Installation",
    description: "Complete driveway installation with premium materials and expert craftsmanship.",
    features: ["Asphalt & Concrete", "Custom Designs", "10-Year Warranty"],
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Professional repair services to extend the life of your existing driveway.",
    features: ["Crack Sealing", "Resurfacing", "Pothole Repair"],
  },
  {
    icon: Sparkles,
    title: "Sealcoating",
    description: "Protect and enhance your driveway with our premium sealcoating services.",
    features: ["Weather Protection", "Enhanced Appearance", "Extended Lifespan"],
  },
  {
    icon: Shield,
    title: "Snow Removal",
    description: "Reliable snow removal services to keep your driveway safe and accessible.",
    features: ["24/7 Service", "Seasonal Contracts", "Salt Application"],
  },
]

export function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive driveway solutions tailored to your needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                <CardDescription className="text-slate-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-slate-900 hover:bg-slate-800">
                  <Calendar className="w-4 h-4 mr-2" />
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add this section after the services grid and before the closing </div> */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Work Speaks for Itself</h3>
            <p className="text-lg text-slate-600">See the dramatic transformations we achieve</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/images/before-after-driveway.jpg"
                  alt="Before and after driveway restoration showing dramatic improvement"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Complete Driveway Restoration</h4>
                  <p className="text-slate-600">
                    Transformed this worn concrete driveway into a smooth, pristine surface that enhances the entire
                    property's curb appeal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/images/washed-driveway.jpg"
                  alt="Professional driveway cleaning and washing service results"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Professional Cleaning Service</h4>
                  <p className="text-slate-600">
                    Our specialized washing techniques remove years of buildup, restoring your driveway's original
                    appearance and extending its lifespan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
