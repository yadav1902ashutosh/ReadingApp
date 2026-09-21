import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FEATURED_BOOKS } from "../data/mockBooks";

export default function Bookshelf() {
  const authStatus = useSelector((state) => state.auth.status);
  const [activeTab, setActiveTab] = useState("reading");

  // Sample mock bookshelf data
  const mockShelfBooks = [
    {
      ...FEATURED_BOOKS[0],
      currentChapter: "Ch. 42: Gathering of the Azure Scribes",
      progressPercent: 10,
      lastRead: "2 hours ago",
      shelfCategory: "reading",
    },
    {
      ...FEATURED_BOOKS[1],
      currentChapter: "Ch. 115: The Obsidian Gate",
      progressPercent: 40,
      lastRead: "Yesterday",
      shelfCategory: "reading",
    },
    {
      ...FEATURED_BOOKS[3],
      currentChapter: "Ch. 520: Epilogue",
      progressPercent: 100,
      lastRead: "3 days ago",
      shelfCategory: "finished",
    },
    {
      ...FEATURED_BOOKS[6],
      currentChapter: "Not started",
      progressPercent: 0,
      lastRead: "Added yesterday",
      shelfCategory: "saved",
    },
  ];

  const filteredBooks = mockShelfBooks.filter((book) => {
    if (activeTab === "all") return true;
    return book.shelfCategory === activeTab;
  });

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8B8] dark:border-outline-variant pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-label text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">shelves</span>
              Personal Collection
            </div>
            <h1 className="font-headline font-bold text-2xl sm:text-4xl text-on-surface tracking-tight">
              My Bookshelf
            </h1>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
              Your personal library of currently reading stories, saved bookmarks, and finished novels.
            </p>
          </div>

          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold tracking-wide uppercase transition-colors shadow-sm shrink-0 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Browse More Stories
          </Link>
        </div>
      </div>

      {/* Guest Notice (if not logged in) */}
      {!authStatus && (
        <div className="mb-8 p-4 rounded-2xl bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">sync</span>
            <div>
              <p className="font-headline font-bold text-sm text-on-surface">
                Sync your Bookshelf across all your devices
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                Log in or sign up to ensure your bookmarks and reading progress are permanently preserved.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label text-xs font-semibold border border-[#E2D8B8]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Shelf Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2D8B8] dark:border-outline-variant pb-4 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("reading")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "reading"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Currently Reading (2)
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "saved"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Bookmarks for Later (1)
        </button>
        <button
          onClick={() => setActiveTab("finished")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "finished"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Finished (1)
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "all"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All (4)
        </button>
      </div>

      {/* Bookshelf Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant overflow-hidden hover:shadow-md hover:border-primary/60 transition-all flex flex-col justify-between group"
            >
              <div className="p-4">
                {/* Book Cover with Progress Overlay */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 bg-surface-container-high border border-[#E2D8B8]/60">
                  <img
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white font-label text-[10px] font-semibold backdrop-blur-xs">
                    {book.progressPercent}% Read
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${book.progressPercent}%` }}
                  />
                </div>

                {/* Details */}
                <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
                  {book.category}
                </span>
                <h3
                  className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors cursor-pointer truncate"
                  title={book.title}
                >
                  {book.title}
                </h3>
                <p className="font-label text-xs text-on-surface-variant mt-0.5 mb-2">
                  by <span className="font-medium text-on-surface">{book.author}</span>
                </p>

                {/* Current Bookmark Status */}
                <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high/50 border border-[#E2D8B8]/60 dark:border-outline-variant/40 text-xs font-label space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>Progress</span>
                    <span className="font-semibold text-primary">{book.lastRead}</span>
                  </div>
                  <p className="text-on-surface font-medium truncate text-[11px]">
                    {book.currentChapter}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-surface-container-low/50 dark:bg-surface-container-high/40 border-t border-[#E2D8B8]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => alert(`Removed "${book.title}" from your Bookshelf`)}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-surface-container transition-colors"
                  title="Remove from Bookshelf"
                >
                  <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                </button>
                <button
                  onClick={() => alert(`Continuing reading: ${book.title} at ${book.currentChapter}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold transition-colors shadow-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  <span>Continue</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
            shelves
          </span>
          <h3 className="font-headline font-bold text-lg text-on-surface">No books on this shelf</h3>
          <p className="font-body text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
            You don't have any stories marked in this section yet.
          </p>
          <Link
            to="/browse"
            className="mt-4 inline-block px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold tracking-wide uppercase shadow-sm"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
