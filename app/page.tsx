import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { ChatBot } from "@/components/chat-bot"
import { VoiceAssistant } from "@/components/voice-assistant"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <Contact />
      <ChatBot />
      <VoiceAssistant />
    </main>
  )
}
