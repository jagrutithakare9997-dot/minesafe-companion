import { useState } from "react";
import { AlertTriangle, Camera, Send, CheckCircle } from "lucide-react";

interface HazardReportProps {
  onSubmit: (data: { category: string; description: string; severity: string }) => void;
}

const categories = [
  "Unstable Ground",
  "Equipment Malfunction",
  "Gas Leak",
  "Electrical Hazard",
  "Flooding",
  "Roof Fall Risk",
  "Other",
];

const severityLevels = [
  { value: "low", label: "Low", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" },
  { value: "medium", label: "Medium", color: "text-primary border-primary/30 bg-primary/10" },
  { value: "high", label: "High", color: "text-destructive border-destructive/30 bg-destructive/10" },
  { value: "critical", label: "Critical", color: "text-red-500 border-red-500/30 bg-red-500/10" },
];

const HazardReport = ({ onSubmit }: HazardReportProps) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!category || !description || !severity) return;
    onSubmit({ category, description, severity });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCategory("");
      setDescription("");
      setSeverity("");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center px-6 pt-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mb-4">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Report Submitted</h2>
        <p className="text-sm text-muted-foreground text-center">
          The safety team has been notified and will address this hazard immediately.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-6 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <AlertTriangle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Report Hazard</h2>
          <p className="text-xs text-muted-foreground">Alert the safety team instantly</p>
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Hazard Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                category === cat
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Severity */}
      <div className="mb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Severity Level
        </label>
        <div className="grid grid-cols-4 gap-2">
          {severityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setSeverity(level.value)}
              className={`rounded-lg border p-2 text-xs font-semibold transition-all ${
                severity === level.value ? level.color : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the hazard in detail..."
          rows={4}
          className="w-full rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      {/* Photo Button */}
      <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground">
        <Camera className="h-4 w-4" />
        Attach Photo (Optional)
      </button>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!category || !description || !severity}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
          category && description && severity
            ? "bg-primary text-primary-foreground glow-safety hover:opacity-90"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Send className="h-4 w-4" />
        Submit Hazard Report
      </button>
    </div>
  );
};

export default HazardReport;
