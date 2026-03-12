"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, AlertTriangle, X } from "lucide-react";
import { clsx } from "clsx";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "error";
  visible: boolean;
  onClose: () => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    iconColor: "text-green-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    iconColor: "text-blue-500",
  },
  error: {
    icon: AlertTriangle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    iconColor: "text-red-500",
  },
};

export function Toast({ message, type = "info", visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={clsx(
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border",
            config.bg,
            config.border
          )}
        >
          <Icon className={clsx("w-5 h-5 flex-shrink-0", config.iconColor)} />
          <span className={clsx("text-sm font-medium", config.text)}>{message}</span>
          <button
            onClick={onClose}
            className={clsx("ml-2 flex-shrink-0 hover:opacity-70 transition-opacity", config.text)}
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
