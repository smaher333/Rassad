import { CheckCircle, XCircle, Clock } from "lucide-react";
import { ReactNode } from "react";

/**
 * ActionCard Component
 * 
 * Displays a sensitive action with its current state (pending, confirmed, or reversed).
 * Provides visual feedback through icons, colors, and smooth transitions.
 * 
 * Design: Modern Security-First
 * - State-based styling (pending: amber, confirmed: green, reversed: red)
 * - Clear icon indicators for each state
 * - Smooth fade-in animation on mount
 */

export type ActionState = "pending" | "confirmed" | "reversed";

interface ActionCardProps {
  title: string;
  description: string;
  state: ActionState;
  details?: ReactNode;
  timestamp?: string;
}

export default function ActionCard({
  title,
  description,
  state,
  details,
  timestamp,
}: ActionCardProps) {
  const getStateConfig = (state: ActionState) => {
    switch (state) {
      case "pending":
        return {
          icon: Clock,
          color: "bg-amber-50 border-amber-200",
          textColor: "text-amber-900",
          badge: "Pending Reversal",
          badgeColor: "bg-amber-100 text-amber-800",
        };
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "bg-green-50 border-green-200",
          textColor: "text-green-900",
          badge: "Confirmed",
          badgeColor: "bg-green-100 text-green-800",
        };
      case "reversed":
        return {
          icon: XCircle,
          color: "bg-red-50 border-red-200",
          textColor: "text-red-900",
          badge: "Reversed",
          badgeColor: "bg-red-100 text-red-800",
        };
    }
  };

  const config = getStateConfig(state);
  const Icon = config.icon;

  return (
    <div className={`border-2 rounded-xl p-6 ${config.color} animate-fade-in-up`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Icon className={`w-6 h-6 mt-1 ${config.textColor}`} />
          <div>
            <h3 className={`text-lg font-semibold ${config.textColor}`}>{title}</h3>
            <p className={`text-sm ${config.textColor} opacity-75 mt-1`}>{description}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badgeColor}`}>
          {config.badge}
        </span>
      </div>

      {details && (
        <div className={`mt-4 pt-4 border-t ${config.color.split(" ")[1]} opacity-75`}>
          {details}
        </div>
      )}

      {timestamp && (
        <p className={`text-xs ${config.textColor} opacity-60 mt-4`}>
          {timestamp}
        </p>
      )}
    </div>
  );
}
