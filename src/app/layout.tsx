import { AuthProvider } from "@/context/AuthContext";
import { WebSocketProvider } from "@/context/WebSocketContext";
import { AIChatProvider } from "@/context/AIChatContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "../app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WebSocketProvider>
            <AIChatProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </AIChatProvider>
          </WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}