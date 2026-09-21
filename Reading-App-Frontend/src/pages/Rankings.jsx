import React, { useState } from "react";
import { FEATURED_BOOKS } from "../data/mockBooks";

export default function Rankings() {
  const [activeTab, setActiveTab] = useState("all-time");
  const [activeBookModal, setActiveBookModal] = useState(null);

  // Sort books by rating or reader count
  const rankedBooks = [...FEATURED_BOOKS].sort((a, b) => {
    if (activeTab === "top-rated") {
      return b.rating - a.rating;
    }
    if (activeTab === "rising") {
      return b.chapters - a.chapters;
    }
    // all-time / popularity
    return parseFloat(b.readers) - parseFloat(a.readers);
  });

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-amber-700 dark:text-amber-400 font-label text-xs font-semibold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-sm">workspace_premium</span>
          Site Leaderboards
        </div>
        <h1 className="font-headline font-bold text-2xl sm:text-4xl text-on-surface tracking-tight">
          Top Story Rankings
        </h1>
        <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
          The most acclaimed, read, and discussed serial novels on Deckle, ranked by active readers and ratings.
        </p>
      </div>

      {/* Leaderboard Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2D8B8] dark:border-outline-variant pb-4 mb-8">
        <button
          onClick={() => setActiveTab("all-time")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "all-time"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Most Popular
        </button>
        <button
          onClick={() => setActiveTab("top-rated")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "top-rated"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Highest Rated
        </button>
        <button
          onClick={() => setActiveTab("rising")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "rising"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Fastest Rising
        </button>
      </div>

      {/* Rankings List */}
      <div className="space-y-4">
        {rankedBooks.map((book, index) => {
          const rank = index + 1;
          return (
            <div
              key={book.id}
              className="bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-4 sm:p-5 flex items-center gap-4 sm:gap-6 hover:shadow-md hover:border-primary/60 transition-all group"
            >
              {/* Rank Position Badge */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-headline font-bold text-base sm:text-lg shrink-0 shadow-sm ${
                  rank === 1
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                    : rank === 2
                    ? "bg-gradient-to-br from-stone-300 to-stone-500 text-white"
                    : rank === 3
                    ? "bg-gradient-to-br from-amber-700 to-amber-900 text-white"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                #{rank}
              </div>

              {/* Book Cover */}
              <img
                src={book.cover}
                alt={book.title}
                loading="lazy"
                className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-lg shadow-sm shrink-0 border border-[#E2D8B8]/60 group-hover:scale-105 transition-transform"
              />

              {/* Story Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-label text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider">
                    {book.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high font-label text-[10px] text-on-surface-variant">
                    {book.status}
                  </span>
                </div>

                <h3
                  onClick={() => setActiveBookModal(book)}
                  className="font-headline font-bold text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors cursor-pointer truncate"
                >
                  {book.title}
                </h3>
                <p className="font-label text-xs text-on-surface-variant mt-0.5">
                  by <span className="font-medium text-on-surface">{book.author}</span>
                </p>

                <p className="font-body text-xs text-on-surface-variant/90 line-clamp-1 mt-1 hidden sm:block">
                  {book.synopsis}
                </p>

                {/* Rating & Stats */}
                <div className="flex items-center gap-3 sm:gap-4 mt-2 font-label text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    {book.rating}
                  </span>
                  <span>•</span>
                  <span>{book.readers} active readers</span>
                  <span>•</span>
                  <span>{book.chapters} Chapters</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveBookModal(book)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold transition-colors shadow-sm"
                >
                  Read
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail */}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
