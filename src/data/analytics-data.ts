export const KPI_DATA = [
  { label: "Active Users", value: 247, change: 12.5, changeType: "up" as const, icon: "Users", color: "primary" },
  { label: "Sessions This Week", value: 1284, change: 8.3, changeType: "up" as const, icon: "MessageCircle", color: "accent" },
  { label: "Avg. Session Duration", value: 18.5, suffix: " min", change: 2.1, changeType: "up" as const, icon: "Clock", color: "blue", decimals: 1 },
  { label: "Practice Fidelity Score", value: 94.2, suffix: "%", change: 1.8, changeType: "up" as const, icon: "Shield", color: "green", decimals: 1 },
];

// 30 days of session data
export const SESSIONS_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 2, i + 1); // March 2026
  const baseValue = 30 + Math.sin(i / 3) * 10;
  const trend = i * 0.5;
  const noise = Math.random() * 8 - 4;
  return {
    date: date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    sessions: Math.max(10, Math.round(baseValue + trend + noise)),
  };
});

export const MODULE_USAGE = [
  { name: "The Coach", value: 35, color: "#3b82f6" },
  { name: "Role-Play", value: 25, color: "#8b5cf6" },
  { name: "Case Mapping", value: 20, color: "#f59e0b" },
  { name: "Well-Being", value: 15, color: "#14b8a6" },
  { name: "Other", value: 5, color: "#94a3b8" },
];

export const TEAM_ACTIVITY = [
  { name: "Sarah M.", sessions: 42 },
  { name: "James K.", sessions: 38 },
  { name: "Aroha W.", sessions: 35 },
  { name: "Emma R.", sessions: 31 },
  { name: "David L.", sessions: 28 },
  { name: "Priya S.", sessions: 25 },
  { name: "Michael T.", sessions: 22 },
  { name: "Lisa N.", sessions: 18 },
];

export const DATE_RANGES = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"];
