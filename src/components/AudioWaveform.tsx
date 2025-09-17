import { Lock, LockOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  locked?: boolean;
  className?: string;
  bars?: number;
}

const AudioWaveform = ({ locked = false, className, bars = 20 }: AudioWaveformProps) => {
  const heights = Array.from({ length: bars }, (_, i) => {
    // Create a realistic waveform pattern
    const base = Math.sin((i / bars) * Math.PI * 2) * 30 + 50;
    const variation = Math.random() * 20;
    return Math.max(20, Math.min(100, base + variation));
  });

  return (
    <div className={cn("flex items-end space-x-1 relative", className)}>
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-2 rounded-t transition-all duration-300 animate-waveform",
            locked ? "waveform-bar locked" : "waveform-bar"
          )}
          style={{ 
            height: `${height}%`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
      
      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {locked ? (
          <Lock className="h-6 w-6 text-muted-foreground bg-card/80 rounded-full p-1" />
        ) : (
          <LockOpen className="h-6 w-6 text-success bg-card/80 rounded-full p-1" />
        )}
      </div>
    </div>
  );
};

export default AudioWaveform;