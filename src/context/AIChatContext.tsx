"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";

interface AIChatContextType {
  messages: { role: "user" | "assistant"; text: string }[];
  sendMessage: (message: string) => Promise<void>;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const AIChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", text: message }]);

    try {
      console.log("Sending message to API:", message);
      const response = await axios.post("/api/ai/chat", { message });
      console.log("AI Response:", response.data);

      setMessages((prev) => [...prev, { role: "assistant", text: response.data.reply }]);
    } catch (error: any) {
      console.error("AI Chat API Error:", error.response?.data || error.message);
      alert(`AI Chat Error: ${error.response?.data?.error || "Unknown error"}`);
    }
  };

  return (
    <AIChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) throw new Error("useAIChat must be used within AIChatProvider");
  return context;
};
