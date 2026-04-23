"use client";
import { useState } from "react";

const difficultyConfig = {
  beginner: { label: "Easy", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  medium: { label: "Medium", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  hard: { label: "Hard", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function CodingQuestion({ problem, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeApproach, setActiveApproach] = useState(0);
  const diff = difficultyConfig[problem.difficulty] || difficultyConfig.medium;

  const approach = problem.approaches[activeApproach];

  return (
    <div className="group rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all hover:border-slate-600/50">
      {/* Problem header */}
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
            <span className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold bg-green-500/10 text-green-400">
              Coding
            </span>
          </div>
          <h3 className="text-[15px] font-medium leading-snug text-slate-200 group-hover:text-white">
            {problem.question}
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

      {/* Expanded content */}
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-inner">
          <div className="border-t border-slate-700/30 px-4 pb-5 pt-4 sm:px-5">
            {/* Approach tabs */}
            <div className="mb-4 flex flex-wrap gap-2">
              {problem.approaches.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActiveApproach(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeApproach === i
                      ? i === 0
                        ? "bg-red-500/20 text-red-400 shadow-sm shadow-red-500/10"
                        : i === problem.approaches.length - 1
                        ? "bg-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/10"
                        : "bg-yellow-500/20 text-yellow-400 shadow-sm shadow-yellow-500/10"
                      : "bg-slate-700/40 text-slate-400 hover:bg-slate-700/60 hover:text-slate-300"
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>

            {/* Complexity badges */}
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-md bg-slate-700/30 px-2.5 py-1">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[11px] text-slate-400">Time:</span>
                <span className="text-[11px] font-semibold text-white">{approach.complexity.time}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-slate-700/30 px-2.5 py-1">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <path d="M7 7h10M7 12h10M7 17h6" />
                </svg>
                <span className="text-[11px] text-slate-400">Space:</span>
                <span className="text-[11px] font-semibold text-white">{approach.complexity.space}</span>
              </div>
            </div>

            {/* Code block */}
            <div className="mb-4 overflow-hidden rounded-lg border border-slate-700/50 bg-[#0d1117]">
              <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-2">
                <span className="text-[11px] font-medium text-slate-500">JavaScript</span>
                <button
                  onClick={() => navigator.clipboard.writeText(approach.code)}
                  className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-700/50 hover:text-slate-300"
                  title="Copy code"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
              <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                <code className="text-slate-300 font-mono whitespace-pre">{approach.code}</code>
              </pre>
            </div>

            {/* Line-by-line explanation */}
            <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 12h6M9 16h6" />
                </svg>
                Step-by-Step Explanation
              </h4>
              <div className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
                {approach.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
