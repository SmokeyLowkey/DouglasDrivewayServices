import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Toronto, ON",
    rating: 5,
    text: "The curved driveway design exceeded our expectations! The AI scheduling system made booking so easy, and Douglas's team delivered exceptional craftsmanship. Our property value has definitely increased.",
    service: "Custom Driveway Installation",
  },
  {
    name: "Mike Chen",
    location: "Mississauga, ON",
    rating: 5,
    text: "I was impressed by the chatbot that answered all my questions instantly. The actual service exceeded expectations - our old driveway looks brand new!",
    service: "Sealcoating",
  },
  {
    name: "Jennifer Smith",
    location: "Brampton, ON",
    rating: 5,
    text: "The voice assistant feature is incredible for accessibility. Douglas Driveway Services combines cutting-edge technology with traditional craftsmanship perfectly.",
    service: "Repair & Maintenance",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-slate-600">
            Real feedback from satisfied customers who experienced our AI-enhanced service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-orange-500 mr-3" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
