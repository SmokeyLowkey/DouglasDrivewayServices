import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Calendar, Mic, MessageSquare, Clock, Headphones } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI Chat Assistant",
    description:
      "Get instant answers to your questions 24/7 with our intelligent chatbot that understands your driveway needs.",
    benefits: ["Instant responses", "Service recommendations", "Cost estimates"],
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Book appointments effortlessly with our AI-powered scheduling system that finds the perfect time for you.",
    benefits: ["Real-time availability", "Automatic reminders", "Easy rescheduling"],
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description: "Navigate our website and get information hands-free with voice commands and audio responses.",
    benefits: ["Hands-free navigation", "Accessibility features", "Voice booking"],
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">AI-Powered Experience</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience the future of customer service with our cutting-edge AI features designed to make your
            interaction seamless and efficient
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-3">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center justify-center text-sm text-slate-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-orange-400" />
              <span>Instant Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="w-6 h-6 text-orange-400" />
              <span>Voice Enabled</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3">Ready to Experience the Future?</h3>
          <p className="text-slate-300">
            Try our AI features now and see how technology enhances your service experience.
          </p>
        </div>
      </div>
    </section>
  )
}
