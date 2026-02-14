import { Shield, Building2, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PortalSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="h-10 w-10 text-primary" />
        <h1 className="font-display text-4xl font-bold text-foreground">
          MINE<span className="text-primary">GUARD</span>
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-12 text-center">
        Intelligent Mobile Safety Companion
      </p>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate("/worker")}
          className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow-safety"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <HardHat className="h-7 w-7 text-primary" />
          </div>
          <div className="text-left">
            <h2 className="font-display text-xl font-bold text-foreground">Worker Portal</h2>
            <p className="text-xs text-muted-foreground">SOS, hazards, fall detection & safety videos</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/office")}
          className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:glow-accent"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
            <Building2 className="h-7 w-7 text-accent" />
          </div>
          <div className="text-left">
            <h2 className="font-display text-xl font-bold text-foreground">Office Portal</h2>
            <p className="text-xs text-muted-foreground">Command center, alerts & emergency messages</p>
          </div>
        </button>
      </div>

      <p className="mt-10 text-[10px] text-muted-foreground/60">v1.0 — MineGuard Safety Systems</p>
    </div>
  );
};

export default PortalSelect;
