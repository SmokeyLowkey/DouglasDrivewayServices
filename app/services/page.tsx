import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle, Hammer, Wrench, Sparkles, Shield, Clock, Star, Phone } from "lucide-react"

const services = [
  {
    id: "installation",
    icon: Hammer,
    title: "Driveway Installation",
    shortDescription: "Complete driveway installation with premium materials and expert craftsmanship.",
    fullDescription:
      "Transform your property with a brand new driveway designed to last. We specialize in both asphalt and concrete installations, offering custom designs that complement your home's architecture and enhance curb appeal.",
    features: [
      "Asphalt & Concrete Options",
      "Custom Design Consultation",
      "Professional Site Preparation",
      "Proper Drainage Systems",
      "10-Year Warranty",
      "Free Design Mockups",
    ],
    pricing: "Starting from $8/sq ft",
    duration: "3-5 days",
    image: "/images/curved-driveway.jpg",
    popular: true,
  },
  {
    id: "repair",
    icon: Wrench,
    title: "Repair & Maintenance",
    shortDescription: "Professional repair services to extend the life of your existing driveway.",
    fullDescription:
      "Don't replace when you can repair! Our expert team can restore your driveway to like-new condition with professional repair and maintenance services that save you money and extend your driveway's lifespan.",
    features: [
      "Crack Sealing & Filling",
      "Pothole Repair",
      "Surface Resurfacing",
      "Edge Restoration",
      "Drainage Improvements",
      "Preventive Maintenance Plans",
    ],
    pricing: "Starting from $150",
    duration: "1-2 days",
    image: "/images/before-after-driveway.jpg",
    popular: false,
  },
  {
    id: "sealcoating",
    icon: Sparkles,
    title: "Sealcoating & Protection",
    shortDescription: "Protect and enhance your driveway with our premium sealcoating services.",
    fullDescription:
      "Extend your driveway's life and enhance its appearance with professional sealcoating. Our premium sealers protect against weather damage, oil stains, and everyday wear while giving your driveway a fresh, new look.",
    features: [
      "Premium Sealer Application",
      "Weather Protection",
      "Enhanced Appearance",
      "Oil & Stain Resistance",
      "UV Protection",
      "2-Year Protection Guarantee",
    ],
    pricing: "Starting from $0.25/sq ft",
    duration: "1 day",
    image: "/images/washed-driveway.jpg",
    popular: false,
  },
  {
    id: "snow-removal",
    icon: Shield,
    title: "Snow Removal",
    shortDescription: "Reliable snow removal services to keep your driveway safe and accessible.",
    fullDescription:
      "Stay safe and accessible all winter long with our professional snow removal services. We offer both on-demand and seasonal contract options to keep your driveway clear and safe for your family and guests.",
    features: [
      "24/7 Emergency Service",
      "Seasonal Contracts Available",
      "Salt & De-icing Application",
      "Residential & Commercial",
      "Insured & Bonded",
      "Priority Customer Programs",
    ],
    pricing: "Starting from $45/visit",
    duration: "Same day",
    image: "/placeholder.svg?height=300&width=400",
    popular: false,
  },
]

const processSteps = [
  {
    step: 1,
    title: "Free Consultation",
    description: "We assess your property and discuss your needs and budget",
  },
  {
    step: 2,
    title: "Custom Quote",
    description: "Receive a detailed estimate with no hidden fees",
  },
  {
    step: 3,
    title: "Project Planning",
    description: "We create a timeline and plan that works for your schedule",
  },
  {
    step: 4,
    title: "Expert Installation",
    description: "Our skilled team completes your project with precision",
  },
  {
    step: 5,
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive warranties",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="outline" className="mb-8 text-black border-white hover:bg-white hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional <span className="text-orange-500">Driveway</span> Services
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              From new installations to repairs and maintenance, we provide comprehensive driveway solutions backed by
              years of experience and cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Estimate
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-orange-600 border-white hover:bg-white hover:text-slate-900"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive driveway solutions tailored to your specific needs and budget
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  {service.popular && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">Most Popular</Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </span>
                          <span className="font-medium text-orange-600">{service.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">What's Included:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Link href="/schedule" className="flex-1">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Get Quote
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Process</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From initial consultation to project completion, we ensure a smooth and professional experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && <div className="w-0.5 h-16 bg-slate-200 mx-auto mt-4"></div>}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Douglas Driveway Services?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Quality Guaranteed</h3>
                <p className="text-slate-600">
                  We stand behind our work with comprehensive warranties and use only premium materials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">On-Time Delivery</h3>
                <p className="text-slate-600">
                  We respect your time and complete projects according to agreed schedules.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Licensed & Insured</h3>
                <p className="text-slate-600">
                  Fully licensed, bonded, and insured for your peace of mind and protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and see how we can transform your driveway.
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
      </section>
    </div>
  )
}
