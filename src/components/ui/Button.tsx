"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          {
            "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:shadow-primary-600/25":
              variant === "primary",
            "bg-white hover:bg-slate-50 text-primary-600 border-2 border-primary-200 hover:border-primary-400":
              variant === "secondary",
            "bg-transparent hover:bg-slate-100 text-slate-600": variant === "ghost",
            "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
