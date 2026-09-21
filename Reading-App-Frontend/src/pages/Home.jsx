import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FEATURED_BOOKS, RECENT_UPDATES, TOP_RANKINGS } from "../data/mockBooks";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBookModal, setActiveBookModal] = useState(null);

  const categories = [
    "All",
    "Xianxia & Cultivation",
    "High Fantasy",
    "Steampunk Scriptorium",
    "Gothic Mystery",
    "Wuxia & Martial",
  ];

  const filteredBooks =
    selectedCategory === "All"
      ? FEATURED_BOOKS
      : FEATURED_BOOKS.filter((b) => b.category === selectedCategory);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* --- HERO / WELCOME SECTION --- */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5EEDB] via-[#FDF9F0] to-[#EFE7D2] dark:from-surface-container-high dark:via-surface-container dark:to-surface-container-low border border-[#E2D8B8] dark:border-outline-variant p-6 sm:p-10 mb-10 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-label text-xs font-semibold tracking-wide uppercase mb-3">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            Featured Library
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-4xl text-on-surface tracking-tight leading-tight">
            Discover endless web novels, fanfiction, and stories.
          </h1>
          <p className="font-body text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            Read popular web fiction, original novels, and fanfiction. Bookmark your favorite stories, track your reading progress, and enjoy clean reading.
          </p>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-6 pt-4 border-t border-[#E2D8B8]/80 dark:border-outline-variant/60 font-label text-xs sm:text-sm text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-on-surface">1,420+</span> Stories Available
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-on-surface">38.4k</span> Active Readers
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-on-surface">Hourly</span> Chapter Updates
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORY SELECTOR PILLS --- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-label text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-[#E2D8B8] dark:border-outline-variant hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* --- MAIN CONTENT 2-COLUMN LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Featured & Popular Stories Grid (8 cols on large) */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
                  Popular Stories
                </h2>
              </div>
              <span className="font-label text-xs text-on-surface-variant font-medium">
                Showing {filteredBooks.length} stories
              </span>
            </div>

            {/* Grid of Book Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group bg-[#FDFBF7] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant overflow-hidden hover:border-primary/60 dark:hover:border-primary/60 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="p-4 flex gap-4">
                    {/* Book Cover Image */}
                    <div className="relative w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-sm bg-surface-container-high border border-[#E2D8B8]/60 dark:border-outline-variant/60">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {book.badge && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary/90 text-[9px] font-label font-bold text-on-primary uppercase tracking-wider backdrop-blur-xs">
                          {book.badge}
                        </span>
                      )}
                    </div>

                    {/* Book Details Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-label text-[11px] font-semibold text-secondary uppercase tracking-wider truncate">
                        {book.category}
                      </span>
                      <h3
                        onClick={() => setActiveBookModal(book)}
                        className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors cursor-pointer line-clamp-1 mt-0.5"
                        title={book.title}
                      >
                        {book.title}
                      </h3>
                      <p className="font-label text-xs text-on-surface-variant mt-0.5">
                        by <span className="font-medium">{book.author}</span>
                      </p>

                      {/* Rating & Chapters Meta */}
                      <div className="flex items-center gap-3 mt-2 font-label text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          {book.rating}
                        </span>
                        <span>•</span>
                        <span>{book.chapters} Chs</span>
                        <span>•</span>
                        <span>{book.readers} reads</span>
                      </div>

                      {/* Brief Synopsis Excerpt */}
                      <p className="font-body text-xs text-on-surface-variant/90 line-clamp-2 mt-2 leading-relaxed">
                        {book.synopsis}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="px-4 py-2.5 bg-surface-container-low/50 dark:bg-surface-container-high/40 border-t border-[#E2D8B8]/60 dark:border-outline-variant/60 flex items-center justify-between gap-2 text-xs font-label">
                    <span className="text-on-surface-variant truncate text-[11px]" title={book.latestChapter}>
                      {book.latestChapter}
                    </span>
                    <button
                      onClick={() => setActiveBookModal(book)}
                      className="px-2.5 py-1 rounded bg-primary hover:bg-primary-container text-on-primary font-semibold shrink-0 transition-colors"
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RECENT CHAPTER UPDATES TABLE --- */}
          <div className="bg-[#FDFBF7] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">history_edu</span>
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  Latest Chapter Updates
                </h3>
              </div>
              <span className="font-label text-xs text-on-surface-variant">Live updates</span>
            </div>

            <div className="divide-y divide-[#E2D8B8]/60 dark:divide-outline-variant/60">
              {RECENT_UPDATES.map((update, idx) => (
                <div
                  key={idx}
                  className="py-2.5 flex items-center justify-between gap-2 hover:bg-surface-container-low/40 transition-colors rounded px-2 -mx-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-high font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0">
                      [{update.category}]
                    </span>
                    <span className="font-headline font-semibold text-sm text-on-surface truncate hover:text-primary cursor-pointer">
                      {update.title}
                    </span>
                    <span className="text-on-surface-variant text-xs truncate hidden md:inline">
                      {update.latestChapter}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-label text-xs text-on-surface-variant">
                    <span className="hidden sm:inline">{update.author}</span>
                    <span className="text-primary font-medium">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Top Rankings & Quick Rewards (4 cols on large) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Rankings Card */}
          <div className="bg-[#FDFBF7] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2D8B8]/60 dark:border-outline-variant/60">
              <span className="material-symbols-outlined text-amber-600 text-xl">workspace_premium</span>
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Top Rankings
              </h3>
            </div>

            <div className="space-y-3">
              {TOP_RANKINGS.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-high/50 transition-colors group cursor-pointer"
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-label text-xs font-bold shrink-0 ${
                      item.rank === 1
                        ? "bg-amber-500 text-white"
                        : item.rank === 2
                        ? "bg-stone-400 text-white"
                        : item.rank === 3
                        ? "bg-amber-700 text-white"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {item.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h4>
                    <span className="font-label text-xs text-on-surface-variant">
                      {item.readers} readers
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-sm text-emerald-600">
                    {item.trend === "up" ? "trending_up" : item.trend === "down" ? "trending_down" : "drag_handle"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Rewards Card */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-xl">campaign</span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Reading Rewards
              </h3>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
              Read chapters daily to keep up your reading streak and earn 50 bonus coins every week!
            </p>
            <div className="p-3 rounded-lg bg-surface-container dark:bg-surface-container-high border border-[#E2D8B8]/60 dark:border-outline-variant/60 flex items-center justify-between font-label text-xs">
              <span className="font-medium text-on-surface">Weekly Reading Bonus</span>
              <span className="font-bold text-secondary">+50 🪙</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK READ / FOLIO DETAIL MODAL --- */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant max-w-lg w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in duration-200">
            <button
              onClick={() => setActiveBookModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex gap-4 mb-4">
              <img
                src={activeBookModal.cover}
                alt={activeBookModal.title}
                className="w-24 h-36 object-cover rounded-lg shadow-md shrink-0 border border-[#E2D8B8]"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label text-xs font-semibold text-secondary uppercase tracking-wider">
                  {activeBookModal.category}
                </span>
                <h3 className="font-headline font-bold text-lg text-on-surface mt-0.5">
                  {activeBookModal.title}
                </h3>
                <p className="font-label text-xs text-on-surface-variant mt-1">
                  by <span className="font-semibold">{activeBookModal.author}</span>
                </p>
                <div className="flex items-center gap-2 mt-2 font-label text-xs text-on-surface-variant">
                  <span className="text-amber-600 font-bold">★ {activeBookModal.rating}</span>
                  <span>•</span>
                  <span>{activeBookModal.chapters} chapters</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium">{activeBookModal.status}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E2D8B8]/60 dark:border-outline-variant/60 pt-3 mb-4">
              <h4 className="font-label font-bold text-xs uppercase tracking-wider text-outline mb-1">
                Story Synopsis
              </h4>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {activeBookModal.synopsis}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-5">
              {activeBookModal.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-surface-container-high font-label text-[11px] text-on-surface-variant"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert(`Opening chapter reader for: ${activeBookModal.title}`);
                  setActiveBookModal(null);
                }}
                className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors shadow-sm text-center"
              >
                Start Reading ({activeBookModal.latestChapter})
              </button>
              <button
                onClick={() => {
                  alert(`Added "${activeBookModal.title}" to your Bookmarks`);
                  setActiveBookModal(null);
                }}
                className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface border border-[#E2D8B8] dark:border-outline-variant font-label text-xs font-semibold transition-colors"
                title="Bookmark Story"
              >
                Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
