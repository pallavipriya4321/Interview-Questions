"use client";

export default function Sidebar({ topics, activeTopic, onTopicClick, onClose, isOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 transform border-r border-slate-700/50 bg-[#1e293b] transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between border-b border-slate-700/50 p-4 lg:hidden">
            <span className="text-sm font-semibold text-white">Topics</span>
            <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Topics list */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Topics
            </div>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  onTopicClick(topic.id);
                  onClose?.();
                }}
                className={`group mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                  activeTopic === topic.id
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                  activeTopic === topic.id
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-slate-700/50 text-slate-500 group-hover:text-slate-400"
                }`}>
                  {topic.icon}
                </span>
                <span className="truncate">{topic.title}</span>
                <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  activeTopic === topic.id
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-slate-700/50 text-slate-500"
                }`}>
                  {topic.questions.length}
                </span>
              </button>
            ))}
          </nav>

          {/* Stats footer */}
          <div className="border-t border-slate-700/50 p-4">
            <div className="text-xs text-slate-500">
              Total: {topics.reduce((sum, t) => sum + t.questions.length, 0)} questions across {topics.length} topics
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
