import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MobileNav() {
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);

  const navTabs = [
    {
      id: "home",
      label: "Home",
      icon: "home",
      to: "/home",
      isActive: location.pathname === "/" || location.pathname === "/home",
    },
    {
      id: "browse",
      label: "Browse",
      icon: "explore",
      to: "/browse",
      isActive: location.pathname === "/browse" || location.pathname === "/library",
    },
    {
      id: "rankings",
      label: "Rankings",
      icon: "workspace_premium",
      to: "/rankings",
      isActive: location.pathname === "/rankings",
    },
    {
      id: "bookshelf",
      label: "Bookshelf",
      icon: "shelves",
      to: "/bookshelf",
      isActive: location.pathname === "/bookshelf",
    },
    {
      id: "profile",
      label: authStatus ? "Profile" : "Account",
      icon: "account_circle",
      to: authStatus ? "/profile" : "/login",
      isActive: location.pathname === "/profile" || location.pathname === "/login" || location.pathname === "/signup",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF7EE]/95 dark:bg-[#1c1c17]/95 backdrop-blur-lg border-t border-[#E2D8B8] dark:border-[#59413e] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navTabs.map((tab) => {
          return (
            <Link
              key={tab.id}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors group relative ${
                tab.isActive
                  ? "text-primary dark:text-primary-fixed font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {/* Active Indicator Pip */}
              {tab.isActive && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-primary dark:bg-primary-fixed" />
              )}
              <span
                className={`material-symbols-outlined text-[22px] transition-transform group-active:scale-95 ${
                  tab.isActive ? "scale-110" : ""
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-label text-[10px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
