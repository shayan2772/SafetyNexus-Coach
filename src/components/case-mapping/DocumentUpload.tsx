"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, FileText, X } from "lucide-react";
import { clsx } from "clsx";

interface FakeFile {
  id: string;
  name: string;
  size: string;
}

const FAKE_FILES: FakeFile[] = [
  { id: "f1", name: "Case_Notes_Morrison.pdf", size: "2.4 MB" },
  { id: "f2", name: "Police_Report_20260301.pdf", size: "1.1 MB" },
  { id: "f3", name: "Risk_Assessment_Notes.docx", size: "856 KB" },
];

export function DocumentUpload() {
  const [files, setFiles] = useState<FakeFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFakeFile = useCallback(() => {
    const available = FAKE_FILES.filter(
      (f) => !files.some((existing) => existing.id === f.id)
    );
    if (available.length > 0) {
      setFiles((prev) => [...prev, available[0]]);
    }
  }, [files]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-slate-700">Supporting Documents</h3>

      {/* Drop zone */}
      <div
        onClick={addFakeFile}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFakeFile();
        }}
        className={clsx(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-primary-400 bg-primary-50/50"
            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
        )}
      >
        <CloudUpload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-600">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-slate-400 mt-1">PDF, DOCX, TXT up to 10MB</p>
      </div>

      {/* Uploaded files list */}
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl"
          >
            <FileText className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
              <p className="text-xs text-slate-400">{file.size}</p>
            </div>
            <button
              onClick={() => removeFile(file.id)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
