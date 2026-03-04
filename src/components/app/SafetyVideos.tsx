import { PlayCircle, Shield } from "lucide-react";

const safetyVideos = [
  {
    title: "MSHA Annual Refresher Training Playlist",
    description: "Official refresher modules for active mine workers",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLeLyvcaRYC3E2wi1A4cwIKHxpnFQL3FUr",
    category: "MSHA",
  },
  {
    title: "Mine Safety Training Videos Playlist",
    description: "Mining hazard awareness, prevention, and safe work practices",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLB3JRydr2LBWmZ0n54wDrJHqzlsaf4bF0",
    category: "General Safety",
  },
  {
    title: "MSHA New Miner Training Playlist",
    description: "Starter training content for new mining workers",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PL4mxLIRYOwt72Yx4Lj0wJhRPz1GdzHhqk",
    category: "New Miner",
  },
  {
    title: "MSHA Part 46 & 48 Training Playlist",
    description: "Part 46/48 mine safety course content and drills",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLoNdAoEF0xpiVe5WiPquZc33iccJEfi3J",
    category: "Compliance",
  },
  {
    title: "MSHA Annual Refresher (Single Session)",
    description: "Long-form annual refresher training session",
    embedUrl: "https://www.youtube-nocookie.com/embed/urhSl6Wb6b4?rel=0&modestbranding=1",
    category: "Refresher",
  },
  {
    title: "Mining Rescue & Emergency Response",
    description: "Emergency response principles for underground incidents",
    embedUrl: "https://www.youtube-nocookie.com/embed/quZCasGGfaQ?rel=0&modestbranding=1",
    category: "Emergency",
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
          <div key={video.title} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                src={video.embedUrl}
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
