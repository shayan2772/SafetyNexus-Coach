"use client";

import { Info } from "lucide-react";
import { clsx } from "clsx";
import type { CaseStep } from "@/data/case-mapping-data";

interface StepFormProps {
  step: CaseStep;
  formData: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
}

export function StepForm({ step, formData, onChange }: StepFormProps) {
  const renderField = (field: typeof step.fields[number]) => {
    const value = formData[field.id];

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            id={field.id}
            value={(value as string) || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full rounded-xl border border-slate-200 p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-200"
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.id}
            value={(value as string) || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full rounded-xl border border-slate-200 p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-200 min-h-[120px] resize-y"
          />
        );

      case "select":
        return (
          <select
            id={field.id}
            value={(value as string) || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox-group": {
        const checkedValues = (value as string[]) || [];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {field.options?.map((option) => (
              <label
                key={option}
                className={clsx(
                  "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  checkedValues.includes(option)
                    ? "border-primary-400 bg-primary-50/50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={checkedValues.includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...checkedValues, option]
                      : checkedValues.filter((v) => v !== option);
                    onChange(field.id, newValues);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        );
      }

      case "date":
        return (
          <input
            type="date"
            id={field.id}
            value={(value as string) || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Step {step.number}: {step.title}
        </h2>
        <p className="text-slate-500 mt-1">{step.description}</p>
      </div>

      {/* Guidance box */}
      <div className="bg-primary-50 border-l-4 border-primary-400 rounded-r-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-primary-800 leading-relaxed">{step.guidance}</p>
      </div>

      {/* Form fields */}
      <div className="space-y-5">
        {step.fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block font-semibold text-slate-700 mb-1.5"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "textarea" && (
              <p className="text-xs text-slate-400 mb-2">
                Provide as much detail as possible to support thorough case analysis.
              </p>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}
