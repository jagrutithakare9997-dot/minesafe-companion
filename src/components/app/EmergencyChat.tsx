import { useState } from "react";
import { Send, MessageSquare, MapPin, AlertTriangle, Reply } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const quickMessages = [
  "Need immediate help!",
  "Gas leak detected in my area",
  "Equipment malfunction — need assistance",
  "Injured worker needs medical attention",
  "Route blocked — need alternate path",
  "Running low on oxygen supply",
];

const EmergencyChat = () => {
  const { sendMessage, messages } = useAppContext();
  const [customMessage, setCustomMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    sendMessage({
      from: "Worker #1042",
      message: msg.trim(),
      location: "Shaft B, Level -3, Zone 7",
    });
    setCustomMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const myMessages = messages.filter((m) => m.from === "Worker #1042");

  return (
    <div className="px-6 pt-6 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
          <MessageSquare className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Emergency Message</h2>
          <p className="text-xs text-muted-foreground">Send urgent messages to the office</p>
        </div>
      </div>

      {/* Location badge */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 mb-6">
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <span className="text-xs text-muted-foreground">Your location will be shared:</span>
        <span className="text-xs font-semibold text-foreground">Shaft B, Level -3</span>
      </div>

      {/* Quick messages */}
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
        Quick Messages
      </label>
      <div className="space-y-2 mb-6">
        {quickMessages.map((msg) => (
          <button
            key={msg}
            onClick={() => handleSend(msg)}
            className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground transition-all hover:border-destructive/40 hover:bg-destructive/5"
          >
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            {msg}
          </button>
        ))}
      </div>

      {/* Custom message */}
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
        Custom Message
      </label>
      <div className="flex gap-2 mb-6">
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Type your emergency message..."
          rows={3}
          className="flex-1 rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-destructive focus:outline-none focus:ring-1 focus:ring-destructive resize-none"
        />
        <button
          onClick={() => handleSend(customMessage)}
          disabled={!customMessage.trim()}
          className={`self-end rounded-lg p-3 transition-all ${
            customMessage.trim()
              ? "bg-destructive text-destructive-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {sent && (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center mb-6">
          <p className="text-sm font-semibold text-primary">✅ Message sent to office portal!</p>
        </div>
      )}

      {/* Sent history with replies */}
      {myMessages.length > 0 && (
        <>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
            Sent Messages
          </label>
          <div className="space-y-2">
            {myMessages.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm text-foreground">{m.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {m.timestamp.toLocaleTimeString()} • {m.location}
                </p>
                {/* Show office replies */}
                {m.replies && m.replies.length > 0 && (
                  <div className="mt-2 space-y-1.5 border-t border-border pt-2">
                    {m.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2 rounded-md bg-accent/10 p-2">
                        <Reply className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-semibold text-accent">Office Reply</span>
                          <p className="text-xs text-foreground">{reply.message}</p>
                          <span className="text-[9px] text-muted-foreground">
                            {reply.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyChat;
