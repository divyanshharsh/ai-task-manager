"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const newSocket = io("https://ai-task-backend.onrender.com"); // ✅ Use live backend URL
    setSocket(newSocket);

    newSocket.on("taskList", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const addTask = (task) => {
    if (socket) {
      socket.emit("newTask", task);
    }
  };

  const deleteTask = (taskId) => {
    if (socket) {
      socket.emit("deleteTask", taskId);
    }
  };

  return (
    <WebSocketContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within WebSocketProvider");
  return context;
};
