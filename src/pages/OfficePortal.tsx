import { useState, useEffect } from "react";
import { Shield, BarChart3, MessageSquare, ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommandCenter from "@/components/app/CommandCenter";
import OfficeMessages from "@/components/app/OfficeMessages";
import OfficeLogin from "@/pages/OfficeLogin";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

type Screen = "command" | "messages";

const OfficePortal = () => {
  const navigate = useNavigate();
  const { alerts, resolveAlert, unreadCount } = useAppContext();
  const [activeScreen, setActiveScreen] = useState<Screen>("command");
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return <OfficeLogin onLogin={() => {}} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="p-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Shield className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-bold tracking-wide text-foreground">
              MINE<span className="text-accent">GUARD</span>
              <span className="text-xs font-normal text-muted-foreground ml-2">Office</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">Live</span>
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Sign Out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {activeScreen === "command" && (
          <CommandCenter alerts={alerts} onResolve={resolveAlert} />
        )}
        {activeScreen === "messages" && <OfficeMessages />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around">
          <button
            onClick={() => setActiveScreen("command")}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              activeScreen === "command" ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Command</span>
          </button>
          <button
            onClick={() => setActiveScreen("messages")}
            className={`relative flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              activeScreen === "messages" ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
            <span className="text-[10px] font-semibold">Messages</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default OfficePortal;
