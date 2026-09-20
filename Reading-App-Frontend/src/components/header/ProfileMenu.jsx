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

  const displayName = userData?.fullName || userData?.username || "Boot Reader One";
  const username = userData?.username || "boot_reader_one";
  const email = userData?.email || "boot_reader_one@deckle.library";
  const avatarInitial = (username.trim()[0] || "B").toUpperCase();

  const menuItems = [
    {
      icon: "menu_book",
      iconColor: "text-primary",
      label: "Inscribed Stacks & Folios",
      badge: "3 Active",
      to: "/home",
    },
    {
      icon: "draw",
      iconColor: "text-secondary",
      label: "Scriptorium Marginalia",
      badge: "48 Notes",
      to: "/home",
    },
    {
      icon: "account_balance_wallet",
      iconColor: "text-tertiary",
      label: "Treasury & Florin Coffers",
      badge: "140 🪙",
      badgeStyle: "font-label-sm text-[11px] font-semibold text-secondary",
      to: "/home",
    },
    {
      icon: "tune",
      iconColor: "text-on-surface-variant",
      label: "Scribe Preferences & Font",
      chevron: true,
      to: "/home",
    },
  ];

  return (
    <div className="relative pl-1 border-l border-[#E2D8B8]/80 dark:border-outline-variant/80 shrink-0" ref={menuRef}>
      {/* Avatar Trigger Button */}
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 p-0.5 rounded-full hover:bg-surface-container transition-all outline-none ${
          isOpen
            ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-background"
            : "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-sm flex items-center justify-center shadow-sm ring-1 ring-[#D5C79E] dark:ring-outline-variant select-none tracking-wider">
            {avatarInitial}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-surface-container-lowest" />
        </div>
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
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#fdf9f0] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant shadow-2xl z-50 overflow-hidden">
          {/* Decorative Gold-to-Primary Gradient Top Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#D5C79E] via-primary to-[#D5C79E]" />

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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-base flex items-center justify-center shadow-md ring-2 ring-primary/30 select-none tracking-wider">
                  {avatarInitial}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-[#fdf9f0]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-headline-sm text-[16px] text-on-surface font-bold truncate group-hover:text-primary transition-colors">
                    {displayName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-[10px] font-bold uppercase tracking-wider">
                    Tier IV
                  </span>
                </div>
                <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
                  {email}
                </span>
                <span className="font-label-sm text-[11px] text-primary font-semibold mt-1 group-hover:underline flex items-center gap-0.5">
                  View Personal Study & Codex
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
              <span>Log Out & Seal Scriptorium</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
