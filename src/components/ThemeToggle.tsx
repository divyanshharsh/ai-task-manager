"use client";
import { useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-2 rounded-full transition"
    >
      {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
