import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Write() {
  const authStatus = useSelector((state) => state.auth.status);
  const [activeTab, setActiveTab] = useState("new");

  // Local draft form state
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [tags, setTags] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Mock list of author's existing stories
  const mockStories = [
    {
      id: "draft-1",
      title: "Shadows Over Aethelgard",
      genre: "Fantasy / Progression",
      chapters: 12,
      words: "38,400",
      status: "Published",
      updatedAt: "2 days ago",
    },
    {
      id: "draft-2",
      title: "The Alchemist's Coffee Shop",
      genre: "Slice of Life",
      chapters: 4,
      words: "10,200",
      status: "Draft",
      updatedAt: "Yesterday",
    },
  ];

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      {/* Studio Banner */}
      <div className="mb-8 border-b border-[#E2D8B8] dark:border-outline-variant pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-label text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">edit_square</span>
              Writer Studio
            </div>
            <h1 className="font-headline font-bold text-2xl sm:text-4xl text-on-surface tracking-tight">
              Create &amp; Publish Stories
            </h1>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
              Share your original web novels, fanfictions, and episodic serials with passionate readers worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-xl font-label text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === "new"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface border border-[#E2D8B8] dark:border-outline-variant"
              }`}
            >
              <span className="material-symbols-outlined text-base">add_box</span>
              <span>New Story</span>
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`px-4 py-2 rounded-xl font-label text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === "manage"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface border border-[#E2D8B8] dark:border-outline-variant"
              }`}
            >
              <span className="material-symbols-outlined text-base">auto_stories</span>
              <span>My Stories ({mockStories.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guest Warning if not logged in */}
      {!authStatus && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">info</span>
            <span className="text-xs sm:text-sm font-medium">
              You are currently viewing as a guest. Log in to permanently publish stories and sync chapters across devices.
            </span>
          </div>
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-label text-xs font-semibold shrink-0 text-center"
          >
            Log In Now
          </Link>
        </div>
      )}

      {/* Main Studio Content */}
      {activeTab === "new" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Details Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSaveDraft} className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-6 shadow-sm space-y-6">
              <div>
                <label className="block font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Mage Who Transcended Dimensions"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant font-headline text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                    Primary Genre
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant font-body text-xs sm:text-sm text-on-surface focus:border-primary focus:outline-none"
                  >
                    <option value="Fantasy">Fantasy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Romance">Romance</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Progression">Progression / LitRPG</option>
                    <option value="Slice of Life">Slice of Life</option>
                    <option value="Fanfiction">Fanfiction</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Magic, Reincarnation, Academy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant font-body text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                  Synopsis / Blurb *
                </label>
                <textarea
                  rows={6}
                  required
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Hook your readers with a compelling hook or summary..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant font-body text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2D8B8]/60 dark:border-outline-variant/40">
                <span className="text-xs text-on-surface-variant">
                  {isSaved ? "✅ Draft saved locally" : "Autosave enabled"}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant text-on-surface font-label text-xs font-semibold transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Creating story and launching Chapter 1 editor...")}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>Create &amp; Add Chapter 1</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Guidelines & Quick Tips Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface-container-low dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
                <h3 className="font-headline font-bold text-sm text-on-surface">Author Tips</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Hook readers early:</strong> Keep your synopsis under 200 words focusing on the protagonist's central conflict.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Consistent releases:</strong> Stories updating 2–3 times a week gain up to 4× more bookshelf adds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Tag accurately:</strong> Genres and sub-genres help your fiction surface on Deckle's Browse catalog.</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-5 shadow-sm text-center">
              <span className="material-symbols-outlined text-3xl text-secondary mb-2">monetization_on</span>
              <h3 className="font-headline font-bold text-sm text-on-surface mb-1">Author Monetization</h3>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Eligible stories can enable coin-unlocked advanced chapters and direct reader tips.
              </p>
              <button
                onClick={() => alert("Monetization guidelines are coming in the next release!")}
                className="w-full py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant font-label text-xs font-semibold text-on-surface transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* My Stories List */
        <div className="space-y-4">
          {mockStories.map((story) => (
            <div
              key={story.id}
              className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                    {story.status}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {story.genre}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface">
                  {story.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant mt-2">
                  <span>📖 {story.chapters} Chapters</span>
                  <span>✍ {story.words} Words</span>
                  <span>🕒 Updated {story.updatedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => alert(`Opening chapter manager for ${story.title}`)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
                >
                  Manage Chapters
                </button>
                <button
                  onClick={() => alert(`Editing details for ${story.title}`)}
                  className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant text-on-surface transition-colors"
                  title="Edit details"
                >
                  <span className="material-symbols-outlined text-base">settings</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
