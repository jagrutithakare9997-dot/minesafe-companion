import { MessageSquare, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const OfficeMessages = () => {
  const { messages, markMessageRead } = useAppContext();

  return (
    <div className="px-6 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <MessageSquare className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Emergency Messages</h2>
          <p className="text-xs text-muted-foreground">Messages from mine workers</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No emergency messages</p>
          <p className="text-xs text-muted-foreground/60">Worker messages will appear here in real-time</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border p-4 transition-all ${
                msg.read
                  ? "border-border/50 bg-card/50 opacity-70"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${msg.read ? "text-muted-foreground" : "text-destructive"}`} />
                  <span className="text-sm font-bold text-foreground">{msg.from}</span>
                  {!msg.read && (
                    <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <p className="text-sm text-foreground mb-2">{msg.message}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                {msg.location}
              </div>
              {!msg.read && (
                <button
                  onClick={() => markMessageRead(msg.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-accent/30 bg-accent/10 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent/20"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficeMessages;
