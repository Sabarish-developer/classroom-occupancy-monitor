import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import axios from 'axios';
import { config } from "@/config/config";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  // Add user message immediately
  const userMessage = { id: messages.length + 1, text: inputText, sender: "user" };
  setMessages([...messages, userMessage]);
  setInputText("");

  try {
    setIsTyping(true);

    const response = await axios.post(
      `${config.genaiServiceUrl}/prompt`, // <-- replace with your backend URL
      { prompt: inputText },
      { withCredentials: true } // <-- important for cookies
    );

    const botMessage = {
      id: messages.length + 2,
      text: response.data.response, // adjust according to your backend response
      sender: "bot",
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error("Error sending message:", error);
    const errorMessage = {
      id: messages.length + 2,
      text: "Sorry, something went wrong.",
      sender: "bot",
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

  const simulateBotResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = { id: messages.length + 2, text: "I understand your message. How else can I help you?", sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b">
        <h1 className="text-xl font-bold">AI Chat</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 min-w-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`p-3 sm:p-4 rounded-lg shadow max-w-[90%] md:max-w-[70%] ${m.sender === "user" ? "bg-[#017a1e] text-white" : "bg-gray-100 text-gray-900"}`}>
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Thinking... 
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 sm:p-4 border-t">
        <div className="flex gap-2 sm:gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 sm:p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#017a1e] min-w-0"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 sm:p-4 bg-[#017a1e] text-white rounded-lg hover:bg-[#017a1e] focus:outline-none focus:ring-2 focus:ring-[#017a1e]"
          >
            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
