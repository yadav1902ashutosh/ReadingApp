// Theme utility supporting 'light', 'dark', and 'system'

const THEME_KEY = "theme";
const listeners = new Set();

export function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || "system";
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    // system
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
}

export function setThemePreference(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  listeners.forEach((listener) => listener(theme));
}

export function subscribeToTheme(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Global media query listener for system theme changes
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (getStoredTheme() === "system") {
      applyTheme("system");
    }
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleSystemChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleSystemChange);
  }
}
