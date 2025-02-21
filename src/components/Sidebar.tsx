import { HomeIcon, ChatBubbleLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col space-y-6">
      <h2 className="text-xl font-bold">AI Task Manager</h2>
      
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <HomeIcon className="w-6 h-6" /> Tasks
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <ChatBubbleLeftIcon className="w-6 h-6" /> AI Chat
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Cog6ToothIcon className="w-6 h-6" /> Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
