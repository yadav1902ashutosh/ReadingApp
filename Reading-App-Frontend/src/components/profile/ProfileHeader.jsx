import React from "react";
import { useSelector } from "react-redux";

export default function ProfileHeader({ onInscribeEntry, onLedgerClick }) {
  const userData = useSelector((state) => state.auth.userData);

  // Fallbacks for display
  const fullName = userData?.fullName || "Boot Reader One";
  const username = userData?.username || "boot_reader_one";
  const avatarInitial = (username.trim()[0] || "B").toUpperCase();
  const avatarUrl = userData?.avatar;
  const bio = userData?.bio || "In parchment we trust, in stories we linger.";
  const role = userData?.role ? `${userData.role.toUpperCase()} • TIER IV` : "MASTER SCRIBE • TIER IV";

  // Calculate Anno Domini year
  const memberSinceYear = userData?.createdAt
    ? new Date(userData.createdAt).getFullYear()
    : 2024;

  return (
    <div className="relative overflow-hidden bg-surface-container-low dark:bg-surface-container rounded-xl shadow-[0_4px_20px_-4px_rgba(68,64,60,0.08)] p-4 sm:p-6 md:p-8 mb-6 border border-[#E2D8B8]/70 dark:border-outline-variant/30">
      {/* Ambient background glows */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-secondary-fixed/30 dark:bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-primary-fixed/20 dark:bg-primary/10 blur-2xl pointer-events-none" />

      {/* Top Section: Avatar, Identity, and Action Buttons */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          {/* Avatar with Tier IV Emblem Badge */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-surface-container-high dark:bg-surface-container-highest shadow-[0_2px_10px_rgba(41,37,36,0.12)] relative ring-1 ring-[#D5C79E] dark:ring-outline-variant">
              {avatarUrl ? (
                <img
                  alt={fullName}
                  className="w-full h-full object-cover rounded-full"
                  src={avatarUrl}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-3xl sm:text-4xl flex items-center justify-center select-none shadow-inner tracking-wider">
                  {avatarInitial}
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/20 via-transparent to-primary/10 pointer-events-none" />
            </div>

            {/* Scriptorium Tier Badge */}
            <div className="absolute -bottom-2 -right-1 bg-primary text-on-primary font-label text-xs tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-primary-fixed-dim/30">
              <span className="material-symbols-outlined text-xs">workspace_premium</span>
              <span>IV</span>
            </div>
          </div>

          {/* Scribe Details */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label text-xs uppercase tracking-widest text-secondary font-semibold bg-secondary-fixed/50 dark:bg-secondary-fixed/20 px-2 py-0.5 rounded">
                {role}
              </span>
              <span className="font-label text-xs text-outline tracking-wider">
                Anno Domini {memberSinceYear}
              </span>
              <span className="font-label text-xs text-on-surface-variant/70">
                @{username}
              </span>
            </div>

            <h1 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-primary-fixed mt-1 mb-0.5 truncate">
              {fullName}
            </h1>

            <p className="font-body text-sm sm:text-base italic text-on-surface-variant flex items-center gap-1.5 flex-wrap">
              <span className="text-secondary select-none font-headline text-lg leading-none">“</span>
              {bio}
              <span className="text-secondary select-none font-headline text-lg leading-none">”</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-stretch sm:self-auto justify-end shrink-0">
          <button
            onClick={onLedgerClick}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-surface-container dark:bg-surface-container-high px-4 py-2 rounded text-on-surface font-label text-xs font-semibold uppercase tracking-wider hover:bg-surface-container-high dark:hover:bg-surface-container-highest shadow-sm transition-all border border-[#E2D8B8]/80 dark:border-outline-variant/50"
          >
            <span className="material-symbols-outlined text-sm text-secondary">history_edu</span>
            <span>Ledger Excerpt</span>
          </button>
          <button
            onClick={onInscribeEntry}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-primary text-on-primary px-4 py-2 rounded font-label text-xs font-semibold uppercase tracking-wider hover:bg-primary-container shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>Inscribe Entry</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid (4 Stats) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
        {/* Metric 1: Volumes Bound */}
        <div className="bg-surface-container dark:bg-surface-container-high rounded-lg p-3 sm:p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded bg-tertiary-fixed/60 dark:bg-tertiary-container/50 flex items-center justify-center text-tertiary dark:text-tertiary-fixed shrink-0">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <div className="min-w-0">
            <div className="font-headline text-lg sm:text-xl text-on-surface font-bold leading-tight truncate">
              148
            </div>
            <div className="font-label text-[10px] text-outline uppercase tracking-wider truncate">
              Volumes Bound
            </div>
          </div>
        </div>

        {/* Metric 2: Transcribed Chapters */}
        <div className="bg-surface-container dark:bg-surface-container-high rounded-lg p-3 sm:p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded bg-primary-fixed/70 dark:bg-primary-container/50 flex items-center justify-center text-primary dark:text-primary-fixed shrink-0">
            <span className="material-symbols-outlined text-xl">ink_pen</span>
          </div>
          <div className="min-w-0">
            <div className="font-headline text-lg sm:text-xl text-on-surface font-bold leading-tight truncate">
              1,894
            </div>
            <div className="font-label text-[10px] text-outline uppercase tracking-wider truncate">
              Transcribed
            </div>
          </div>
        </div>

        {/* Metric 3: Florin Tips */}
        <div className="bg-surface-container dark:bg-surface-container-high rounded-lg p-3 sm:p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded bg-secondary-fixed/80 dark:bg-secondary-container/50 flex items-center justify-center text-secondary dark:text-secondary-fixed shrink-0">
            <span className="material-symbols-outlined text-xl">toll</span>
          </div>
          <div className="min-w-0">
            <div className="font-headline text-lg sm:text-xl text-on-surface font-bold leading-tight truncate">
              340
            </div>
            <div className="font-label text-[10px] text-outline uppercase tracking-wider truncate">
              Florin Tips
            </div>
          </div>
        </div>

        {/* Metric 4: Reading Vigil Streak */}
        <div className="bg-surface-container dark:bg-surface-container-high rounded-lg p-3 sm:p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded bg-tertiary-fixed-dim/60 dark:bg-tertiary-container/50 flex items-center justify-center text-on-secondary-container dark:text-tertiary-fixed shrink-0">
            <span className="material-symbols-outlined text-xl">local_fire_department</span>
          </div>
          <div className="min-w-0">
            <div className="font-headline text-lg sm:text-xl text-on-surface font-bold leading-tight truncate">
              42 Days
            </div>
            <div className="font-label text-[10px] text-outline uppercase tracking-wider truncate">
              Reading Vigil
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}