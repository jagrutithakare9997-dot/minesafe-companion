import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Alert } from "@/pages/Index";
import { toast } from "sonner";

export interface EmergencyMessage {
  id: string;
  from: string;
  message: string;
  location: string;
  timestamp: Date;
  read: boolean;
}

interface AppContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "timestamp">) => Alert;
  resolveAlert: (id: string) => void;
  messages: EmergencyMessage[];
  sendMessage: (msg: Omit<EmergencyMessage, "id" | "timestamp" | "read">) => void;
  markMessageRead: (id: string) => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [messages, setMessages] = useState<EmergencyMessage[]>([]);

  const addAlert = useCallback((alert: Omit<Alert, "id" | "timestamp">) => {
    const newAlert: Alert = {
      ...alert,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
    return newAlert;
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "resolved" as const } : a))
    );
    toast.success("Alert resolved successfully");
  }, []);

  const sendMessage = useCallback(
    (msg: Omit<EmergencyMessage, "id" | "timestamp" | "read">) => {
      const newMsg: EmergencyMessage = {
        ...msg,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        read: false,
      };
      setMessages((prev) => [newMsg, ...prev]);
      toast.success("🚨 Emergency message sent to office!");
    },
    []
  );

  const markMessageRead = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  }, []);

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AppContext.Provider
      value={{ alerts, addAlert, resolveAlert, messages, sendMessage, markMessageRead, unreadCount }}
    >
      {children}
    </AppContext.Provider>
  );
};
