import { useState, useEffect, useCallback } from "react";
import { Shield, AlertTriangle, Radio, MessageSquare, PlayCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SOSScreen from "@/components/app/SOSScreen";
import HazardReport from "@/components/app/HazardReport";
import FallDetection from "@/components/app/FallDetection";
import EmergencyChat from "@/components/app/EmergencyChat";
import SafetyVideos from "@/components/app/SafetyVideos";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";

type Screen = "sos" | "hazard" | "fall" | "chat" | "videos";

const WorkerPortal = () => {
  const navigate = useNavigate();
  const { addAlert } = useAppContext();
  const [activeScreen, setActiveScreen] = useState<Screen>("sos");
  const [fallDetectionEnabled, setFallDetectionEnabled] = useState(false);

  const triggerSOS = useCallback(() => {
    const alert = addAlert({
      type: "sos",
      message: "EMERGENCY SOS ACTIVATED",
      location: "Shaft B, Level -3, Zone 7",
      status: "active",
      worker: "Worker #1042",
    });
    toast.error("🚨 SOS ALERT SENT — Rescue team notified!", {
      duration: 5000,
      description: `Location: ${alert.location}`,
    });
  }, [addAlert]);

  const triggerFallAlert = useCallback(() => {
    const alert = addAlert({
      type: "fall",
      message: "FALL DETECTED — Automatic alert triggered",
      location: "Tunnel C, Section 12",
      status: "active",
      worker: "Worker #1042",
    });
    toast.error("⚠️ FALL DETECTED — Automatic alert sent!", {
      duration: 5000,
      description: `Location: ${alert.location}`,
    });
  }, [addAlert]);

  const submitHazard = useCallback(
    (data: { category: string; description: string; severity: string }) => {
      addAlert({
        type: "hazard",
        message: `Hazard Report: ${data.category} — ${data.description}`,
        location: "Reported from current location",
        status: "active",
        worker: "Worker #1042",
      });
      toast.success("✅ Hazard report submitted to safety team!", {
        duration: 4000,
        description: `Category: ${data.category} | Severity: ${data.severity}`,
      });
    },
    [addAlert]
  );

  useEffect(() => {
    if (!fallDetectionEnabled) return;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (acc) {
        const total = Math.sqrt((acc.x ?? 0) ** 2 + (acc.y ?? 0) ** 2 + (acc.z ?? 0) ** 2);
        if (total > 30) triggerFallAlert();
      }
    };
    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [fallDetectionEnabled, triggerFallAlert]);

  const navItems: { key: Screen; icon: typeof Shield; label: string }[] = [
    { key: "sos", icon: Shield, label: "SOS" },
    { key: "hazard", icon: AlertTriangle, label: "Report" },
    { key: "fall", icon: Radio, label: "Detection" },
    { key: "chat", icon: MessageSquare, label: "Message" },
    { key: "videos", icon: PlayCircle, label: "Safety" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="p-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold tracking-wide text-foreground">
              MINE<span className="text-primary">GUARD</span>
              <span className="text-xs font-normal text-muted-foreground ml-2">Worker</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">Connected</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {activeScreen === "sos" && <SOSScreen onTriggerSOS={triggerSOS} />}
        {activeScreen === "hazard" && <HazardReport onSubmit={submitHazard} />}
        {activeScreen === "fall" && (
          <FallDetection
            enabled={fallDetectionEnabled}
            onToggle={setFallDetectionEnabled}
            onSimulateFall={triggerFallAlert}
          />
        )}
        {activeScreen === "chat" && <EmergencyChat />}
        {activeScreen === "videos" && <SafetyVideos />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveScreen(item.key)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                activeScreen === item.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default WorkerPortal;
