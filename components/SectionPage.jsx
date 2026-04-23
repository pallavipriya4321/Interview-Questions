"use client";
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import QuestionCard from "./QuestionCard";
import SearchBar from "./SearchBar";

export default function SectionPage({ topics, accentColor = "blue" }) {
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id || "");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const topicRefs = useRef({});

  const scrollToTopic = (topicId) => {
    setActiveTopic(topicId);
    const el = topicRefs.current[topicId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter questions by search
  const filteredTopics = topics.map((topic) => ({
    ...topic,
    questions: topic.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((topic) => topic.questions.length > 0);

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
  }, [filteredTopics]);

  const totalFiltered = filteredTopics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />

      <div className="flex">
        <Sidebar
          topics={search ? filteredTopics : topics}
          activeTopic={activeTopic}
          onTopicClick={scrollToTopic}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Search bar */}
            <div className="mb-6">
              <SearchBar value={search} onChange={setSearch} />
              {search && (
                <p className="mt-2 text-xs text-slate-500">
                  Found <span className="text-slate-300">{totalFiltered}</span> questions matching &ldquo;{search}&rdquo;
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
                <div className="sticky top-16 z-10 -mx-4 mb-4 bg-[#0f172a]/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                      accentColor === "purple"
                        ? "bg-purple-500/15 text-purple-400"
                        : accentColor === "green"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-blue-500/15 text-blue-400"
                    }`}>
                      {topic.icon}
                    </span>
                    <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
                    <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[11px] text-slate-400">
                      {topic.questions.length} questions
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {topic.questions.map((q, i) => (
                    <QuestionCard key={i} question={q} index={i} />
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
                <button
                  onClick={() => setSearch("")}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                >
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
