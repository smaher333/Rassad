import { AlertCircle, Shield, AlertTriangle } from "lucide-react";

/**
 * RiskScoreBadge Component
 * 
 * Displays the risk level of a sensitive action with visual indicators.
 * Risk levels: Low (0-33), Medium (34-66), High (67-100)
 * 
 * Design: Modern Security-First
 * - Color-coded badges (green for low, amber for medium, red for high)
 * - Icon indicates risk severity
 * - Score displayed numerically for transparency
 */

interface RiskScoreBadgeProps {
  score: number; // 0-100
  label?: string;
}

export default function RiskScoreBadge({ score, label = "Risk Score" }: RiskScoreBadgeProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 33) return { level: "Low", color: "bg-green-100 text-green-800", icon: Shield };
    if (score <= 66) return { level: "Medium", color: "bg-amber-100 text-amber-800", icon: AlertCircle };
    return { level: "High", color: "bg-red-100 text-red-800", icon: AlertTriangle };
  };

  const { level, color, icon: Icon } = getRiskLevel(score);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color} w-fit`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-semibold">{level}</span>
        <span className="text-xs font-mono ml-1">({score})</span>
      </div>
    </div>
  );
}
