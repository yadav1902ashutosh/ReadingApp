import react,{useState}  from 'react'
import Navbar from './Navbar'


function Header() {
    const [activeTab, setActiveTab] = useState("The Stacks")
    return (
        <header 
        className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7EE]/95 dark:bg-[#1c1c17]/95 backdrop-blur-md border-b border-[#E2D8B8] dark:border-[#59413e] overflow-hidden"
        >
            <div
            className='h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 min-w-0'
            >
                {/* Brand Logo & Title */}
                <div className="flex items-center gap-4 min-w-0 shrink-0">
                    <img 
                        alt="Antiquarian Foliant Emblem" 
                        className="h-8 w-auto object-contain" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsH8tn5ioGecMXcyp40_IKyVEIBg5oaSdaWk0knUvFhdBi_OmsYxNvjxRzA0G2lb8cORG8oVSFzA9mDBX4-eMj7MfoaVSWaPc4nNGXuEY0NzC7yyAHOePlKmMzNBAhABY1dqtK9tgPaQdf9bWcktBoS92P7d2Z2NX2-K1vaaU_0b3X5vN7k1d4vSiNtVGiufW9KC3b9zGTlWC2Tb09yd_AWRq6kbYuuv0uoqYWkRBqRuB9G52IklkQmA" 
                    />
                    <div className="flex flex-col">
                        <span className="font-headline font-bold text-headline-sm text-primary dark:text-primary-fixed tracking-tight">
                        Deckle
                        </span>
                        <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px] -mt-1">
                        Serial Library &amp; Scriptorium
                        </span>
                    </div>
                </div>

                {/* Embedded Modular Navbar */}
                <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

                {/* Right Actions: Search, Coins, Bookmark, Profile */}
                <div className="flex items-center gap-2 sm:gap-4 ml-auto min-w-0 shrink-0">
                
                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-[#F5EEDB] dark:bg-surface-container-high border border-[#D5C79E] dark:border-outline-variant rounded-full px-2 py-1 gap-1.5 text-on-surface-variant focus-within:border-primary-container shadow-inner min-w-0">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    <input 
                    className="bg-transparent border-none outline-none font-body text-body-sm w-28 lg:w-36 text-on-surface placeholder:text-on-surface-variant/60" 
                    placeholder="Search folios, scribes..." 
                    type="text" 
                    />
                </div>

                {/* Florins Counter */}
                <div className="flex items-center bg-surface-container-low dark:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant rounded-full pl-2 pr-1 py-1 gap-2 max-w-full min-w-0">
                    <div className="flex items-center gap-1 font-label text-label-md text-tertiary dark:text-tertiary-fixed-dim font-medium min-w-0">
                    <span className="text-xs shrink-0">🪙</span>
                    <span className="hidden sm:inline font-semibold truncate">140 </span>
                    </div>
                    <button className="bg-primary-container hover:bg-primary text-on-primary font-label text-label-sm px-2.5 py-1 rounded-full transition-colors flex items-center gap-0.5 shadow-sm shrink-0">
                    + Top Up
                    </button>
                </div>

                {/* Bookmark Badge */}
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#E2D8B8] dark:border-outline-variant cursor-pointer text-on-surface-variant shrink-0">
                    <span className="material-symbols-outlined text-[20px]">bookmark_added</span>
                    <span className="absolute -top-1 -right-0.5 w-2 h-2.5 bg-primary-container rounded-sm shadow-sm"></span>
                </div>

                {/* User Profile Avatar */}
                <div className="pl-1 border-l border-[#E2D8B8]/80 dark:border-outline-variant/80 shrink-0">
                    <img 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#E2D8B8] dark:ring-outline-variant shadow-sm" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwOi2sFjY_iXS2YZkd_Pz3xoPe27XQkKdPK0VtXRnQht5v06o7pJS5RoSbssdCwtFpnDs6X52onKoSnS7nGeEILzjUGSbWYIXfzR3zq2OaCYPM-zqR-_qthnO6XG7cb3sT3iE_aSOdOy4bTaLvQ2rHBOz-ZnfwDeXkCzDegUAJ0kgf66WbwevdqeZk6mg-SP3cFG2aJ0TtdJ89UBsmXuKyC2Lssh_5XuCjbLmoj3ebEFOpPa1zUT7bFA" 
                    />
                </div>
          </div>
        </div>        
        </header>
    )
}

export default Header