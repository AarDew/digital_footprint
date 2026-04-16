"use client";

import { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Cyber Security Assistant. How can I help you analyze a threat today?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: data.reply || "Something went wrong." }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: "Something went wrong. Please try again." }
      ]);
    } finally {
      setIsTyping(false);
    }
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
              <div className="text-sm md:text-base leading-relaxed text-gray-200">
                {msg.content.split('\n').map((line, i) => {
                  if (!line.trim()) return <div key={i} className="h-2" />;
                  
                  // Parse headers
                  if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-bold text-indigo-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                  }
                  
                  // Parse bold text
                  const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  });

                  return (
                    <div key={i} className="mb-2 last:mb-0 flex items-start">
                       {line.trim().startsWith('* ') ? <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span> : null}
                       <span>{parts.map((p, x) => typeof p === 'string' && p.startsWith('* ') ? p.substring(2) : p)}</span>
                    </div>
                  );
                })}
              </div>
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
