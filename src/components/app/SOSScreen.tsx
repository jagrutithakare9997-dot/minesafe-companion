import { useState } from "react";
import { Shield, MapPin, Phone } from "lucide-react";

interface SOSScreenProps {
  onTriggerSOS: () => void;
}

const SOSScreen = ({ onTriggerSOS }: SOSScreenProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const handlePress = () => {
    if (sent) return;
    setIsPressed(true);
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        setCountdown(null);
        setSent(true);
        onTriggerSOS();
        setTimeout(() => {
          setSent(false);
          setIsPressed(false);
        }, 5000);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const currentLocation = "Shaft B, Level -3, Zone 7";

  return (
    <div className="flex flex-col items-center px-6 pt-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">Emergency SOS</h2>
      <p className="text-sm text-muted-foreground mb-8 text-center">
        Press and hold the button to send an emergency alert with your location
      </p>

      {/* SOS Button */}
      <div className="relative mb-10">
        {/* Pulse rings */}
        {isPressed && !sent && (
          <>
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
            <div className="absolute -inset-4 rounded-full bg-destructive/10 animate-ping [animation-delay:0.3s]" />
          </>
        )}
        {sent && (
          <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping" />
        )}
        <button
          onClick={handlePress}
          disabled={sent}
          className={`relative flex h-48 w-48 items-center justify-center rounded-full border-4 transition-all duration-300 ${
            sent
              ? "border-primary bg-primary/20 text-primary"
              : isPressed
              ? "border-destructive bg-destructive/20 text-destructive scale-95"
              : "border-destructive/60 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:border-destructive hover:scale-105 active:scale-95"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-16 w-16" />
            {countdown !== null ? (
              <span className="font-display text-4xl font-bold">{countdown}</span>
            ) : sent ? (
              <span className="font-display text-lg font-bold">ALERT SENT</span>
            ) : (
              <span className="font-display text-2xl font-bold">SOS</span>
            )}
          </div>
        </button>
      </div>

      {/* Location Info */}
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Your Current Location</p>
            <p className="text-sm font-semibold text-foreground">{currentLocation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <Phone className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Emergency Contact</p>
            <p className="text-sm font-semibold text-foreground">Rescue Team Alpha — On Standby</p>
          </div>
        </div>
      </div>

      {sent && (
        <div className="mt-6 w-full max-w-sm rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
          <p className="text-sm font-semibold text-primary">
            ✅ Location shared with rescue team
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Help is on the way. Stay calm and stay where you are.
          </p>
        </div>
      )}
    </div>
  );
};

export default SOSScreen;
