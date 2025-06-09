"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { config } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Simple interface for appointment data
interface AppointmentData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  confirmed?: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isFormatted?: boolean; // Flag to indicate if the message should be rendered with formatting
  appointmentData?: AppointmentData; // Optional appointment data
}

const botResponses = {
  greeting: "Hello! I'm here to help you with your driveway service needs. How can I assist you today?",
  services:
    "We offer driveway installation, repair & maintenance, sealcoating, snow removal, and decorative concrete services. Which service interests you?",
  pricing:
    "We provide free quotes for all our services! The cost depends on the size and condition of your project. Would you like to schedule a free consultation?",
  guarantee:
    "We offer a satisfaction guarantee on all our services. If you're not completely satisfied, we'll make it right at no additional cost.",
  location:
    "We're based in Regina, Saskatchewan and serve the surrounding areas. We've been proudly serving the community for over 10 years.",
  contact:
    "You can reach us at (555) 123-4567 or email info@douglasdrivewayservices.ca. We're available Monday-Friday 7AM-6PM and Saturday 8AM-4PM.",
  booking:
    "I'd be happy to help you book an appointment! You can use our online scheduler or call us directly at (555) 123-4567 for immediate assistance.",
  default:
    "I'd be happy to help! For specific questions about your project, please call us at (555) 123-4567 or request a free quote through our contact form.",
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to poll for the actual response from n8n
  const pollForActualResponse = async (typingId: string, userId: string) => {
    console.log("[WEBHOOK] Starting polling for actual response");
    
    // Maximum number of polling attempts
    const maxAttempts = 10;
    // Delay between polling attempts (in milliseconds)
    const pollDelay = 1000;
    
    // Poll for the actual response
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      console.log(`[WEBHOOK] Polling attempt ${attempt + 1} of ${maxAttempts}`);
      
      try {
        // Wait for the specified delay
        await new Promise(resolve => setTimeout(resolve, pollDelay));
        
        // Make a request to check for the actual response
        // Using 'no-cors' mode to avoid CORS issues, but this means we can't read the response content directly
        const response = await fetch(config.webhook.testUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors" // Add no-cors mode to bypass CORS restrictions
        });
        
        // When using no-cors mode, we can't actually read the response content
        // Instead, we'll make a separate request to a proxy endpoint or use a different approach
        
        // Since we can't directly read the response with no-cors mode, we'll use a fallback approach
        // In a production environment, you would implement a server-side proxy or use webhooks
        // For now, we'll use a simulated response based on the user's message
        
        // Get the last user message to generate a contextual response
        const lastUserMessage = messages
          .filter(msg => msg.sender === "user")
          .pop();
          
        let botResponseText = "Thank you for your message! I'll have someone from our team get back to you shortly.";
        
        // Generate a more contextual response based on the last user message
        if (lastUserMessage) {
          const userMessageLower = lastUserMessage.text.toLowerCase();
          
          if (userMessageLower.includes("service") || userMessageLower.includes("what do you offer") || userMessageLower.includes("what do you provide")) {
            botResponseText = botResponses.services;
          } else if (userMessageLower.includes("price") || userMessageLower.includes("cost") || userMessageLower.includes("quote")) {
            botResponseText = botResponses.pricing;
          } else if (userMessageLower.includes("guarantee") || userMessageLower.includes("warranty")) {
            botResponseText = botResponses.guarantee;
          } else if (userMessageLower.includes("location") || userMessageLower.includes("where") || userMessageLower.includes("regina")) {
            botResponseText = botResponses.location;
          } else if (userMessageLower.includes("contact") || userMessageLower.includes("phone") || userMessageLower.includes("email")) {
            botResponseText = botResponses.contact;
          } else if (userMessageLower.includes("book") || userMessageLower.includes("appointment") || userMessageLower.includes("schedule")) {
            botResponseText = botResponses.booking;
          } else if (userMessageLower.includes("hello") || userMessageLower.includes("hi") || userMessageLower.includes("hey")) {
            botResponseText = botResponses.greeting;
          }
        }
        
        // Create the bot message
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          sender: "bot",
          timestamp: new Date(),
        };
        
        // Remove the typing indicator and add the bot message
        setMessages((prev) => {
          // Remove typing indicator
          const withoutTyping = prev.filter((msg) => msg.id !== typingId);
          // Add the bot message
          return [...withoutTyping, botMessage];
        });
        
        console.log("[WEBHOOK] Added fallback response due to CORS limitations");
        return;
      } catch (error) {
        console.error("[WEBHOOK] Error during polling:", error);
      }
    }
    
    // If we've reached the maximum number of attempts without finding a response,
    // use a default response
    console.log("[WEBHOOK] Maximum polling attempts reached without finding a response");
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Thank you for your message! We specialize in driveway installation, repair, and maintenance services. Would you like to know more about any specific service?",
      sender: "bot",
      timestamp: new Date(),
    };
    
    // Remove the typing indicator and add the default bot message
    setMessages((prev) => {
      // Remove typing indicator
      const withoutTyping = prev.filter((msg) => msg.id !== typingId);
      // Add the bot message
      return [...withoutTyping, botMessage];
    });
    
    console.log("[WEBHOOK] Added default response after polling");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending messages with timeout
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    
    // Log that we're starting the webhook process
    console.log("[WEBHOOK] Starting webhook request process for message:", currentInput);

    try {
      console.log("[WEBHOOK] Starting webhook request process");
      
      // Add a temporary "typing" indicator
      const typingId = "typing-" + Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: typingId,
          text: "...",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      console.log("[WEBHOOK] Added typing indicator");

      // Prepare request payload with chat history
      const userId = "web-visitor-" + Date.now();
      
      // Format chat history for context
      const chatHistory = messages.map(msg => ({
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp.toISOString()
      }));
      
      // Check if this is an appointment confirmation
      const isAppointmentConfirmation = 
        currentInput.toLowerCase().includes("yes") || 
        currentInput.toLowerCase().includes("confirm") || 
        currentInput.toLowerCase().includes("correct") ||
        currentInput.toLowerCase() === "y" ||
        currentInput.toLowerCase() === "confirm" ||
        currentInput.toLowerCase() === "confirmed" ||
        currentInput.toLowerCase() === "ok" ||
        currentInput.toLowerCase() === "okay" ||
        currentInput.toLowerCase() === "sure" ||
        currentInput.toLowerCase() === "sounds good";
      
      console.log("[APPOINTMENT] Is confirmation:", isAppointmentConfirmation, "Message:", currentInput);
      
      // Check if this is an appointment request
      const isAppointmentRequest = 
        currentInput.toLowerCase().includes("appointment") || 
        currentInput.toLowerCase().includes("schedule") || 
        currentInput.toLowerCase().includes("book") ||
        currentInput.toLowerCase().includes("set up");
      
      // Try to extract appointment data from the current message
      // This handles cases where the user provides all details in one message
      let appointmentData: AppointmentData | undefined;
      
      // Check if the current message contains appointment details
      if (currentInput.includes(",")) {
        console.log("[APPOINTMENT] Detected comma-separated values in message, attempting to extract appointment data");
        
        // Split by commas and extract details
        const parts = currentInput.split(",").map(part => part.trim());
        
        if (parts.length >= 3) {
          // Assume format: NAME, PHONE, EMAIL, DATE/TIME
          const name = parts[0];
          const phone = parts[1];
          const email = parts[2];
          
          // Try to extract date and time from the remaining parts
          let date = "Tomorrow";
          let time = "Not specified";
          
          // Join remaining parts and look for date/time
          const remainingText = parts.slice(3).join(" ").toLowerCase();
          
          if (remainingText.includes("tomorrow")) {
            date = "Tomorrow";
            
            // Try to extract time
            const timeMatch = remainingText.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
            if (timeMatch) {
              time = timeMatch[1];
            }
          }
          
          appointmentData = {
            name,
            phone,
            email,
            date,
            time,
            confirmed: isAppointmentConfirmation
          };
          
          console.log("[APPOINTMENT] Extracted appointment data from current message:", appointmentData);
        }
      }
      
      // If we couldn't extract from current message, try previous messages
      if (!appointmentData) {
        console.log("[APPOINTMENT] Attempting to extract appointment data from previous messages");
        
        // Look for a message that might contain appointment details
        const appointmentDetailMessage = messages
          .filter(msg => msg.sender === "bot")
          .find(msg => {
            const text = msg.text.toLowerCase();
            return text.includes("name:") && 
                  (text.includes("contact") || text.includes("phone")) && 
                  text.includes("email:") && 
                  text.includes("date:");
          });
        
        if (appointmentDetailMessage) {
          // Extract appointment details from the message
          const text = appointmentDetailMessage.text;
          
          // Simple extraction using regex
          const nameMatch = text.match(/name:\s*([^,\n]+)/i);
          const phoneMatch = text.match(/(?:contact|phone)(?:\s*number)?:\s*([^,\n]+)/i);
          const emailMatch = text.match(/email:\s*([^,\n]+)/i);
          const dateMatch = text.match(/date:\s*([^,\n]+)/i);
          const timeMatch = text.match(/time:\s*([^,\n]+)/i);
          
          if (nameMatch && phoneMatch && emailMatch && dateMatch) {
            appointmentData = {
              name: nameMatch[1].trim(),
              phone: phoneMatch[1].trim(),
              email: emailMatch[1].trim(),
              date: dateMatch[1].trim(),
              time: timeMatch ? timeMatch[1].trim() : "Not specified",
              confirmed: isAppointmentConfirmation
            };
            
            console.log("[APPOINTMENT] Extracted appointment data from previous message:", appointmentData);
          }
        }
      }
      
      // If we still don't have appointment data but this is an appointment request,
      // try to extract information directly from the current message
      if (!appointmentData && isAppointmentRequest) {
        // Look for patterns like "NAME, PHONE, EMAIL, DATE"
        const parts = currentInput.split(/[,\n]/).map(part => part.trim());
        
        if (parts.length >= 3) {
          // Try to identify which part is which
          let name = "";
          let phone = "";
          let email = "";
          let date = "Tomorrow";
          let time = "Not specified";
          
          // Look for email pattern
          for (const part of parts) {
            if (part.includes("@") && part.includes(".")) {
              email = part;
              break;
            }
          }
          
          // Look for phone pattern (numbers with optional dashes/spaces)
          for (const part of parts) {
            if (/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/.test(part.replace(/\D/g, ''))) {
              phone = part;
              break;
            }
          }
          
          // First part is likely the name if not identified as something else
          if (!name && parts[0] && !parts[0].includes("@") && !/^\d+$/.test(parts[0])) {
            name = parts[0];
          }
          
          // Look for date/time information
          const fullText = currentInput.toLowerCase();
          if (fullText.includes("tomorrow")) {
            date = "Tomorrow";
            
            // Try to extract time
            const timeMatch = fullText.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
            if (timeMatch) {
              time = timeMatch[1];
            }
          }
          
          if (name && (phone || email)) {
            appointmentData = {
              name,
              phone: phone || "Not provided",
              email: email || "Not provided",
              date,
              time,
              confirmed: false
            };
            
            console.log("[APPOINTMENT] Extracted partial appointment data from request:", appointmentData);
          }
        }
      }
      
      // Define the payload type to include appointment data
      interface WebhookPayload {
        message: string;
        timestamp: string;
        userId: string;
        chatHistory: {
          text: string;
          sender: "bot" | "user";
          timestamp: string;
        }[];
        source: string;
        page: string;
        website: {
          name: string;
          domain: string;
        };
        appointment?: {
          isRequest: boolean;
          isConfirmation: boolean;
          data?: AppointmentData;
        };
      }
      
      // Format the payload to make appointment data more accessible to the AI Agent
      const payload: WebhookPayload = {
        message: currentInput,
        timestamp: new Date().toISOString(),
        userId: userId,
        // Include the full chat history for context
        chatHistory: chatHistory,
        // Add any additional context that might be useful for the n8n workflow
        source: "website-chat",
        page: window.location.pathname,
        // Include website information from config
        website: {
          name: config.website.name,
          domain: config.website.domain
        }
      };
      
      // If this is an appointment confirmation and we have appointment data,
      // add a special message to help the AI Agent understand
      if (isAppointmentConfirmation && appointmentData) {
        // Ensure email is properly formatted
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(appointmentData.email);
        const formattedEmail = isValidEmail ? appointmentData.email.trim().toLowerCase() : "";
        
        console.log("[APPOINTMENT] Email validation:", isValidEmail ? "Valid email format" : "Invalid email format");
        
        // Format the message in a way that exactly matches what the AI Agent is expecting
        payload.message = `YES I CONFIRM THE APPOINTMENT. 

NAME: ${appointmentData.name}
PHONE: ${appointmentData.phone}
EMAIL: ${formattedEmail}
DATE: ${appointmentData.date}
TIME: ${appointmentData.time}

PLEASE USE THE GOOGLE CALENDAR TOOL TO CREATE THIS APPOINTMENT NOW. 
SET THE TITLE TO "Douglas Driveway Services Appointment - ${appointmentData.name}" 
SET THE DESCRIPTION TO "Customer appointment for driveway services. Contact: ${appointmentData.phone}, Email: ${formattedEmail}"
${isValidEmail ? `ADD THE ATTENDEE: ${formattedEmail}` : '// Skip adding attendee due to invalid email format'}

The user has confirmed with "${currentInput}". Please create this appointment immediately.`;
        
        console.log("[APPOINTMENT] Added simplified confirmation format for AI Agent");
      }
      // If this is an appointment request with data, add the data to the message
      else if (isAppointmentRequest && appointmentData) {
        // Ensure email is properly formatted
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(appointmentData.email);
        const formattedEmail = isValidEmail ? appointmentData.email.trim().toLowerCase() : "";
        
        console.log("[APPOINTMENT] Email validation for request:", isValidEmail ? "Valid email format" : "Invalid email format");
        
        // Format the message in a simpler way that matches what the AI Agent expects
        payload.message = `I WANT TO SCHEDULE AN APPOINTMENT.

NAME: ${appointmentData.name}
PHONE: ${appointmentData.phone}
EMAIL: ${formattedEmail}
DATE: ${appointmentData.date}
TIME: ${appointmentData.time}

Please confirm these details and then create the appointment.`;
        
        console.log("[APPOINTMENT] Added simplified appointment request format");
      }
      
      // Still include the appointment data in the structured format
      if (appointmentData) {
        // Normalize all string data to lowercase to reduce errors
        const normalizedAppointmentData = {
          name: appointmentData.name.toLowerCase(),
          phone: appointmentData.phone,
          email: appointmentData.email.toLowerCase().trim(),
          date: appointmentData.date.toLowerCase(),
          time: appointmentData.time.toLowerCase(),
          confirmed: appointmentData.confirmed
        };
        
        payload.appointment = {
          isRequest: isAppointmentRequest,
          isConfirmation: isAppointmentConfirmation,
          data: normalizedAppointmentData
        };
        console.log("[APPOINTMENT] Including normalized appointment data in payload:", normalizedAppointmentData);
      } else {
        payload.appointment = {
          isRequest: isAppointmentRequest,
          isConfirmation: isAppointmentConfirmation
        };
      }
      console.log("[WEBHOOK] Request payload:", payload);

      // Send message to webhook and wait for response with timeout
      console.log("[WEBHOOK] Sending request to n8n webhook...");
      const webhookUrl = config.webhook.url;
      console.log("[WEBHOOK] URL:", webhookUrl);
      
      // Create an AbortController for the timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.log("[WEBHOOK] Request timed out after 60 seconds");
      }, 60000); // 60 second timeout
      
      const startTime = Date.now();
      console.log("[WEBHOOK] Waiting for response from n8n workflow...");
      
      try {
        const response = await fetch(
          webhookUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          }
        );
        
        // Clear the timeout since we got a response
        clearTimeout(timeoutId);
        
        const endTime = Date.now();
        console.log(`[WEBHOOK] Response received in ${endTime - startTime}ms`);
        console.log("[WEBHOOK] Response status:", response.status);

        // DO NOT remove the typing indicator yet - keep it until we have processed the response
        console.log("[WEBHOOK] Keeping typing indicator until response is processed");

        if (response.ok) {
          let data;
          try {
            // First get the raw text response
            const textResponse = await response.text();
            console.log("[WEBHOOK] Raw response text:", textResponse);
            
            // Check if the response is empty
            if (!textResponse || textResponse.trim() === '') {
              console.log("[WEBHOOK] Empty response received");
              data = { message: "I received your message, but I'm not sure how to respond." };
            } else {
              // Try to parse as JSON
              try {
                data = JSON.parse(textResponse);
                console.log("[WEBHOOK] Parsed JSON response:", data);
              } catch (jsonError) {
                console.error("[WEBHOOK] Failed to parse JSON:", jsonError);
                // If it's not valid JSON, use the text as the message
                data = { message: textResponse };
                console.log("[WEBHOOK] Using raw text as message");
              }
            }
          } catch (responseError) {
            console.error("[WEBHOOK] Error reading response:", responseError);
            data = { message: "There was an error processing the response." };
          }

          // Extract the response message from various possible formats
          let botResponseText = "I'm sorry, I couldn't process your request.";
          
          if (data) {
            console.log("[WEBHOOK] Processing response data type:", typeof data);
            
            // First check for array responses with output field (highest priority)
            if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'output' in data[0]) {
              console.log("[WEBHOOK] Found array with output field");
              botResponseText = data[0].output;
              
              // Log error if present but still use the output
              if ('error' in data[0]) {
                console.warn("[WEBHOOK] N8n returned an error but also provided output:", data[0].error);
              }
              
              // Since we already have the response, we don't need to poll
              console.log("[WEBHOOK] Using direct response from n8n, skipping polling");
            }
            // Check for the specific n8n response format: { "response":"{{ $json.output }}" }
            else if (typeof data === 'object' && data !== null && 'response' in data) {
              console.log("[WEBHOOK] Found response field in data");
              botResponseText = data.response;
            }
            // Handle other array response formats
            else if (Array.isArray(data) && data.length > 0) {
              // We have an array response from n8n
              const n8nData = data[0];
              
              // Check for the new format with output field
              if (typeof n8nData === 'object' && n8nData !== null) {
                if ('output' in n8nData) {
                  console.log("[WEBHOOK] Detected n8n output format");
                  botResponseText = n8nData.output;
                  
                  // Check if there's an error but we still have output
                  if ('error' in n8nData) {
                    console.warn("[WEBHOOK] N8n returned an error but also provided output:", n8nData.error);
                  }
                }
                // Check for the old format (request details)
                else if ('body' in n8nData && 'headers' in n8nData && 'webhookUrl' in n8nData) {
                  console.log("[WEBHOOK] Detected n8n request details format");
                  
                  // Check if there's a responseMessage field that n8n might have added
                  if ('responseMessage' in n8nData) {
                    botResponseText = n8nData.responseMessage;
                    console.log("[WEBHOOK] Using responseMessage from n8n:", botResponseText);
                  } else {
                    // Check if we have other data in the response array that might contain the output
                    const outputItem = data.find(item => item && typeof item === 'object' && 'output' in item);
                    if (outputItem && outputItem.output) {
                      botResponseText = outputItem.output;
                      console.log("[WEBHOOK] Found output in another item in the response array:", botResponseText);
                    } else {
                      // When we get the request details and no output, use a fallback response
                      console.log("[WEBHOOK] No response found in n8n data, using fallback response");
                      
                      // Get the last user message to generate a contextual response
                      const lastUserMessage = messages
                        .filter(msg => msg.sender === "user")
                        .pop();
                        
                      // Default fallback response
                      botResponseText = botResponses.default;
                      
                      if (lastUserMessage) {
                        const userMessageLower = lastUserMessage.text.toLowerCase();
                        
                        if (userMessageLower.includes("service") || userMessageLower.includes("what do you offer") || userMessageLower.includes("what do you provide")) {
                          botResponseText = botResponses.services;
                        } else if (userMessageLower.includes("price") || userMessageLower.includes("cost") || userMessageLower.includes("quote")) {
                          botResponseText = botResponses.pricing;
                        } else if (userMessageLower.includes("guarantee") || userMessageLower.includes("warranty")) {
                          botResponseText = botResponses.guarantee;
                        } else if (userMessageLower.includes("location") || userMessageLower.includes("where") || userMessageLower.includes("regina")) {
                          botResponseText = botResponses.location;
                        } else if (userMessageLower.includes("contact") || userMessageLower.includes("phone") || userMessageLower.includes("email")) {
                          botResponseText = botResponses.contact;
                        } else if (userMessageLower.includes("book") || userMessageLower.includes("appointment") || userMessageLower.includes("schedule")) {
                          botResponseText = botResponses.booking;
                        } else if (userMessageLower.includes("hello") || userMessageLower.includes("hi") || userMessageLower.includes("hey")) {
                          botResponseText = botResponses.greeting;
                        }
                      }
                      
                      console.log("[WEBHOOK] Using fallback response:", botResponseText);
                    }
                  }
                }
              }
            } else if (typeof data === 'object' && data !== null) {
              // Standard response format handling for object responses
              if ('output' in data) {
                botResponseText = data.output;
              } else if ('message' in data) {
                botResponseText = data.message;
              } else if ('text' in data) {
                botResponseText = data.text;
              } else if ('content' in data) {
                botResponseText = data.content;
              } else if ('answer' in data) {
                botResponseText = data.answer;
              } else if ('result' in data) {
                const result = data.result;
                botResponseText = typeof result === 'string' ? result : JSON.stringify(result);
              }
            } else if (typeof data === 'string') {
              botResponseText = data;
            }
          }
          
          console.log("[WEBHOOK] Final bot response text:", botResponseText);

          // Check if the response contains formatting indicators like numbered lists, bullet points, etc.
          const containsFormatting = 
            botResponseText.includes("1.") || 
            botResponseText.includes("*") || 
            botResponseText.includes("-") || 
            botResponseText.includes("#") ||
            botResponseText.includes("\n");

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponseText,
            sender: "bot",
            timestamp: new Date(),
            isFormatted: containsFormatting, // Set the formatting flag based on content analysis
          };
          // First remove the typing indicator, then add the bot message
          setMessages((prev) => {
            // Remove typing indicator
            const withoutTyping = prev.filter((msg) => msg.id !== typingId);
            // Add the bot message
            return [...withoutTyping, botMessage];
          });
          console.log("[WEBHOOK] Removed typing indicator and added bot response message to chat");
        } else {
          console.error("[WEBHOOK] Error response:", response.status, response.statusText);
          try {
            const errorText = await response.text();
            console.error("[WEBHOOK] Error details:", errorText);
          } catch (e) {
            console.error("[WEBHOOK] Could not read error details");
          }
          
          // Error handling for failed webhook
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "I'm having trouble connecting to our services. Please try again later or contact us directly at (555) 123-4567.",
            sender: "bot",
            timestamp: new Date(),
          };
          // First remove the typing indicator, then add the error message
          setMessages((prev) => {
            // Remove typing indicator
            const withoutTyping = prev.filter((msg) => msg.id !== typingId);
            // Add the error message
            return [...withoutTyping, botMessage];
          });
          console.log("[WEBHOOK] Removed typing indicator and added error message to chat");
        }
      } catch (error) {
        // Clear the timeout
        clearTimeout(timeoutId);
        
        // Type guard to check if it's an AbortError
        if (error instanceof Error && error.name === 'AbortError') {
          console.error("[WEBHOOK] Request timed out");
          // Handle timeout specifically
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "It's taking longer than expected to get a response. Please try again or contact us directly at (555) 123-4567.",
            sender: "bot",
            timestamp: new Date(),
          };
          // First remove the typing indicator, then add the timeout message
          setMessages((prev) => {
            // Remove typing indicator
            const withoutTyping = prev.filter((msg) => msg.id !== typingId);
            // Add the timeout message
            return [...withoutTyping, botMessage];
          });
          console.log("[WEBHOOK] Removed typing indicator and added timeout message to chat");
        } else {
          // Handle other fetch errors
          console.error("[WEBHOOK] Fetch error:", error);
          
          // Error handling for fetch error
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "I'm having trouble connecting to our services. Please try again later or contact us directly at (555) 123-4567.",
            sender: "bot",
            timestamp: new Date(),
          };
          
          // Remove all typing indicators and add the exception message
          setMessages((prev) => {
            // Remove any typing indicators
            const withoutTyping = prev.filter((msg) => !msg.id.includes("typing-"));
            // Add the exception message
            return [...withoutTyping, botMessage];
          });
          console.log("[WEBHOOK] Removed typing indicators and added fetch error message to chat");
        }
      }
    } catch (error) {
      console.error("[WEBHOOK] Exception occurred:", error);
      
      // Error handling for exception
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to our services. Please try again later or contact us directly at (555) 123-4567.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      // Remove all typing indicators and add the exception message
      setMessages((prev) => {
        // Remove any typing indicators
        const withoutTyping = prev.filter((msg) => !msg.id.includes("typing-"));
        // Add the exception message
        return [...withoutTyping, botMessage];
      });
      console.log("[WEBHOOK] Removed typing indicators and added exception error message to chat");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-96 h-[500px] shadow-2xl border-0">
          <CardHeader className="bg-orange-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Douglas Driveway Assistant</span>
            </CardTitle>
            <p className="text-sm text-gray-200">Ask me about our services!</p>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[400px]">
            {/* Custom styles for markdown content */}
            <style jsx global>{`
              .markdown-content {
                width: 100%;
              }
              .markdown-content p:last-child {
                margin-bottom: 0;
              }
              .markdown-content ol, .markdown-content ul {
                margin-left: 0.5rem;
              }
              .markdown-content a {
                color: #f97316;
                text-decoration: underline;
              }
              .markdown-content a:hover {
                color: #ea580c;
              }
              .markdown-content strong {
                font-weight: 600;
              }
              .markdown-content blockquote {
                border-left: 2px solid #f97316;
                padding-left: 0.5rem;
                font-style: italic;
                margin: 0.5rem 0;
              }
            `}</style>
            {/* Custom styles for appointment confirmation */}
            <style jsx global>{`
              .appointment-confirmation {
                background-color: #fff7ed;
                border: 1px solid #f97316;
                border-left: 4px solid #f97316;
              }
              .appointment-confirmation-header {
                font-weight: 600;
                color: #f97316;
                margin-bottom: 8px;
              }
              .appointment-detail {
                display: flex;
                margin-bottom: 4px;
              }
              .appointment-label {
                font-weight: 500;
                width: 80px;
                flex-shrink: 0;
              }
              .appointment-value {
                flex-grow: 1;
              }
              .appointment-confirmed {
                background-color: #fff7ed;
                color: #f97316;
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 4px;
                display: inline-block;
                margin-top: 8px;
              }
            `}</style>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                // Check if this is an appointment confirmation message
                const isAppointmentConfirmation = 
                  message.sender === "bot" && 
                  message.text.toLowerCase().includes("appointment") &&
                  message.text.toLowerCase().includes("confirm") &&
                  (message.text.toLowerCase().includes("name:") || 
                   message.text.toLowerCase().includes("date:"));
                
                return (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" 
                          ? "bg-orange-500 text-white" 
                          : isAppointmentConfirmation 
                            ? "appointment-confirmation" 
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 mt-1 text-orange-500" />}
                        
                        {isAppointmentConfirmation ? (
                          <div className="text-sm w-full">
                            <div className="appointment-confirmation-header">Appointment Details</div>
                            {message.text.split('\n').map((line, index) => {
                              // Extract appointment details
                              if (line.toLowerCase().includes("name:")) {
                                const value = line.split(':')[1]?.trim() || '';
                                return (
                                  <div key={`name-${index}`} className="appointment-detail">
                                    <div className="appointment-label">Name:</div>
                                    <div className="appointment-value">{value}</div>
                                  </div>
                                );
                              } else if (line.toLowerCase().includes("phone:") || line.toLowerCase().includes("contact:")) {
                                const value = line.split(':')[1]?.trim() || '';
                                return (
                                  <div key={`phone-${index}`} className="appointment-detail">
                                    <div className="appointment-label">Phone:</div>
                                    <div className="appointment-value">{value}</div>
                                  </div>
                                );
                              } else if (line.toLowerCase().includes("email:")) {
                                const value = line.split(':')[1]?.trim() || '';
                                return (
                                  <div key={`email-${index}`} className="appointment-detail">
                                    <div className="appointment-label">Email:</div>
                                    <div className="appointment-value">{value}</div>
                                  </div>
                                );
                              } else if (line.toLowerCase().includes("date:")) {
                                const value = line.split(':')[1]?.trim() || '';
                                return (
                                  <div key={`date-${index}`} className="appointment-detail">
                                    <div className="appointment-label">Date:</div>
                                    <div className="appointment-value">{value}</div>
                                  </div>
                                );
                              } else if (line.toLowerCase().includes("time:")) {
                                const value = line.split(':')[1]?.trim() || '';
                                return (
                                  <div key={`time-${index}`} className="appointment-detail">
                                    <div className="appointment-label">Time:</div>
                                    <div className="appointment-value">{value}</div>
                                  </div>
                                );
                              } else if (line.trim() !== '') {
                                return <p key={`text-${index}`} className="mb-2 text-sm">{line}</p>;
                              }
                              return null;
                            })}
                            <div className="appointment-confirmed">
                              {message.text.toLowerCase().includes("please respond with") || message.text.toLowerCase().includes("please confirm") 
                                ? "Pending Confirmation" 
                                : "Appointment Confirmed"}
                            </div>
                          </div>
                        ) : message.isFormatted ? (
                          <div className="text-sm markdown-content">
                            <ReactMarkdown
                              components={{
                                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-md font-bold mb-2" {...props} />,
                                h3: ({node, ...props}) => <h3 className="font-bold mb-1" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                a: ({node, ...props}) => <a className="text-blue-600 underline" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                em: ({node, ...props}) => <em className="italic" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-gray-300 pl-2 italic" {...props} />,
                                code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded" {...props} />,
                                pre: ({node, ...props}) => <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto" {...props} />,
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.text}</p>
                        )}
                        
                        {message.sender === "user" && <User className="h-4 w-4 mt-1" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
