"use client";

import { useWebSocket } from "@/context/WebSocketContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const TaskList = () => {
  const { tasks, addTask, deleteTask } = useWebSocket();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        id: crypto.randomUUID(),
        title: newTask,
        completed: false,
      });
      setNewTask("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Your Tasks</h2>

      {/* Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New task..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <span className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
              {task.title}
            </span>
            <button
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
              onClick={() => deleteTask(task.id)}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
