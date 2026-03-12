import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafetyNexus — AI-Powered Practice Support",
  description:
    "An intelligent coaching platform built on the Safe & Together model, supporting domestic violence caseworkers with real-time guidance.",
  openGraph: {
    title: "SafetyNexus — AI-Powered Practice Support",
    description:
      "An intelligent coaching platform built on the Safe & Together model, supporting domestic violence caseworkers with real-time guidance.",
    type: "website",
    siteName: "SafetyNexus",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafetyNexus — AI-Powered Practice Support",
    description:
      "An intelligent coaching platform built on the Safe & Together model, supporting domestic violence caseworkers with real-time guidance.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
