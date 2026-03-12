"use client";

import { clsx } from "clsx";
import { Download, FileDown } from "lucide-react";
import { Button } from "@/components/ui";
import { DATE_RANGES } from "@/data/analytics-data";

interface DateRangeFilterProps {
  selected: string;
  onSelect: (range: string) => void;
  onExport?: (type: "pdf" | "csv") => void;
}

export function DateRangeFilter({ selected, onSelect, onExport }: DateRangeFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {DATE_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => onSelect(range)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              selected === range
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onExport?.("pdf")}
        >
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onExport?.("csv")}
        >
          <FileDown className="w-4 h-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
