import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const isInitialized = useSelector((state) => state.auth.isInitialized);

    useEffect(() => {
        // Wait until initial session check finishes
        if (!isInitialized) return;

        // Redirect unauthenticated patrons to login
        if (authentication && !authStatus) {
            navigate("/login", { replace: true });
        }
        // Redirect authenticated patrons away from guest-only pages
        else if (!authentication && authStatus) {
            navigate("/", { replace: true });
        }
    }, [authStatus, isInitialized, navigate, authentication]);

    // Show themed scriptorium loader while verifying session
    if (!isInitialized) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="font-label text-xs uppercase tracking-widest text-outline">
                    Consulting Scriptorium Ledger...
                </span>
            </div>
        );
    }

    // Hide children while redirect is underway
    if ((authentication && !authStatus) || (!authentication && authStatus)) {
        return null;
    }

    return <>{children}</>;
}