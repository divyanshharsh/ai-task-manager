"use client"; // ✅ Forces this page to run only on the client side

import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import AIChat from "@/components/AIChat";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth(); // ✅ Now it won't crash because it's running on the client

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <header className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Task Dashboard</h1>
            {user && <p className="text-sm text-gray-500">Welcome, {user.email}</p>}
          </div>
        </header>
        <div className="flex gap-6">
          <TaskList />
          <AIChat />
        </div>
      </div>
    </div>
  );
}
