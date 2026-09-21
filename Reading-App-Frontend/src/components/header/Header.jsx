import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ProfileMenu from './ProfileMenu'
import ThemeToggle from './ThemeToggle'
import deckleEmblem from '../../assets/deckle-emblem.png'

function Header() {
    const [activeTab, setActiveTab] = useState("Home")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCoinsOpen, setIsCoinsOpen] = useState(false)

    const searchRef = useRef(null)
    const searchInputRef = useRef(null)
    const coinsRef = useRef(null)

    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    // Close popovers on click outside
    useEffect(() => {
        function handleClickOutside(e) {
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
                setIsSearchOpen(false)
                setIsCoinsOpen(false)
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

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
        <header 
            className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7EE]/95 dark:bg-[#1c1c17]/95 backdrop-blur-md border-b border-[#E2D8B8] dark:border-[#59413e] overflow-visible"
        >
            <div
                className='h-20 w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0'
            >
                {/* Brand Logo & Title */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3.5 min-w-0 shrink-0 hover:opacity-90 transition-opacity">
                    <img 
                        alt="Deckle Logo" 
                        className="h-7 sm:h-8 w-auto object-contain shrink-0" 
                        src={deckleEmblem} 
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="font-headline font-bold text-lg sm:text-headline-sm text-primary dark:text-primary-fixed tracking-tight leading-none sm:leading-normal">
                            Deckle
                        </span>
                        <span className="hidden md:block font-label text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px] -mt-0.5 sm:-mt-1">
                            Web Novels &amp; Stories
                        </span>
                    </div>
                </Link>

                {/* Embedded Modular Navbar */}
                <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

                {/* Right Actions: Search, Coins, Theme, Bookmark, Profile */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 ml-auto min-w-0 shrink-0">
                
                    {/* Expandable Search: Compact 36px icon when not clicked */}
                    <div className="relative flex items-center shrink-0" ref={searchRef}>
                        {isSearchOpen ? (
                            <div className="flex items-center h-9 bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-full pl-2.5 pr-1.5 gap-1.5 text-on-surface-variant focus-within:border-primary-container shadow-inner transition-all animate-in fade-in duration-150">
                                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">search</span>
                                <input 
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    className="bg-transparent border-none outline-none font-body text-xs sm:text-sm w-28 sm:w-44 md:w-56 text-on-surface placeholder:text-on-surface-variant/60" 
                                    placeholder="Search stories..." 
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

                    {/* Coins Counter: Visible on all screens, compact when idle */}
                    {authStatus && (
                        <div className="relative shrink-0" ref={coinsRef}>
                            <button
                                type="button"
                                onClick={() => setIsCoinsOpen((prev) => !prev)}
                                className={`flex items-center h-9 bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant rounded-full px-2 sm:px-2.5 gap-1 transition-all text-on-surface shrink-0 hover:border-primary/60 outline-none shadow-sm ${
                                    isCoinsOpen ? "ring-2 ring-primary/40 border-primary" : ""
                                }`}
                                title="Coins Balance & Top Up"
                            >
                                <span className="text-xs shrink-0">🪙</span>
                                <span className="font-label font-bold text-xs text-tertiary dark:text-tertiary-fixed-dim">
                                    140
                                </span>
                                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary dark:text-primary-fixed text-[11px] font-bold shrink-0 ml-0.5">
                                    +
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
                                        className="w-full py-1.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-1"
                                    >
                                        <span>+</span>
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
    )
}

export default Header