import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RiskScoreBadge from "@/components/RiskScoreBadge";
import CountdownTimer from "@/components/CountdownTimer";
import ActionCard from "@/components/ActionCard";
import { AlertCircle, RotateCcw, CheckCircle2 } from "lucide-react";
import { scanIdentityDemo } from "@/services/securityScanner";

/**
 * Smart Reversal Window MVP - Home Page (Absher Branded)
 * 
 * Demonstrates the core concept of a time-limited undo window for sensitive actions.
 * Users can simulate performing a sensitive action and either confirm or reverse it
 * within the undo window.
 * 
 * Design: Modern Security-First with Absher Government Portal Branding
 * - Clean, professional layout with asymmetric emphasis
 * - Animated countdown timer with visual progress
 * - Risk score calculation based on action type, time, and device
 * - Clear action state transitions (pending → confirmed/reversed)
 * - Absher logo and branded background
 */

type ActionType = "ownership_transfer" | "device_auth" | "data_export" | "access_revoke";
type ActionState = "idle" | "pending" | "confirmed" | "reversed";

interface SensitiveAction {
  type: ActionType;
  title: string;
  description: string;
  riskBase: number; // Base risk score 0-100
}

const SENSITIVE_ACTIONS: Record<ActionType, SensitiveAction> = {
  ownership_transfer: {
    type: "ownership_transfer",
    title: "نقل الملكية",
    description: "نقل ملكية المركبة إلى شخص آخر",
    riskBase: 85,
  },
  device_auth: {
    type: "device_auth",
    title: "تفويض جهاز جديد",
    description: "إضافة جهاز جديد إلى حسابك في أبشر",
    riskBase: 45,
  },
  data_export: {
    type: "data_export",
    title: "تصدير البيانات الشخصية",
    description: "تصدير جميع المستندات والسجلات الشخصية",
    riskBase: 60,
  },
  access_revoke: {
    type: "access_revoke",
    title: "إلغاء الوصول",
    description: "إزالة الوصول لمستخدم مفوض",
    riskBase: 50,
  },
};

export default function Home() {
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [undoWindowSeconds, setUndoWindowSeconds] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [actionTimestamp, setActionTimestamp] = useState<string>("");
  const [idNumber, setIdNumber] = useState("");
const [scanLoading, setScanLoading] = useState(false);
const [scanMessage, setScanMessage] = useState<string | null>(null);


  // Simulate risk score calculation based on time of day and device
  const calculateRiskScore = (baseScore: number) => {
    const hour = new Date().getHours();
    const isOffHours = hour < 6 || hour > 22; // 10 PM - 6 AM
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    
    let adjustedScore = baseScore;
    
    // Increase risk if action happens during off-hours
    if (isOffHours) adjustedScore += 15;
    
    // Increase risk if action happens on weekend
    if (isWeekend) adjustedScore += 10;
    
    // Simulate device risk (random for demo)
    const deviceRisk = Math.floor(Math.random() * 20);
    adjustedScore += deviceRisk;
    
    return Math.min(adjustedScore, 100);
  };

  // Calculate undo window based on risk score
  const calculateUndoWindow = (score: number): number => {
    if (score <= 33) return 5 * 60; // Low risk: 5 minutes
    if (score <= 66) return 10 * 60; // Medium risk: 10 minutes
    return 15 * 60; // High risk: 15 minutes
  };

  const handleActionClick = (actionType: ActionType) => {
    const action = SENSITIVE_ACTIONS[actionType];
    const score = calculateRiskScore(action.riskBase);
    const undoWindow = calculateUndoWindow(score);

    setSelectedAction(actionType);
    setRiskScore(score);
    setUndoWindowSeconds(undoWindow);
    setActionState("pending");
    setActionTimestamp(new Date().toLocaleTimeString("ar-SA"));
  };

  const handleConfirm = () => {
    setActionState("confirmed");
  };

  const handleReverse = () => {
    setActionState("reversed");
  };

  const handleReset = () => {
    setSelectedAction(null);
    setActionState("idle");
    setRiskScore(0);
    setUndoWindowSeconds(0);
    setActionTimestamp("");
  };
const handleSecurityScan = async () => {
  setScanLoading(true);
  setScanMessage(null);

  try {
    const res = await scanIdentityDemo(idNumber);

    if (!res.success) {
      setScanMessage(res.message);
    } else {
      setScanMessage(`النتيجة: ${res.data.label}`);
    }
  } finally {
    setScanLoading(false);
  }
};

  const handleTimerComplete = () => {
    if (actionState === "pending") {
      setActionState("confirmed");
    }
  };

  const currentAction = selectedAction ? SENSITIVE_ACTIONS[selectedAction] : null;

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/absher-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={`${import.meta.env.BASE_URL}images/absher-logo.jpg`}

                  alt="Absher Logo" 
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">نافذة الإلغاء الذكية</h1>
                  <p className="text-sm text-muted-foreground">
                    منصة أبشر - حماية العمليات الحساسة
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Smart Reversal Window</p>
                <p className="text-xs text-muted-foreground">Absher MVP</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Action Selection or Details */}
            <div className="lg:col-span-2">
              {actionState === "idle" ? (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-foreground">اختر عملية حساسة</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(SENSITIVE_ACTIONS).map(([key, action]) => (
                      <button
                        key={key}
                        onClick={() => handleActionClick(key as ActionType)}
                        className="group relative overflow-hidden rounded-xl border-2 border-border p-5 text-right transition-all duration-300 hover:border-primary hover:shadow-lg hover:scale-105 bg-white hover:bg-primary/5"
                      >
                        <div className="relative z-10">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            {action.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              ← اضغط للتنفيذ
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">
                              درجة المخاطرة: {action.riskBase}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-foreground">حالة العملية</h2>
                    <ActionCard
                      title={currentAction?.title || ""}
                      description={currentAction?.description || ""}
                      state={actionState as any}
                      timestamp={actionTimestamp}
                    />
                  </div>

                  {/* Timer and Controls */}
                  {actionState === "pending" && (
                    <div className="space-y-6">
                      <Card className="p-8 bg-white border-2 border-border">
                        <CountdownTimer
                          totalSeconds={undoWindowSeconds}
                          onComplete={handleTimerComplete}
                          isActive={true}
                        />
                      </Card>

                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={handleReverse}
                          variant="outline"
                          size="lg"
                          className="gap-2 border-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          إلغاء العملية
                        </Button>
                        <Button
                          onClick={handleConfirm}
                          size="lg"
                          className="gap-2 bg-primary hover:bg-primary/90"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          تأكيد العملية
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        سيتم تنفيذ العملية تلقائياً عند انتهاء المؤقت إذا لم يتم إلغاؤها.
                      </p>
                    </div>
                  )}

                  {(actionState === "confirmed" || actionState === "reversed") && (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        جرب عملية أخرى
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Risk Score and Info */}
            <div className="space-y-6">
              {actionState !== "idle" && (
                <>
                  <Card className="p-6 bg-white border-2 border-border">
                    <RiskScoreBadge score={riskScore} label="درجة المخاطرة المحسوبة" />
                    <div className="mt-6 space-y-3 text-sm text-right">
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="font-semibold">{SENSITIVE_ACTIONS[selectedAction!].riskBase}</span>
                        <span className="text-muted-foreground">درجة المخاطرة الأساسية</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="font-semibold">
                          {new Date().getHours() < 6 || new Date().getHours() > 22 ? "+15" : "0"}
                        </span>
                        <span className="text-muted-foreground">عامل الوقت</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="font-semibold">+{riskScore - SENSITIVE_ACTIONS[selectedAction!].riskBase - (new Date().getHours() < 6 || new Date().getHours() > 22 ? 15 : 0)}</span>
                        <span className="text-muted-foreground">عامل الجهاز</span>
                      </div>
                      <div className="flex justify-between items-center pt-3">
                        <span className="text-lg font-bold text-primary">{riskScore}</span>
                        <span className="text-muted-foreground font-semibold">إجمالي المخاطرة</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border-2 border-border">
                    <h3 className="font-semibold mb-4 text-right text-foreground">مدة نافذة الإلغاء</h3>
                    <div className="space-y-2 text-right">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold">
                          {Math.floor(undoWindowSeconds / 60)} دقيقة
                        </span>
                        <span className="text-sm text-muted-foreground">المدة</span>
                      </div>
                      <p className="text-xs text-muted-foreground pt-2 border-t border-border mt-3">
                        {riskScore <= 33
                          ? "العمليات منخفضة المخاطرة لها نافذة إلغاء أقصر."
                          : riskScore <= 66
                          ? "العمليات متوسطة المخاطرة لها نافذة إلغاء قياسية."
                          : "العمليات عالية المخاطرة لها نافذة إلغاء مطولة للأمان."}
                      </p>
                    </div>
                  </Card>
                </>
              )}
<Card className="p-6 bg-white border-2 border-border">
  <h3 className="font-semibold mb-3 text-right text-foreground">المسح الأمني للهوية</h3>

  <div className="flex flex-col gap-3">
    <input
      value={idNumber}
      onChange={(e) => setIdNumber(e.target.value)}
      placeholder="أدخل رقم الهوية"
      className="w-full rounded-md border border-border bg-white px-3 py-2 text-right"
      inputMode="numeric"
    />

    <Button onClick={handleSecurityScan} disabled={scanLoading} className="gap-2">
      {scanLoading ? "جارٍ المسح..." : "بدء المسح الأمني"}
    </Button>

    {scanMessage && (
      <p className="text-sm text-right text-muted-foreground">{scanMessage}</p>
    )}
  </div>
</Card>

              {/* Info Card */}
              <Card className="p-6 bg-white/80 border-2 border-border">
                <h3 className="font-semibold mb-3 text-right text-foreground">كيفية العمل</h3>
                <ol className="space-y-2 text-sm text-muted-foreground text-right">
                  <li className="flex gap-2 justify-end">
                    <span>اختر عملية حساسة</span>
                    <span className="font-bold text-primary min-w-fit">1.</span>
                  </li>
                  <li className="flex gap-2 justify-end">
                    <span>يحسب النظام درجة المخاطرة</span>
                    <span className="font-bold text-primary min-w-fit">2.</span>
                  </li>
                  <li className="flex gap-2 justify-end">
                    <span>تبدأ عداد نافذة الإلغاء</span>
                    <span className="font-bold text-primary min-w-fit">3.</span>
                  </li>
                  <li className="flex gap-2 justify-end">
                    <span>أكد أو ألغِ العملية</span>
                    <span className="font-bold text-primary min-w-fit">4.</span>
                  </li>
                </ol>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-white/50 mt-12">
          <div className="container py-6 text-center text-sm text-muted-foreground">
            <p>نافذة الإلغاء الذكية - مشروع تجريبي لتحسين أمان منصة أبشر</p>
            <p className="text-xs mt-2">Smart Reversal Window MVP - Absher Security Enhancement</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
