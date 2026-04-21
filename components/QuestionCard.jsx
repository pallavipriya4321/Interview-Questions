"use client";
import { useState } from "react";

const difficultyConfig = {
  beginner: { label: "Beginner", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  mid: { label: "Mid", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  advanced: { label: "Advanced", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const typeConfig = {
  concept: { label: "Concept", color: "bg-blue-500/10 text-blue-400" },
  coding: { label: "Coding", color: "bg-green-500/10 text-green-400" },
  architecture: { label: "Architecture", color: "bg-cyan-500/10 text-cyan-400" },
  cross: { label: "Cross Question", color: "bg-purple-500/10 text-purple-400" },
  internal: { label: "Internal Working", color: "bg-orange-500/10 text-orange-400" },
  behavioral: { label: "Behavioral", color: "bg-pink-500/10 text-pink-400" },
  system_design: { label: "System Design", color: "bg-teal-500/10 text-teal-400" },
};

export default function QuestionCard({ question, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const diff = difficultyConfig[question.difficulty] || difficultyConfig.mid;
  const type = typeConfig[question.type] || typeConfig.concept;

  return (
    <div className="group rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all hover:border-slate-600/50">
      {/* Question header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-700/50 text-xs font-mono text-slate-500">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold ${diff.color}`}>
              {diff.label}
            </span>
            <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${type.color}`}>
              {type.label}
            </span>
          </div>
          <h3 className="text-[15px] font-medium leading-snug text-slate-200 group-hover:text-white">
            {question.question}
          </h3>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          className={`mt-1 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Answer */}
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-inner">
          <div className="border-t border-slate-700/30 px-4 pb-5 pt-4 sm:px-5 sm:pl-14">
            <div className="prose-sm text-sm leading-relaxed text-slate-400 whitespace-pre-line">
              {question.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
