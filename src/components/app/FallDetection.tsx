import { Radio, Smartphone, Activity, AlertTriangle } from "lucide-react";

interface FallDetectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onSimulateFall: () => void;
}

const FallDetection = ({ enabled, onToggle, onSimulateFall }: FallDetectionProps) => {
  return (
    <div className="px-6 pt-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <Radio className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Fall Detection</h2>
          <p className="text-xs text-muted-foreground">Automatic emergency alerts on impact</p>
        </div>
      </div>

      {/* Toggle Card */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Auto-Detection</h3>
            <p className="text-xs text-muted-foreground">Uses phone accelerometer sensors</p>
          </div>
          <button
            onClick={() => onToggle(!enabled)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              enabled ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground transition-transform ${
                enabled ? "translate-x-5.5 left-auto right-0.5" : "left-0.5"
              }`}
              style={{ transform: enabled ? "translateX(0)" : "translateX(0)", left: enabled ? "auto" : "2px", right: enabled ? "2px" : "auto" }}
            />
          </button>
        </div>
        <div className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
          enabled
            ? "bg-primary/10 text-primary border border-primary/20"
            : "bg-muted text-muted-foreground border border-border"
        }`}>
          <Activity className="h-4 w-4" />
          {enabled ? "Monitoring active — sensors engaged" : "Detection paused — enable to monitor"}
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-4">How It Works</h3>
        <div className="space-y-4">
          {[
            { icon: Smartphone, title: "Sensor Monitoring", desc: "Phone accelerometer detects sudden impact and free-fall patterns" },
            { icon: AlertTriangle, title: "Impact Analysis", desc: "AI analyzes motion data to distinguish falls from normal activity" },
            { icon: Radio, title: "Auto Alert", desc: "If no response within 30 seconds, emergency alert is sent automatically" },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Button */}
      <button
        onClick={onSimulateFall}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 py-3 text-sm font-semibold text-destructive transition-all hover:bg-destructive/20"
      >
        <AlertTriangle className="h-4 w-4" />
        Simulate Fall Detection
      </button>
      <p className="text-[10px] text-muted-foreground text-center mt-2">
        For testing purposes — triggers a simulated fall alert
      </p>
    </div>
  );
};

export default FallDetection;
