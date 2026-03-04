import { PlayCircle, Shield } from "lucide-react";

const safetyVideos = [
  {
    title: "MSHA Annual Refresher Training",
    description: "Complete MSHA annual refresher training for mine workers",
    videoId: "urhSl6Wb6b4",
    category: "General Safety",
  },
  {
    title: "Underground Mining Safety Basics",
    description: "Essential safety procedures for underground mining operations",
    videoId: "RDOxM5F2oWQ",
    category: "Underground",
  },
  {
    title: "Mining Hazard Awareness",
    description: "Identifying and avoiding common hazards in mining environments",
    videoId: "K9A3WzVno_c",
    category: "Hazards",
  },
  {
    title: "PPE for Mine Workers",
    description: "Proper use and inspection of personal protective equipment",
    videoId: "0T8GrXoSVCE",
    category: "PPE",
  },
  {
    title: "Mine Emergency Preparedness",
    description: "How to prepare for and respond to mine emergencies",
    videoId: "4JFezNSMbiY",
    category: "Emergency",
  },
  {
    title: "Electrical Safety in Mining",
    description: "Electrical hazard prevention and lockout/tagout procedures",
    videoId: "sNOihGaSxnE",
    category: "Electrical",
  },
];

const SafetyVideos = () => {
  return (
    <div className="px-6 pt-6 pb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <PlayCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Safety Videos</h2>
          <p className="text-xs text-muted-foreground">Essential safety training for mine workers</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium">
            Watch these videos regularly to stay updated on safety protocols
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {safetyVideos.map((video) => (
          <div key={video.videoId} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {video.category}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{video.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyVideos;
