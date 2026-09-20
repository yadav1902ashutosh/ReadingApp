import react,{useState}  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import ProfileMenu from './ProfileMenu'
import deckleEmblem from '../../assets/deckle-emblem.png'


function Header() {
    const [activeTab, setActiveTab] = useState("The Stacks")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)

    return (
        <header 
        className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7EE]/95 dark:bg-[#1c1c17]/95 backdrop-blur-md border-b border-[#E2D8B8] dark:border-[#59413e] overflow-visible"
        >
            <div
            className='h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0'
            >
                {/* Brand Logo & Title */}
                <Link to="/" className="flex items-center gap-2.5 sm:gap-4 min-w-0 shrink-0 hover:opacity-90 transition-opacity">
                    <img 
                        alt="Antiquarian Foliant Emblem" 
                        className="h-7 sm:h-8 w-auto object-contain" 
                        src={deckleEmblem} 
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="font-headline font-bold text-lg sm:text-headline-sm text-primary dark:text-primary-fixed tracking-tight leading-none sm:leading-normal">
                        Deckle
                        </span>
                        <span className="hidden md:block font-label text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px] -mt-0.5 sm:-mt-1">
                        Serial Library &amp; Scriptorium
                        </span>
                    </div>
                </Link>

                {/* Embedded Modular Navbar */}
                <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

                {/* Right Actions: Search, Coins, Bookmark, Profile */}
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 ml-auto min-w-0 shrink-0">
                
                {/* Desktop Search Input */}
                <div className="hidden md:flex items-center bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-full px-2 py-1 gap-1.5 text-on-surface-variant focus-within:border-primary-container shadow-inner min-w-0">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    <input 
                    className="bg-transparent border-none outline-none font-body text-body-sm w-28 lg:w-36 text-on-surface placeholder:text-on-surface-variant/60" 
                    placeholder="Search folios, scribes..." 
                    type="text" 
                    />
                </div>

                {/* Mobile Search Toggle Button */}
                <button
                    onClick={() => setIsSearchOpen((prev) => !prev)}
                    className="flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant text-on-surface-variant transition-colors shrink-0"
                    aria-label="Search Library"
                    title="Search Folios"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {isSearchOpen ? "close" : "search"}
                    </span>
                </button>

                {/* Florins Counter (Only visible when logged in on Tablet/Desktop) */}
                {authStatus && (
                    <div className="hidden sm:flex items-center bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant rounded-full pl-2 pr-1 py-0.5 sm:py-1 gap-1.5 sm:gap-2 shrink-0">
                        <div className="flex items-center gap-1 font-label text-label-md text-tertiary dark:text-tertiary-fixed-dim font-medium">
                        <span className="text-xs shrink-0">🪙</span>
                        <span className="font-semibold text-xs sm:text-label-md">140</span>
                        <span className="hidden lg:inline text-[11px] text-tertiary/80 dark:text-tertiary-fixed-dim/80">Florins</span>
                        </div>
                        <button 
                        className="bg-primary-container hover:bg-primary text-on-primary font-label text-xs sm:text-label-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors flex items-center gap-0.5 shadow-sm shrink-0"
                        title="Acquire Coin Pouch (Top Up Florins)"
                        >
                        <span>+</span>
                        <span className="hidden xs:inline">Top Up</span>
                        </button>
                    </div>
                )}

                {/* Bookmark Badge */}
                <Link 
                    to={authStatus ? "/profile" : "/login"}
                    className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant cursor-pointer text-on-surface-variant transition-colors shrink-0"
                    title="Inscribed Folios & Bookmarks"
                >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">bookmark_added</span>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2.5 bg-primary-container rounded-sm shadow-sm"></span>
                </Link>

                {/* User Profile Menu */}
                <ProfileMenu />
          </div>
        </div>

        {/* Expandable Mobile Search Tray */}
        {isSearchOpen && (
            <div className="md:hidden px-3 py-2 bg-[#F5EEDB]/95 dark:bg-surface-container/95 border-t border-[#E2D8B8] dark:border-outline-variant shadow-inner transition-all">
                <div className="flex items-center bg-surface dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-full px-3 py-1.5 gap-2 text-on-surface-variant focus-within:border-primary-container shadow-inner">
                    <span className="material-symbols-outlined text-[18px] text-primary">search</span>
                    <input 
                        autoFocus
                        className="bg-transparent border-none outline-none font-body text-body-sm w-full text-on-surface placeholder:text-on-surface-variant/60" 
                        placeholder="Search by folio title, author, or tags..." 
                        type="text" 
                    />
                </div>
            </div>
        )}
        </header>
    )
}

export default Header