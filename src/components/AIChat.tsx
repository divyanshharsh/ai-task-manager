"use client";
import { useState } from "react";
import { useAIChat } from "@/context/AIChatContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const AIChat = () => {
  const { messages, sendMessage } = useAIChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-96 flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">AI Task Assistant</h2>

      {/* Chat Messages */}
      <div className="h-72 overflow-y-auto border p-4 rounded-lg bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg mb-2 max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-200 self-start"
            }`}
          >
            <strong>{msg.role === "user" ? "You:" : "AI:"}</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Ask AI for task ideas..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
