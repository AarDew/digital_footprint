"use client";

import { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Cyber Security Assistant. How can I help you analyze a threat today?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: `I have analyzed your query regarding "${userMessage.content}". Based on security patterns, it's recommended to err on the side of caution. Would you like me to scan a specific URL or file regarding this?` }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Security AI Assistant</h1>
          <p className="text-sm text-gray-500">Ask any cybersecurity-related questions</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[80%] ${
              msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-sm'
            }`}>
              <p className="text-sm md:text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 flex-row">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-800">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a security question..."
          className="w-full bg-gray-900 border border-gray-800 pt-4 pb-4 pl-6 pr-16 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white w-12 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
