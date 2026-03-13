"use client";

import { Shield } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white/70 py-16 px-4 sm:px-6 lg:px-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{APP_TAGLINE}</p>
            <p className="text-xs text-white/40 italic">
              Built with &#10084; for the Safe &amp; Together community
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social placeholder */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <p className="text-sm leading-relaxed">Follow our journey as we expand AI-powered practice support worldwide.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 {APP_NAME}. All rights reserved.</p>
          <p>Built on the Safe &amp; Together Model</p>
        </div>
      </div>
    </footer>
  );
}
