import { useEffect, useState } from "react";

/**
 * CountdownTimer Component
 * 
 * Displays a circular countdown timer with smooth animation.
 * The ring depletes as time runs out, providing visual feedback.
 * 
 * Design: Modern Security-First
 * - Animated SVG ring that depletes linearly
 * - Time displayed in MM:SS format
 * - Color transitions: amber (warning) to red (critical)
 */

interface CountdownTimerProps {
  totalSeconds: number;
  onComplete?: () => void;
  isActive?: boolean;
}

export default function CountdownTimer({
  totalSeconds,
  onComplete,
  isActive = true,
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = (secondsLeft / totalSeconds) * 100;

  // SVG circle circumference (radius = 90)
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Color based on remaining time
  const getColor = () => {
    if (progress > 50) return "#f59e0b"; // Amber
    if (progress > 25) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Time text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold font-mono text-foreground">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Time Remaining</p>
          </div>
        </div>
      </div>

      {/* Status message */}
      <div className="text-center">
        {secondsLeft > 0 ? (
          <p className="text-sm text-muted-foreground">
            Action can be reversed within <span className="font-semibold text-foreground">{minutes}m {seconds}s</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-destructive">Action is now permanent</p>
        )}
      </div>
    </div>
  );
}
