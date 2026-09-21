import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ProfileMenu from './ProfileMenu'
import ThemeToggle from './ThemeToggle'
import deckleEmblem from '../../assets/deckle-emblem.png'

function Header() {
    const [activeTab, setActiveTab] = useState("Home")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCoinsOpen, setIsCoinsOpen] = useState(false)

    const createRef = useRef(null)
    const searchRef = useRef(null)
    const searchInputRef = useRef(null)
    const coinsRef = useRef(null)

    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    // Close popovers on click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (createRef.current && !createRef.current.contains(e.target)) {
                setIsCreateOpen(false)
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchOpen(false)
            }
            if (coinsRef.current && !coinsRef.current.contains(e.target)) {
                setIsCoinsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close on Escape key
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                setIsDrawerOpen(false)
                setIsCreateOpen(false)
                setIsSearchOpen(false)
                setIsCoinsOpen(false)
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Prevent body scrolling when mobile drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isDrawerOpen])

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isSearchOpen])

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`)
            setIsSearchOpen(false)
        }
    }

    return (
        <>
            <header 
                className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7EE]/95 dark:bg-[#1c1c17]/95 backdrop-blur-md border-b border-[#E2D8B8] dark:border-[#59413e] overflow-visible"
            >
                <div
                    className='relative h-20 w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0'
                >
                    {/* Left Section: YouTube-style Hamburger (on smaller screens) + Brand */}
                    <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink-0 z-10">
                        {/* Hamburger Button: Visible on screens below xl */}
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="xl:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 text-on-surface-variant hover:text-on-surface transition-all shrink-0 cursor-pointer -ml-1 sm:ml-0"
                            aria-label="Open navigation menu"
                            title="Menu"
                        >
                            <span className="material-symbols-outlined text-[24px]">menu</span>
                        </button>

                        {/* Brand Logo & Title: On small screens, ONLY the site image is visible */}
                        <Link to="/" className="flex items-center gap-2 sm:gap-3.5 min-w-0 shrink-0 hover:opacity-90 transition-opacity">
                            <img 
                                alt="Deckle Logo" 
                                className="h-7 sm:h-8 w-auto object-contain shrink-0" 
                                src={deckleEmblem} 
                            />
                            {/* Wordmark is hidden on small screens so only the logo is visible */}
                            <div className="hidden sm:flex flex-col min-w-0">
                                <span className="font-headline font-bold text-lg sm:text-headline-sm text-primary dark:text-primary-fixed tracking-tight leading-none sm:leading-normal">
                                    Deckle
                                </span>
                                <span className="hidden md:block font-label text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px] -mt-0.5 sm:-mt-1">
                                    Web Novels &amp; Stories
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Center Section: Dead-Centered Modular Navbar (Desktop only) - fades out smoothly when search is open to prevent overlap */}
                    <div className={`hidden xl:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto z-10 transition-all duration-300 ease-in-out ${
                        isSearchOpen ? "opacity-0 pointer-events-none -translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"
                    }`}>
                        <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
                    </div>

                    {/* Right Actions Cluster: Create/Write, Search, Coins, Theme, Bookmark, Profile */}
                    <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 ml-auto min-w-0 shrink-0 z-10">
                    
                        {/* YouTube-style Write Button (Icon-only like search) */}
                        <div className="relative shrink-0" ref={createRef}>
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen((prev) => !prev)}
                                className={`flex items-center justify-center w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant text-on-surface-variant hover:text-primary transition-colors shrink-0 shadow-sm outline-none ${
                                    isCreateOpen ? "ring-2 ring-primary/40 border-primary text-primary" : ""
                                }`}
                                aria-label="Create or write a story"
                                title="Write / Create Story"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                            </button>

                            {/* Dropdown Options */}
                            {isCreateOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-[#fdf9f0] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant shadow-xl p-1.5 z-50 animate-in fade-in duration-150">
                                    <Link
                                        to="/write"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container text-on-surface transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">add_box</span>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="font-label text-xs font-bold text-on-surface">New Story</span>
                                            <span className="text-[11px] text-on-surface-variant leading-tight">Start a new fiction</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/write"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container text-on-surface transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">drafts</span>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="font-label text-xs font-bold text-on-surface">My Drafts</span>
                                            <span className="text-[11px] text-on-surface-variant leading-tight">View drafts &amp; chapters</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/write"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container text-on-surface transition-colors group border-t border-[#E2D8B8]/60 dark:border-outline-variant/40 mt-1 pt-2"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">analytics</span>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="font-label text-xs font-bold text-on-surface">Author Studio</span>
                                            <span className="text-[11px] text-on-surface-variant leading-tight">Analytics &amp; tools</span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Full-Width Search Overlay (< md) */}
                        {isSearchOpen && (
                            <div className="md:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 z-40 flex items-center h-12 bg-[#FBF7EE] dark:bg-[#1c1c17] border border-[#D5C79E] dark:border-outline-variant rounded-full px-3 gap-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface shrink-0"
                                    title="Back"
                                >
                                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                                </button>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    className="flex-1 bg-transparent border-none outline-none font-body text-sm text-on-surface placeholder:text-on-surface-variant/60"
                                    placeholder="Search stories, genres, authors..."
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface shrink-0"
                                        title="Clear"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (searchQuery.trim()) {
                                            navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
                                            setIsSearchOpen(false);
                                        }
                                    }}
                                    className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm"
                                    title="Search"
                                >
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </button>
                            </div>
                        )}

                        {/* Expandable Search: Desktop inline expansion, Mobile trigger */}
                        <div className="relative flex items-center shrink-0" ref={searchRef}>
                            {isSearchOpen ? (
                                <div className="hidden md:flex items-center h-9 bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-full pl-3 pr-1.5 gap-2 text-on-surface-variant focus-within:border-primary shadow-inner transition-all animate-in fade-in duration-150">
                                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0">search</span>
                                    <input 
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        className="bg-transparent border-none outline-none font-body text-xs sm:text-sm w-44 md:w-56 lg:w-72 text-on-surface placeholder:text-on-surface-variant/60" 
                                        placeholder="Search stories, genres, tags..." 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false)
                                            setSearchQuery("")
                                        }}
                                        className="w-5 h-5 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface text-xs shrink-0"
                                        title="Close search"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant text-on-surface-variant hover:text-primary transition-colors shrink-0 shadow-sm"
                                    aria-label="Search stories"
                                    title="Search Stories"
                                >
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </button>
                            )}
                        </div>

                        {/* Coins Counter: Visible on all screens, prominent + button */}
                        {authStatus && (
                            <div className="relative shrink-0" ref={coinsRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsCoinsOpen((prev) => !prev)}
                                    className={`group flex items-center h-9 bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant rounded-full px-2.5 sm:px-3 gap-1.5 transition-all text-on-surface shrink-0 hover:border-primary/60 outline-none shadow-sm ${
                                        isCoinsOpen ? "ring-2 ring-primary/40 border-primary" : ""
                                    }`}
                                    title="Coins Balance & Top Up"
                                >
                                    <span className="text-sm shrink-0">🪙</span>
                                    <span className="font-label font-bold text-xs text-tertiary dark:text-tertiary-fixed-dim">
                                        140
                                    </span>
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary shrink-0 ml-0.5 shadow-xs group-hover:scale-110 transition-transform">
                                        <svg 
                                            className="w-3 h-3" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="3.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Quick Top-Up Popover when clicked */}
                                {isCoinsOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#fdf9f0] dark:bg-surface-container rounded-2xl border border-[#E2D8B8] dark:border-outline-variant shadow-xl p-3 z-50 animate-in fade-in duration-150">
                                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2D8B8]/60 dark:border-outline-variant/40">
                                            <span className="font-label text-xs font-semibold text-on-surface-variant">Coin Balance</span>
                                            <div className="flex items-center gap-1 font-headline font-bold text-sm text-tertiary dark:text-tertiary-fixed-dim">
                                                <span>🪙</span>
                                                <span>140</span>
                                            </div>
                                        </div>
                                        <p className="font-body text-[11px] text-on-surface-variant/80 mb-3 leading-tight">
                                            Use coins to unlock early access chapters and support writers.
                                        </p>
                                        <button
                                            onClick={() => {
                                                alert("Opening Coin Top-Up Store...");
                                                setIsCoinsOpen(false);
                                            }}
                                            className="w-full py-1.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                            <span>Top Up Coins</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Theme Switcher Button */}
                        <ThemeToggle />

                        {/* Bookmark Badge */}
                        <Link 
                            to="/bookshelf"
                            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant cursor-pointer text-on-surface-variant transition-colors shrink-0 shadow-sm"
                            title="Bookshelf & Bookmarks"
                        >
                            <span className="material-symbols-outlined text-[19px]">bookmark_added</span>
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2.5 bg-primary-container rounded-sm shadow-sm"></span>
                        </Link>

                        {/* User Profile Menu */}
                        <ProfileMenu />
                    </div>
                </div>
            </header>

            {/* YouTube-style Left Slide-out Navigation Drawer */}
            {isDrawerOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[60] transition-opacity animate-in fade-in duration-200"
                        onClick={() => setIsDrawerOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <aside 
                        className="fixed top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-[#FBF7EE] dark:bg-[#1c1c17] z-[70] shadow-2xl flex flex-col border-r border-[#E2D8B8] dark:border-[#59413e] animate-in slide-in-from-left duration-200"
                    >
                        {/* Drawer Header: Hamburger close + Logo */}
                        <div className="h-20 px-4 sm:px-6 flex items-center gap-3 border-b border-[#E2D8B8]/70 dark:border-outline-variant/30 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined text-[22px]">menu_open</span>
                            </button>
                            <Link 
                                to="/" 
                                onClick={() => setIsDrawerOpen(false)}
                                className="flex items-center gap-2.5"
                            >
                                <img alt="Deckle Logo" className="h-7 w-auto object-contain" src={deckleEmblem} />
                                <span className="font-headline font-bold text-lg text-primary dark:text-primary-fixed">
                                    Deckle
                                </span>
                            </Link>
                        </div>

                        {/* Drawer Nav Items */}
                        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
                            {/* Primary Navigation */}
                            <div className="space-y-1">
                                {[
                                    { label: "Home", icon: "home", to: "/home" },
                                    { label: "Browse", icon: "explore", to: "/browse" },
                                    { label: "Rankings", icon: "workspace_premium", to: "/rankings" },
                                    { label: "Bookshelf", icon: "shelves", to: "/bookshelf" },
                                    { label: "Community", icon: "forum", to: "/community" },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        onClick={() => {
                                            setActiveTab(item.label);
                                            setIsDrawerOpen(false);
                                        }}
                                        className="flex items-center gap-4 px-3.5 py-2.5 rounded-xl text-on-surface hover:bg-surface-container font-label text-sm font-medium transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[22px] text-primary">
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Creator Studio Section */}
                            <div className="pt-3 border-t border-[#E2D8B8]/60 dark:border-outline-variant/30">
                                <div className="px-3.5 mb-2 font-label text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                                    Creator Studio
                                </div>
                                <Link
                                    to="/write"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary dark:text-primary-fixed font-label text-sm font-semibold transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-[22px]">
                                            edit_square
                                        </span>
                                        <span>Write a Story</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold">
                                        Studio
                                    </span>
                                </Link>
                            </div>

                            {/* Personal & Wallet */}
                            <div className="pt-3 border-t border-[#E2D8B8]/60 dark:border-outline-variant/30">
                                <div className="px-3.5 mb-2 font-label text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                                    My Deckle
                                </div>
                                <Link
                                    to="/bookshelf"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="flex items-center gap-4 px-3.5 py-2.5 rounded-xl text-on-surface hover:bg-surface-container font-label text-sm font-medium transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[22px] text-secondary">
                                        bookmark_added
                                    </span>
                                    <span>Bookmarks &amp; History</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDrawerOpen(false);
                                        setIsCoinsOpen(true);
                                    }}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-on-surface hover:bg-surface-container font-label text-sm font-medium transition-colors text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-[22px] text-tertiary">
                                            monetization_on
                                        </span>
                                        <span>Coins &amp; Wallet</span>
                                    </div>
                                    <span className="font-bold text-xs text-tertiary">
                                        🪙 140
                                    </span>
                                </button>
                                <Link
                                    to={authStatus ? "/profile" : "/login"}
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="flex items-center gap-4 px-3.5 py-2.5 rounded-xl text-on-surface hover:bg-surface-container font-label text-sm font-medium transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[22px] text-on-surface-variant">
                                        account_circle
                                    </span>
                                    <span>{authStatus ? "Account Profile" : "Log In / Sign Up"}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-[#E2D8B8]/60 dark:border-outline-variant/30 flex items-center justify-between shrink-0">
                            <div className="text-[11px] text-on-surface-variant">
                                © 2026 Deckle
                            </div>
                            <ThemeToggle />
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}

export default Header