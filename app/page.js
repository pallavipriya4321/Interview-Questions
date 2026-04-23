import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="border-b border-slate-800/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
              P
            </div>
            <span className="text-lg font-semibold text-white">Interview Prep</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm text-slate-300">
            Tailored for your resumes
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Ace Your Next
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Interview
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Curated questions based on your exact resume points, projects, and technologies.
            Includes architecture deep-dives, system design, and cross-questions interviewers love to ask.
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Frontend Card */}
          <Link href="/frontend" className="group relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur transition group-hover:opacity-40" />
            <div className="relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all group-hover:border-blue-500/30 group-hover:bg-slate-800/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Frontend</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                React.js, Next.js, TypeScript, Tailwind CSS, Performance, Testing, Storybook, Component Library
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["JavaScript", "React.js", "Next.js", "TypeScript", "Tailwind", "Redux", "Jest", "Cypress"].map((t) => (
                  <span key={t} className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">11</span> topics &middot; <span className="text-white font-semibold">80+</span> questions
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-blue-400 transition group-hover:gap-2">
                  Start Prep
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Full Stack Card */}
          <Link href="/fullstack" className="group relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur transition group-hover:opacity-40" />
            <div className="relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all group-hover:border-purple-500/30 group-hover:bg-slate-800/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Full Stack</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Node.js, Express, PostgreSQL, MongoDB, Redis, JWT/RBAC, Docker, AWS, System Design
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Socket.io"].map((t) => (
                  <span key={t} className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">12</span> topics &middot; <span className="text-white font-semibold">100+</span> questions
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-purple-400 transition group-hover:gap-2">
                  Start Prep
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
          {/* DSA Card */}
          <Link href="/dsa" className="group relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur transition group-hover:opacity-40" />
            <div className="relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all group-hover:border-emerald-500/30 group-hover:bg-slate-800/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">DSA</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Data Structures & Algorithms — categorized by company type with brute, better & optimal approaches
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["Arrays", "Trees", "Graphs", "DP", "Stacks", "Linked Lists", "Sorting", "Sliding Window"].map((t) => (
                  <span key={t} className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">4</span> tiers &middot; <span className="text-white font-semibold">16</span> topics &middot; <span className="text-white font-semibold">200+</span> questions
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 transition group-hover:gap-2">
                  Start Prep
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Projects Card */}
          <Link href="/projects" className="group relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur transition group-hover:opacity-40" />
            <div className="relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all group-hover:border-amber-500/30 group-hover:bg-slate-800/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Projects</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Deep-dive into Marketplace, Food Delivery & Chat App — architecture, decisions, challenges & interview stories
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["Marketplace", "Food Delivery", "Chat App", "Architecture", "Challenges", "Stories"].map((t) => (
                  <span key={t} className="rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">3</span> projects &middot; <span className="text-white font-semibold">2</span> interview modes
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-amber-400 transition group-hover:gap-2">
                  Start Prep
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Android Card */}
          <Link href="/android" className="group relative sm:col-span-2">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-500 to-lime-500 opacity-20 blur transition group-hover:opacity-40" />
            <div className="relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all group-hover:border-green-500/30 group-hover:bg-slate-800/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Android</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Kotlin, Jetpack Compose, MVVM, Coroutines, Room, Hilt, Navigation — from basics to internal workings
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["Kotlin", "Jetpack Compose", "Coroutines", "MVVM", "Room", "Hilt", "Navigation", "Retrofit"].map((t) => (
                  <span key={t} className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">12</span> topics &middot; <span className="text-white font-semibold">120+</span> questions
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-400 transition group-hover:gap-2">
                  Start Prep
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Topics", value: "23", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
            { label: "Questions", value: "180+", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" },
            { label: "Projects", value: "3", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
            { label: "Cross Qs", value: "40+", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/50">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
