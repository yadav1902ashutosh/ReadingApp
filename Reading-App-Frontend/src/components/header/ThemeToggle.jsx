import React, { useState, useEffect, useRef } from "react";
import {
  getStoredTheme,
  setThemePreference,
  subscribeToTheme,
} from "../../utils/theme";

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    return subscribeToTheme((newTheme) => {
      setCurrentTheme(newTheme);
    });
  }, []);

  // Close when clicking outside
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
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const options = [
    {
      id: "light",
      label: "Light Theme",
      shortLabel: "Light",
      icon: "light_mode",
      iconColor: "text-amber-700 dark:text-amber-400",
    },
    {
      id: "dark",
      label: "Dark Theme",
      shortLabel: "Dark",
      icon: "dark_mode",
      iconColor: "text-indigo-700 dark:text-indigo-400",
    },
    {
      id: "system",
      label: "System Default",
      shortLabel: "System",
      icon: "brightness_auto",
      iconColor: "text-secondary dark:text-secondary-fixed",
    },
  ];

  const activeOption =
    options.find((opt) => opt.id === currentTheme) || options[2];

  const handleSelect = (themeId) => {
    setThemePreference(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Change UI theme, currently set to ${activeOption.label}`}
        title={`Theme: ${activeOption.label}`}
        className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant cursor-pointer text-on-surface-variant hover:text-primary transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-primary/60 outline-none shadow-sm"
      >
        <span
          className={`material-symbols-outlined text-[18px] sm:text-[20px] transition-transform duration-200 ${activeOption.iconColor}`}
        >
          {activeOption.icon}
        </span>
      </button>

      {/* Theme Selection Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-[#fdf9f0] dark:bg-surface-container rounded-xl border border-[#E2D8B8] dark:border-outline-variant shadow-xl z-50 overflow-hidden py-1.5"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1 text-[10px] font-label font-bold uppercase tracking-wider text-outline border-b border-[#E2D8B8]/60 dark:border-outline-variant/40 mb-1">
            Display Theme
          </div>

          {options.map((opt) => {
            const isSelected = currentTheme === opt.id;
            return (
              <button
                key={opt.id}
                role="menuitem"
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left font-label text-xs transition-colors ${
                  isSelected
                    ? "bg-surface-container-high dark:bg-surface-container-highest text-primary dark:text-primary-fixed font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container/60 dark:hover:bg-surface-container-high/60 hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[17px] ${opt.iconColor}`}
                  >
                    {opt.icon}
                  </span>
                  <span className="truncate">{opt.label}</span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-primary dark:text-primary-fixed shrink-0">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
