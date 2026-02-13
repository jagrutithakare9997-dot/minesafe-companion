import { Shield, AlertTriangle, Radio, CheckCircle, Clock, MapPin } from "lucide-react";
import type { Alert } from "@/pages/Index";

interface CommandCenterProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
}

const typeConfig = {
  sos: { icon: Shield, label: "SOS", color: "text-destructive bg-destructive/10 border-destructive/30" },
  hazard: { icon: AlertTriangle, label: "Hazard", color: "text-primary bg-primary/10 border-primary/30" },
  fall: { icon: Radio, label: "Fall", color: "text-accent bg-accent/10 border-accent/30" },
};

const CommandCenter = ({ alerts, onResolve }: CommandCenterProps) => {
  const activeAlerts = alerts.filter((a) => a.status === "active");
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved");

  return (
    <div className="px-6 pt-6">
      <h2 className="font-display text-xl font-bold text-foreground mb-2">Command Center</h2>
      <p className="text-xs text-muted-foreground mb-6">Live overview of all safety alerts</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center">
          <p className="font-display text-2xl font-bold text-destructive">{activeAlerts.length}</p>
          <p className="text-[10px] text-muted-foreground">Active</p>
        </div>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
          <p className="font-display text-2xl font-bold text-primary">{resolvedAlerts.length}</p>
          <p className="text-[10px] text-muted-foreground">Resolved</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <p className="font-display text-2xl font-bold text-foreground">{alerts.length}</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckCircle className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No alerts yet</p>
          <p className="text-xs text-muted-foreground/60">Alerts from SOS, hazard reports, and fall detection will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = typeConfig[alert.type];
            const Icon = config.icon;
            return (
              <div
                key={alert.id}
                className={`rounded-lg border p-4 transition-all ${
                  alert.status === "active" ? "border-border bg-card" : "border-border/50 bg-card/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-md border ${config.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                    {alert.status === "active" && (
                      <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{alert.message}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {alert.location}
                  {alert.worker && <span className="ml-2">• {alert.worker}</span>}
                </div>
                {alert.status === "active" && (
                  <button
                    onClick={() => onResolve(alert.id)}
                    className="w-full rounded-md border border-primary/30 bg-primary/10 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommandCenter;
