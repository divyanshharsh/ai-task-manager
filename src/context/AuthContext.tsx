"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<{ email: string }>(token);
        setUser({ email: decoded.email });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with your actual backend API
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<{ email: string }>(token);
      setUser({ email: decoded.email });
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
