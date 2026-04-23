"use client";
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import QuestionCard from "./QuestionCard";

const interviewTabs = [
  { id: "frontend", label: "Frontend Interview", color: "amber" },
  { id: "fullstack", label: "Full Stack Interview", color: "orange" },
];

const projectMeta = {
  marketplace: {
    icon: "Mp",
    badge: "Team Project",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  foodDelivery: {
    icon: "FD",
    badge: "Personal",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  chatApp: {
    icon: "CA",
    badge: "Personal",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
};

export default function ProjectsPage({ projectsData }) {
  const [activeTab, setActiveTab] = useState("frontend");
  const [activeProject, setActiveProject] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const projectRefs = useRef({});

  const projects = Object.values(projectsData);

  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0].id);
    }
  }, [projects]);

  // IntersectionObserver for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.id.replace("project-", ""));
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    Object.values(projectRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToProject = (projectId) => {
    const ref = projectRefs.current[projectId];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveProject(projectId);
    setSidebarOpen(false);
  };

  const filterContent = (text) => {
    if (!search) return true;
    return text.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <aside
          className={`fixed top-16 z-40 h-[calc(100vh-4rem)] w-72 transform border-r border-slate-700/50 bg-[#1e293b] transition-transform lg:sticky lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto p-4">
            {/* Interview Type Toggle */}
            <div className="mb-4 flex rounded-lg bg-slate-800/50 p-1">
              {interviewTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-amber-500/20 text-amber-400 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-600/50 bg-slate-800/50 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Project List */}
            <div className="space-y-2">
              {projects.map((project) => {
                const meta = projectMeta[project.id];
                return (
                  <button
                    key={project.id}
                    onClick={() => scrollToProject(project.id)}
                    className={`w-full rounded-lg p-3 text-left transition-all ${
                      activeProject === project.id
                        ? "bg-amber-500/15 border border-amber-500/20"
                        : "border border-transparent hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          activeProject === project.id
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-slate-700/50 text-slate-400"
                        }`}
                      >
                        {meta.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-medium truncate ${activeProject === project.id ? "text-amber-400" : "text-slate-300"}`}>
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${meta.badgeColor}`}>
                            {meta.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-auto border-t border-slate-700/50 pt-4 mt-4">
              <div className="text-xs text-slate-500">
                <span className="text-amber-400 font-medium">3</span> projects &middot;{" "}
                <span className="text-amber-400 font-medium">{activeTab === "frontend" ? "Frontend" : "Full Stack"}</span> mode
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* Mobile Tab Toggle */}
          <div className="mb-6 flex rounded-lg bg-slate-800/50 p-1 lg:hidden">
            {interviewTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500/20 text-amber-400 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {projects.map((project) => {
            const data = project.sections[activeTab];
            if (!data) return null;
            const meta = projectMeta[project.id];

            return (
              <section
                key={project.id}
                id={`project-${project.id}`}
                ref={(el) => (projectRefs.current[project.id] = el)}
                className="mb-12"
              >
                {/* Project Header */}
                <div className="sticky top-16 z-10 -mx-4 mb-6 border-b border-slate-700/50 bg-[#0f172a]/90 px-4 py-4 backdrop-blur-lg sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-sm font-bold text-amber-400">
                      {meta.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">{project.title}</h2>
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${meta.badgeColor}`}>
                          {meta.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{project.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="mb-6 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
                  <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.scale && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        {project.scale}
                      </span>
                    )}
                    {project.duration && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {project.duration}
                      </span>
                    )}
                    {project.team && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                        {project.team}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <CollapsibleSection
                  title="Tech Stack"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
                  sectionKey={`${project.id}-tech-${activeTab}`}
                  expanded={expandedSections}
                  onToggle={toggleSection}
                  count={data.techStack?.length}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.techStack?.map((tech, i) => (
                      <div key={i} className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-semibold text-amber-400">{tech.name}</span>
                          <span className="rounded-md bg-slate-700/50 px-2 py-0.5 text-[10px] text-slate-400">{tech.purpose}</span>
                        </div>
                        <p className="mb-2 text-xs leading-relaxed text-slate-400">{tech.how}</p>
                        <p className="text-xs text-slate-500 italic">&ldquo;{tech.why}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Architecture Story */}
                <CollapsibleSection
                  title="Architecture & Story"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>}
                  sectionKey={`${project.id}-arch-${activeTab}`}
                  expanded={expandedSections}
                  onToggle={toggleSection}
                >
                  <div className="prose-sm text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                    {data.architecture}
                  </div>
                </CollapsibleSection>

                {/* Key Features */}
                <CollapsibleSection
                  title={project.team ? "Features I Owned" : "What I Built"}
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>}
                  sectionKey={`${project.id}-features-${activeTab}`}
                  expanded={expandedSections}
                  onToggle={toggleSection}
                  count={data.features?.length}
                >
                  <div className="space-y-3">
                    {data.features?.map((feature, i) => (
                      <div key={i} className="flex gap-3 rounded-lg border border-slate-700/30 bg-slate-800/20 p-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-400">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{feature.title}</div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">{feature.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Challenges & Solutions */}
                <CollapsibleSection
                  title="Challenges & Solutions"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  sectionKey={`${project.id}-challenges-${activeTab}`}
                  expanded={expandedSections}
                  onToggle={toggleSection}
                  count={data.challenges?.length}
                >
                  <div className="space-y-4">
                    {data.challenges?.map((ch, i) => (
                      <div key={i} className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
                        <div className="mb-2 flex items-start gap-2">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-[10px] text-red-400">!</span>
                          <span className="text-sm font-medium text-red-400">{ch.problem}</span>
                        </div>
                        <div className="flex items-start gap-2 ml-7">
                          <span className="text-sm leading-relaxed text-emerald-400/80">{ch.solution}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Interview Questions */}
                <CollapsibleSection
                  title="Interview Questions"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>}
                  sectionKey={`${project.id}-questions-${activeTab}`}
                  expanded={expandedSections}
                  onToggle={toggleSection}
                  count={data.questions?.filter((q) => filterContent(q.question + q.answer)).length}
                  defaultOpen
                >
                  <div className="space-y-3">
                    {data.questions
                      ?.filter((q) => filterContent(q.question + q.answer))
                      .map((q, i) => (
                        <QuestionCard key={i} question={q} index={i + 1} />
                      ))}
                  </div>
                </CollapsibleSection>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, sectionKey, expanded, onToggle, children, count, defaultOpen }) {
  const isOpen = expanded[sectionKey] !== undefined ? expanded[sectionKey] : !!defaultOpen;

  return (
    <div className="mb-4 rounded-xl border border-slate-700/50 bg-slate-800/20 overflow-hidden">
      <button
        onClick={() => onToggle(sectionKey)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-800/40"
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-400">{icon}</span>
          <span className="text-sm font-semibold text-white">{title}</span>
          {count !== undefined && (
            <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[10px] text-slate-400">{count}</span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-inner">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
