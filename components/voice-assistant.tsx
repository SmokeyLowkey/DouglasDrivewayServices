"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  }, [])

  const startListening = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript
      setTranscript(speechResult)
      handleVoiceCommand(speechResult)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    let response = ""

    if (lowerCommand.includes("schedule") || lowerCommand.includes("appointment")) {
      response =
        "I can help you schedule an appointment. Our next available slots are tomorrow at 10 AM or 2 PM. Would you prefer morning or afternoon?"
      // Navigate to scheduling page
      setTimeout(() => {
        window.location.href = "/schedule"
      }, 3000)
    } else if (lowerCommand.includes("services") || lowerCommand.includes("what do you do")) {
      response =
        "We offer driveway installation, repair and maintenance, sealcoating, and snow removal services. Which service interests you?"
    } else if (lowerCommand.includes("price") || lowerCommand.includes("cost")) {
      response =
        "Our pricing depends on the project size and type. I can connect you with our team for a free estimate. Would you like me to schedule a consultation?"
    } else if (lowerCommand.includes("contact") || lowerCommand.includes("phone")) {
      response =
        "You can reach us at 5-5-5, 1-2-3, 4-5-6-7. We are open Monday through Friday, 7 AM to 6 PM, and Saturday 8 AM to 4 PM."
    } else if (lowerCommand.includes("location") || lowerCommand.includes("where")) {
      response =
        "We serve the Greater Toronto Area in Ontario. Our team can provide services throughout the GTA region."
    } else {
      response =
        "I heard you say: " +
        command +
        ". I can help you with scheduling appointments, learning about our services, getting pricing information, or contacting our team. What would you like to know?"
    }

    speakResponse(response)
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className="w-80 shadow-2xl border-0">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Voice Assistant</h3>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={startListening}
                disabled={isListening || isSpeaking}
                className={`w-16 h-16 rounded-full ${
                  isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>

              <Button
                onClick={
                  isSpeaking
                    ? stopSpeaking
                    : () =>
                        speakResponse(
                          "Hello! I am your voice assistant for Douglas Driveway Services. You can ask me about our services, schedule appointments, or get contact information.",
                        )
                }
                className={`w-16 h-16 rounded-full ${
                  isSpeaking ? "bg-blue-500 hover:bg-blue-600 animate-pulse" : "bg-slate-600 hover:bg-slate-700"
                }`}
              >
                {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            </div>

            <div className="text-sm text-slate-600">
              {isListening && <p className="text-orange-600 font-medium">Listening...</p>}
              {isSpeaking && <p className="text-blue-600 font-medium">Speaking...</p>}
              {!isListening && !isSpeaking && <p>Click the microphone to speak or the speaker to hear a demo</p>}
            </div>

            {transcript && (
              <div className="bg-slate-100 rounded-lg p-3 text-sm">
                <p className="text-slate-700">You said: "{transcript}"</p>
              </div>
            )}

            <div className="text-xs text-slate-500 space-y-1">
              <p>Try saying:</p>
              <ul className="space-y-1">
                <li>"Schedule an appointment"</li>
                <li>"What services do you offer?"</li>
                <li>"How much does it cost?"</li>
                <li>"What's your phone number?"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
