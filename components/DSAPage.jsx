"use client";
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import QuestionCard from "./QuestionCard";
import CodingQuestion from "./CodingQuestion";
import SearchBar from "./SearchBar";

const tierConfig = {
  "service-based": {
    label: "Service Based",
    description: "TCS, Infosys, Wipro, Cognizant",
    color: "emerald",
    activeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  "midsize": {
    label: "Midsize",
    description: "Zoho, Freshworks, Myntra, Swiggy",
    color: "blue",
    activeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  "product-based": {
    label: "Product Based",
    description: "Google, Amazon, Microsoft, Meta",
    color: "purple",
    activeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  "startups": {
    label: "Startups",
    description: "YC, Series A-C, fast-paced",
    color: "orange",
    activeClass: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
};

const tierColors = {
  "service-based": { sidebar: "bg-emerald-500/15 text-emerald-400", sidebarActive: "bg-emerald-500/20 text-emerald-400", icon: "bg-emerald-500/20 text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400" },
  "midsize": { sidebar: "bg-blue-500/15 text-blue-400", sidebarActive: "bg-blue-500/20 text-blue-400", icon: "bg-blue-500/20 text-blue-400", badge: "bg-blue-500/10 text-blue-400" },
  "product-based": { sidebar: "bg-purple-500/15 text-purple-400", sidebarActive: "bg-purple-500/20 text-purple-400", icon: "bg-purple-500/20 text-purple-400", badge: "bg-purple-500/10 text-purple-400" },
  "startups": { sidebar: "bg-orange-500/15 text-orange-400", sidebarActive: "bg-orange-500/20 text-orange-400", icon: "bg-orange-500/20 text-orange-400", badge: "bg-orange-500/10 text-orange-400" },
};

export default function DSAPage({ dsaData }) {
  const tiers = Object.keys(dsaData);
  const [activeTier, setActiveTier] = useState(tiers[0]);
  const [activeTopic, setActiveTopic] = useState("");
  const [activeTab, setActiveTab] = useState("coding"); // "conceptual" | "coding"
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const topicRefs = useRef({});

  const currentTier = dsaData[activeTier];
  const topics = currentTier?.topics || [];
  const colors = tierColors[activeTier];

  // Set first topic when tier changes
  useEffect(() => {
    if (topics.length > 0) {
      setActiveTopic(topics[0].id);
    }
  }, [activeTier]);

  const scrollToTopic = (topicId) => {
    setActiveTopic(topicId);
    const el = topicRefs.current[topicId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  };

  // Filter questions by search
  const filteredTopics = topics.map((topic) => {
    const filteredConceptual = (topic.conceptual || []).filter(
      (q) =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase())
    );
    const filteredCoding = (topic.coding || []).filter(
      (q) =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.approaches?.some(
          (a) =>
            a.code.toLowerCase().includes(search.toLowerCase()) ||
            a.explanation.toLowerCase().includes(search.toLowerCase())
        )
    );
    return { ...topic, conceptual: filteredConceptual, coding: filteredCoding };
  }).filter((topic) =>
    activeTab === "conceptual"
      ? topic.conceptual.length > 0
      : topic.coding.length > 0
  );

  // Track active topic on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTopic(entry.target.dataset.topicId);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    Object.values(topicRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredTopics, activeTab]);

  const totalQuestions = filteredTopics.reduce(
    (sum, t) => sum + (activeTab === "conceptual" ? t.conceptual.length : t.coding.length),
    0
  );

  const getTopicCount = (topic) =>
    activeTab === "conceptual" ? topic.conceptual?.length || 0 : topic.coding?.length || 0;

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />

      {/* Tier tabs */}
      <div className="sticky top-16 z-30 border-b border-slate-700/50 bg-[#0f172a]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 py-2">
            {tiers.map((tier) => {
              const config = tierConfig[tier];
              const isActive = activeTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? config.activeClass
                      : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                  }`}
                >
                  <span className="block">{config.label}</span>
                  <span className={`block text-[10px] font-normal ${isActive ? "opacity-70" : "text-slate-600"}`}>
                    {config.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-[8.5rem] left-0 z-40 h-[calc(100vh-8.5rem)] w-72 transform border-r border-slate-700/50 bg-[#1e293b] transition-transform duration-300 lg:sticky lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Mobile close */}
            <div className="flex items-center justify-between border-b border-slate-700/50 p-4 lg:hidden">
              <span className="text-sm font-semibold text-white">Topics</span>
              <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-1 text-slate-400 hover:text-white">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conceptual/Coding toggle */}
            <div className="border-b border-slate-700/50 p-3">
              <div className="flex rounded-lg bg-slate-800/80 p-1">
                <button
                  onClick={() => setActiveTab("conceptual")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "conceptual"
                      ? "bg-slate-700 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Conceptual
                </button>
                <button
                  onClick={() => setActiveTab("coding")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "coding"
                      ? "bg-slate-700 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Coding
                </button>
              </div>
            </div>

            {/* Topics list */}
            <nav className="flex-1 overflow-y-auto p-3">
              <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {tierConfig[activeTier]?.label} Topics
              </div>
              {(search ? filteredTopics : topics).map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => scrollToTopic(topic.id)}
                  className={`group mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                    activeTopic === topic.id
                      ? colors.sidebar
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                    activeTopic === topic.id
                      ? colors.icon
                      : "bg-slate-700/50 text-slate-500 group-hover:text-slate-400"
                  }`}>
                    {topic.icon}
                  </span>
                  <span className="truncate">{topic.title}</span>
                  <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    activeTopic === topic.id
                      ? colors.badge
                      : "bg-slate-700/50 text-slate-500"
                  }`}>
                    {getTopicCount(topic)}
                  </span>
                </button>
              ))}
            </nav>

            {/* Stats footer */}
            <div className="border-t border-slate-700/50 p-4">
              <div className="text-xs text-slate-500">
                {totalQuestions} {activeTab} questions across {filteredTopics.length} topics
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="mb-6">
              <SearchBar value={search} onChange={setSearch} />
              {search && (
                <p className="mt-2 text-xs text-slate-500">
                  Found <span className="text-slate-300">{totalQuestions}</span> questions matching &ldquo;{search}&rdquo;
                </p>
              )}
            </div>

            {/* Questions grouped by topic */}
            {filteredTopics.map((topic) => (
              <section
                key={topic.id}
                ref={(el) => { topicRefs.current[topic.id] = el; }}
                data-topic-id={topic.id}
                className="mb-10"
              >
                <div className="sticky top-[8.5rem] z-10 -mx-4 mb-4 bg-[#0f172a]/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${colors.icon}`}>
                      {topic.icon}
                    </span>
                    <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
                    <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[11px] text-slate-400">
                      {activeTab === "conceptual" ? topic.conceptual.length : topic.coding.length} questions
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeTab === "conceptual"
                    ? topic.conceptual.map((q, i) => (
                        <QuestionCard key={i} question={q} index={i} />
                      ))
                    : topic.coding.map((q, i) => (
                        <CodingQuestion key={i} problem={q} index={i} />
                      ))}
                </div>
              </section>
            ))}

            {filteredTopics.length === 0 && (
              <div className="mt-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-slate-400">No questions match your search.</p>
                <button onClick={() => setSearch("")} className="mt-2 text-sm text-emerald-400 hover:text-emerald-300">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
