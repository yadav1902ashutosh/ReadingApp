import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FEATURED_BOOKS } from "../data/mockBooks";

export default function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [activeBookModal, setActiveBookModal] = useState(null);

  const genres = [
    "All",
    "Xianxia & Cultivation",
    "High Fantasy",
    "Steampunk Scriptorium",
    "Gothic Mystery",
    "Wuxia & Martial",
    "LitRPG & Progression",
    "Romance & Drama",
  ];

  const statuses = ["All", "Ongoing", "Completed"];

  // Filter & sort the books catalog
  const filteredBooks = useMemo(() => {
    return FEATURED_BOOKS.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGenre =
        selectedGenre === "All" || book.category === selectedGenre;

      const matchesStatus =
        selectedStatus === "All" || book.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesGenre && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return parseFloat(b.readers) - parseFloat(a.readers);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "chapters") {
        return b.chapters - a.chapters;
      }
      return 0;
    });
  }, [searchQuery, selectedGenre, selectedStatus, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedGenre !== "All" || selectedStatus !== "All";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedStatus("All");
    setSortBy("popular");
    setSearchParams({});
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8B8] dark:border-outline-variant pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-label text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">local_library</span>
              Complete Library Catalog
            </div>
            <h1 className="font-headline font-bold text-2xl sm:text-4xl text-on-surface tracking-tight">
              Explore All Stories &amp; Web Novels
            </h1>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
              Browse our full collection of serialized novels, translations, and original fanfiction. Filter by genre, status, or search for titles.
            </p>
          </div>

          <div className="font-label text-xs sm:text-sm text-on-surface-variant shrink-0">
            Showing <span className="font-bold text-on-surface">{filteredBooks.length}</span> of {FEATURED_BOOKS.length} stories
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant p-4 sm:p-5 mb-8 shadow-sm space-y-4">
        {/* Top Row: Search & Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-6 flex items-center bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-xl px-3 py-2 gap-2 text-on-surface-variant focus-within:border-primary-container shadow-inner">
            <span className="material-symbols-outlined text-[19px] text-primary">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or keyword..."
              className="bg-transparent border-none outline-none font-body text-xs sm:text-sm w-full text-on-surface placeholder:text-on-surface-variant/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-on-surface-variant hover:text-on-surface text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant font-label text-xs sm:text-sm text-on-surface outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Ongoing">Ongoing Only</option>
              <option value="Completed">Completed Only</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant font-label text-xs sm:text-sm text-on-surface outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="chapters">Most Chapters</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="font-label text-xs font-semibold text-on-surface-variant mr-1 shrink-0">
            Genre:
          </span>
          {genres.map((g) => {
            const isActive = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => {
                  setSelectedGenre(g);
                  if (g === "All") {
                    setSearchParams({});
                  } else {
                    setSearchParams({ genre: g });
                  }
                }}
                className={`px-3 py-1.5 rounded-full font-label text-xs whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border border-[#E2D8B8]/80 dark:border-outline-variant hover:text-on-surface"
                }`}
              >
                {g}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto text-primary dark:text-primary-fixed hover:underline font-label text-xs font-semibold flex items-center gap-1 shrink-0 pl-2"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-[#FDFBF7] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant overflow-hidden hover:border-primary/60 dark:hover:border-primary/60 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="p-4">
                {/* Cover & Badges */}
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden mb-3 bg-surface-container-high border border-[#E2D8B8]/60 dark:border-outline-variant/60">
                  <img
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {book.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary/95 text-[10px] font-label font-bold text-on-primary uppercase tracking-wider shadow-sm">
                      {book.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-surface/90 dark:bg-surface-container/90 text-[10px] font-label font-semibold text-on-surface shadow-sm backdrop-blur-xs">
                    {book.status}
                  </span>
                </div>

                {/* Genre & Meta */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-label text-[11px] font-semibold text-secondary uppercase tracking-wider truncate">
                    {book.category}
                  </span>
                  <span className="flex items-center gap-0.5 font-label text-xs font-bold text-amber-700 dark:text-amber-400 shrink-0">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    {book.rating}
                  </span>
                </div>

                {/* Title & Author */}
                <h3
                  onClick={() => setActiveBookModal(book)}
                  className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                  title={book.title}
                >
                  {book.title}
                </h3>
                <p className="font-label text-xs text-on-surface-variant mt-0.5 mb-2">
                  by <span className="font-medium text-on-surface">{book.author}</span>
                </p>

                {/* Synopsis */}
                <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                  {book.synopsis}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {book.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-surface-container-high font-label text-[10px] text-on-surface-variant"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="font-label text-[11px] text-on-surface-variant/70 ml-auto">
                    {book.chapters} Chs
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-2.5 bg-surface-container-low/60 dark:bg-surface-container-high/40 border-t border-[#E2D8B8]/60 dark:border-outline-variant/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    alert(`Added "${book.title}" to your Bookmarks`);
                  }}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                  title="Bookmark Story"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                </button>
                <button
                  onClick={() => setActiveBookModal(book)}
                  className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold transition-colors shadow-sm"
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#FDFBF7] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
            menu_book
          </span>
          <h3 className="font-headline font-bold text-lg text-on-surface">No stories found</h3>
          <p className="font-body text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
            No titles match your current filter criteria. Try choosing a different genre or clearing your search.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold tracking-wide uppercase shadow-sm"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Book Detail Modal */}
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
