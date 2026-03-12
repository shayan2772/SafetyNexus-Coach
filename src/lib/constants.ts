export const APP_NAME = "SafetyNexus";
export const APP_TAGLINE = "AI-Powered Domestic Violence Practice Support";
export const APP_DESCRIPTION =
  "An intelligent coaching platform built on the Safe & Together model, supporting caseworkers with real-time guidance, role-play practice, and case mapping tools.";

export const MODULES = [
  {
    id: "coach",
    name: "The Coach",
    description: "AI chat coach grounded exclusively in the S&T model with fidelity drift detection",
    icon: "MessageCircle",
    color: "primary",
    href: "/dashboard/coach",
  },
  {
    id: "role-play",
    name: "Role-Play Simulator",
    description: "Practice conversations with AI personas and receive S&T-aligned debrief feedback",
    icon: "Users",
    color: "violet",
    href: "/dashboard/role-play",
  },
  {
    id: "case-mapping",
    name: "Case Mapping Tool",
    description: "12-step guided perpetrator pattern documentation with PDF export",
    icon: "ClipboardList",
    color: "amber",
    href: "/dashboard/case-mapping",
  },
  {
    id: "well-being",
    name: "Well-Being Companion",
    description: "Emotional support, distress detection, and hardcoded crisis protocol",
    icon: "Heart",
    color: "teal",
    href: "/dashboard/well-being",
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Usage metrics, NLP theme detection, and practice fidelity signals",
    icon: "BarChart3",
    color: "blue",
    href: "/dashboard/analytics",
  },
] as const;

export const DEMO_USER = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@safetynexus.demo",
  role: "Senior Caseworker",
  organization: "Scottish DV Services",
  avatar: "/avatar-placeholder.png",
};
