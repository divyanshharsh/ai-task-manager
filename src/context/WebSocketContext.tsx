"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextType {
  socket: Socket | null;
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const newSocket = io("https://ai-task-backend.onrender.com"); // Replace with actual backend URL
    setSocket(newSocket);

    newSocket.on("taskList", (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const addTask = (task: Task) => {
    if (socket) {
      socket.emit("newTask", task);
    }
  };

  const deleteTask = (taskId: number) => {
    if (socket) {
      socket.emit("deleteTask", taskId);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, tasks, addTask, deleteTask }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within WebSocketProvider");
  return context;
};
