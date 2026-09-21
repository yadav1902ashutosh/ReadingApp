import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout as authLogout } from "../../store/authSlice";
import authService from "../../auth/auth";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(authLogout());
      setIsOpen(false);
      navigate("/login");
    }
  };

  const displayName = userData?.fullName || userData?.username || "Reader";
  const username = userData?.username || "reader";
  const email = userData?.email || "reader@deckle.app";
  const avatarUrl = userData?.avatar;
  const avatarInitial = (username.trim()[0] || "R").toUpperCase();
  const roleDisplay = userData?.role ? userData.role.toUpperCase() : "READER";

  const menuItems = [
    {
      icon: "shelves",
      iconColor: "text-primary",
      label: "Bookshelf (Saved & History)",
      badge: "3 Saved",
      to: "/bookshelf",
    },
    {
      icon: "edit_note",
      iconColor: "text-secondary",
      label: "My Notes & Highlights",
      badge: "48 Notes",
      to: "/profile",
    },
    {
      icon: "account_balance_wallet",
      iconColor: "text-tertiary",
      label: "Coins & Wallet",
      badge: "140 🪙",
      badgeStyle: "font-label-sm text-[11px] font-semibold text-secondary",
      to: "/profile",
    },
    {
      icon: "tune",
      iconColor: "text-on-surface-variant",
      label: "Reading Settings & Font",
      chevron: true,
      to: "/profile",
    },
  ];

  return (
    <div className="relative pl-1 border-l border-[#E2D8B8]/80 dark:border-outline-variant/80 shrink-0" ref={menuRef}>
      {/* Avatar / Guest Trigger Button */}
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 p-0.5 rounded-full hover:bg-surface-container transition-all outline-none ${
          isOpen
            ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-background"
            : "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        title={authStatus ? displayName : "Account Menu"}
      >
        {authStatus ? (
          <div className="relative">
            {avatarUrl ? (
              <img
                alt={displayName}
                src={avatarUrl}
                className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-[#D5C79E] dark:ring-outline-variant"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-sm flex items-center justify-center shadow-sm ring-1 ring-[#D5C79E] dark:ring-outline-variant select-none tracking-wider">
                {avatarInitial}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-surface-container-lowest" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-surface-container dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant flex items-center justify-center text-on-surface-variant shadow-sm hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[19px]">account_circle</span>
          </div>
        )}
        <span
          className={`material-symbols-outlined text-[16px] text-primary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-[20rem] sm:max-w-none bg-[#fdf9f0] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant shadow-2xl z-50 overflow-hidden max-h-[calc(100dvh-5.5rem)] overflow-y-auto">
          {/* Decorative Gold-to-Primary Gradient Top Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#D5C79E] via-primary to-[#D5C79E] sticky top-0 z-10" />

          {authStatus ? (
            /* --- LOGGED-IN SCRIBE CODEX --- */
            <>
              {/* Profile Identity Section */}
              <div
                className="p-space-md border-b border-[#E2D8B8]/70 hover:bg-surface-container-low transition-colors cursor-pointer group"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile");
                }}
              >
                <div className="flex items-start gap-space-sm">
                  <div className="relative flex-shrink-0">
                    {avatarUrl ? (
                      <img
                        alt={displayName}
                        src={avatarUrl}
                        className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-primary/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-base flex items-center justify-center shadow-md ring-2 ring-primary/30 select-none tracking-wider">
                        {avatarInitial}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-[#fdf9f0]" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-headline-sm text-[15px] sm:text-[16px] text-on-surface font-bold truncate group-hover:text-primary transition-colors max-w-[140px] sm:max-w-[170px]">
                        {displayName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-[10px] font-bold uppercase tracking-wider shrink-0">
                        {roleDisplay}
                      </span>
                    </div>
                    <span className="font-body-sm text-[12px] text-on-surface-variant truncate block max-w-full">
                      {email}
                    </span>
                    {userData?.bio && (
                      <p className="font-body text-[11px] italic text-on-surface-variant/80 truncate max-w-full mt-0.5">
                        "{userData.bio}"
                      </p>
                    )}
                    <span className="font-label-sm text-[11px] text-primary font-semibold mt-1 group-hover:underline flex items-center gap-0.5">
                      View Profile & Library
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-1 text-on-surface-variant">
                {menuItems.map((item) => (
                  <Link
                    className="flex items-center justify-between px-space-md py-2 text-label-md font-label-md hover:bg-surface-container hover:text-on-surface transition-colors"
                    to={item.to}
                    key={item.label}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${item.iconColor} text-[18px]`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.chevron ? (
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70">
                        chevron_right
                      </span>
                    ) : (
                      <span
                        className={
                          item.badgeStyle ||
                          "font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold"
                        }
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Logout Action */}
              <div className="p-1.5 border-t border-[#E2D8B8]/80 bg-surface-container-low/50">
                <button
                  className="w-full flex items-center gap-2 px-space-md py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors font-label-md text-label-md font-semibold"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            /* --- LOGGED-OUT GUEST CARD --- */
            <div className="p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-surface-container-highest border border-[#E2D8B8] dark:border-outline-variant flex items-center justify-center text-primary mb-3 shadow-inner">
                <span className="material-symbols-outlined text-2xl">auto_stories</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Welcome, Reader
              </h3>
              <p className="font-body text-xs text-on-surface-variant mt-1 mb-5 leading-relaxed max-w-[240px]">
                Log in or sign up to bookmark your favorite stories, save reading progress, and earn bonus coins.
              </p>

              {/* Actions */}
              <div className="w-full space-y-2.5">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  <span>Log In</span>
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#E2D8B8] dark:border-outline-variant"
                >
                  <span className="material-symbols-outlined text-base text-secondary">person_add</span>
                  <span>Create Account (Sign Up)</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
