import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ activeTab = 'Home', onSelectTab }) {
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'Home', to: '/home' },
        { id: 'browse', label: 'Browse', to: '/home' },
        { id: 'genres', label: 'Genres', to: '/home' },
        { id: 'library', label: 'My Library', to: '/profile' },
        { id: 'updates', label: 'Latest Updates', to: '/home' },
        { id: 'community', label: 'Community', to: '/home' },
    ];

    return (
        <nav
            className='hidden xl:flex items-center gap-1 bg-surface-container-low/70 dark:bg-surface-container-high/30 p-1 rounded-xl border border-[#E2D8B8]/60 dark:border-[#59413e]/60'
        >
            {
                navItems.map((item) => {
                    const isCurrentRoute = 
                        (item.to === '/profile' && location.pathname === '/profile') ||
                        (item.to === '/home' && (location.pathname === '/home' || location.pathname === '/') && activeTab === item.label);
                    const isActive = isCurrentRoute || activeTab === item.label;

                    return (
                        <Link 
                            key={item.id}
                            to={item.to}
                            onClick={() => {
                                if (onSelectTab) onSelectTab(item.label);
                            }}
                            className={`px-3 py-1.5 rounded-lg transition-colors font-label text-label-md 
                                ${isActive ? 'bg-surface-container-high dark:bg-surface-container text-primary dark:text-primary-fixed font-bold shadow-inner' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 dark:hover:bg-surface-container-high/50'}`}
                        >
                            {item.label}
                        </Link>
                    );
                })
            }
        </nav>
    )
}

export default Navbar