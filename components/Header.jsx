"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ onMenuToggle, showMenuButton }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
              P
            </div>
            <span className="text-lg font-semibold text-white">Interview Prep</span>
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/frontend"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              pathname === "/frontend"
                ? "bg-blue-500/20 text-blue-400 shadow-sm shadow-blue-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Frontend
          </Link>
          <Link
            href="/fullstack"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              pathname === "/fullstack"
                ? "bg-purple-500/20 text-purple-400 shadow-sm shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Full Stack
          </Link>
        </nav>
      </div>
    </header>
  );
}
