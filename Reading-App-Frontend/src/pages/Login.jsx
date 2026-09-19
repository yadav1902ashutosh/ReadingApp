import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../auth/auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="w-full bg-background min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center p-4 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#793f00_0.75px,transparent_0.75px)] [background-size-[24px_24px]" />

        <div className="w-full max-w-xl relative my-auto">
          <div className="absolute -top-3 left-10 right-10 h-8 bg-surface-variant/60 rounded-t-xl -z-10 transform -rotate-1 shadow-sm" />
          <div className="absolute -top-1.5 left-6 right-6 h-6 bg-surface-container-high/80 rounded-t-lg -z-10 transform rotate-0.5 shadow-sm" />

          <div className="bg-surface-container-lowest text-on-surface shadow-xl rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-25">
              <svg className="text-tertiary-container w-full h-full" fill="none" viewBox="0 0 64 64">
                <path
                  d="M4 4 L60 4 M4 4 L4 60 M12 12 L52 12 M12 12 L12 52 M4 20 C10 16 16 10 20 4 M44 4 C48 10 54 16 60 20 M4 44 C10 48 16 54 20 60"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" fill="currentColor" r="3" />
              </svg>
            </div>

            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-25 transform scale-x-[-1]">
              <svg className="text-tertiary-container w-full h-full" fill="none" viewBox="0 0 64 64">
                <path
                  d="M4 4 L60 4 M4 4 L4 60 M12 12 L52 12 M12 12 L12 52 M4 20 C10 16 16 10 20 4 M44 4 C48 10 54 16 60 20 M4 44 C10 48 16 54 20 60"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" fill="currentColor" r="3" />
              </svg>
            </div>

            <div className="flex flex-col items-center text-center mb-8 relative">
              <div className="relative w-28 h-28 mb-4 p-1 rounded-full bg-surface-container-low shadow-sm flex items-center justify-center">
                <img
                  alt="Deckle Insignia"
                  className="w-24 h-24 rounded-full object-cover transition-transform duration-500 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VtgK-Fw_rrCee2fWjkgcxqwNZ3g6CkO_ByMTQHmQIbcoxoMB_bFo0pQB3sfY9nQXlPgVDjfNnV3wKrdrbw0-5pSdLbE3PskoysXYoZyBK8PL3rgJvRqxs-j2-Muz29GQschcghqEgo62Z-eRRiuDjLqN3XjG2Lm3MdHXqT4XaYjiEh5Jodwlj7TAgHXpsEVrfpxHn3mLzKmlziI--98L17BquTRoTpZEZYywBcBuTs5TLq3GBYP1jE0Ow"
                />
                <div className="absolute -bottom-2 bg-primary text-on-primary px-3 py-0.5 rounded-full shadow-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-[9px]">
                    Archivum
                  </span>
                </div>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1 mb-1">
                Enter the Grand Scriptorium
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm italic">
                Authenticate your patron credentials or seal a new reading folio
              </p>

              <div className="flex items-center justify-center gap-3 w-40 mt-3 opacity-60">
                <div className="h-px bg-outline-variant flex-1" />
                <span className="text-secondary text-xs">❦</span>
                <div className="h-px bg-outline-variant flex-1" />
              </div>
            </div>

            <form className="flex flex-col space-y-5" onSubmit={handleSubmit(loginUser)}>
              <div className="flex flex-col space-y-1.5">
                <label
                  className="flex items-center justify-between font-label-md text-label-md text-on-surface font-semibold tracking-wide"
                  htmlFor="scribe-moniker"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-secondary">history_edu</span>
                    Scribe Moniker or Guild Dispatch
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant opacity-75 lowercase font-normal">
                    (email / user)
                  </span>
                </label>

                <div className="relative">
                  <input
                    {...register("email", { required: "Email is required" })}
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-4 py-3 pl-11 rounded-lg shadow-inner focus:outline-none focus:bg-surface transition-all placeholder:text-on-surface-variant/40"
                    id="scribe-moniker"
                    placeholder="e.g. chronicler@alexandria.org"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant/60 pointer-events-none text-lg">
                    edit_note
                  </span>
                </div>

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface font-semibold tracking-wide"
                    htmlFor="wax-cypher"
                  >
                    <span className="material-symbols-outlined text-base text-secondary">lock</span>
                    Secret Wax Cypher
                  </label>
                  <a
                    className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors underline decoration-outline-variant hover:decoration-primary"
                    href="#"
                  >
                    Lost your sealing wax?
                  </a>
                </div>

                <div className="relative">
                  <input
                    {...register("password", { required: "Password is required" })}
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-4 py-3 pl-11 pr-11 rounded-lg shadow-inner focus:outline-none focus:bg-surface transition-all placeholder:text-on-surface-variant/40"
                    id="wax-cypher"
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant/60 pointer-events-none text-lg">
                    key
                  </span>
                  <button
                    aria-label="Toggle cipher visibility"
                    className="absolute right-3 top-3 text-on-surface-variant/60 hover:text-on-surface focus:outline-none p-1 rounded transition-colors"
                    id="toggle-password-btn"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none group">
                  <input defaultChecked className="sr-only peer" id="remember-me" type="checkbox" />
                  <div className="w-4 h-4 rounded bg-surface-container-low peer-checked:bg-primary flex items-center justify-center transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-xs text-on-primary font-bold opacity-0 peer-checked:opacity-100 transition-opacity">
                      check
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Remember this study desk
                  </span>
                </label>

                <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-semibold">
                  Port 443 Encrypted
                </span>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="pt-2">
                <button
                  className="w-full relative group overflow-hidden bg-primary text-on-primary font-label-lg text-label-lg py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.99]"
                  type="submit"
                >
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-tertiary-fixed/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">drafts</span>
                    Break Seal &amp; Enter Archives
                  </span>
                </button>
              </div>
            </form>

            <div className="relative my-7 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-surface-variant" />
              </div>
              <div className="relative bg-surface-container-lowest px-4 flex items-center gap-2 text-on-surface-variant">
                <span className="text-xs text-secondary">✦</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant/80">
                  or enter via patron guild
                </span>
                <span className="text-xs text-secondary">✦</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                className="flex flex-col items-center justify-center py-2.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group shadow-sm text-on-surface"
                type="button"
              >
                <svg className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.665 0 3.18.66 4.305 1.74l2.25-2.25C17.07 3.84 14.82 3 12.24 3 7.275 3 3.24 7.035 3.24 12s4.035 9 9 9c5.19 0 8.7-3.645 8.7-8.835 0-.645-.06-1.275-.195-1.88H12.24z" />
                </svg>
                <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-on-surface font-medium">
                  Google Dispatch
                </span>
              </button>

              <button
                className="flex flex-col items-center justify-center py-2.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group shadow-sm text-on-surface"
                type="button"
              >
                <svg className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-on-surface font-medium">
                  Discord Saloon
                </span>
              </button>

              <button
                className="flex flex-col items-center justify-center py-2.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group shadow-sm text-on-surface"
                type="button"
              >
                <svg className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.73 1.01.08 2.02-.48 2.64-1.23z" />
                </svg>
                <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-on-surface font-medium">
                  Apple Codex
                </span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-variant/70 flex flex-col items-center text-center space-y-2">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Uninitiated into Deckle?
                <Link
                  className="font-semibold text-primary hover:text-primary-container transition-colors ml-1 inline-flex items-center gap-1 group"
                  to="/signup"
                >
                  Apprentice Scribe Registration
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">
                    arrow_forward
                  </span>
                </Link>
              </p>
              <a
                className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors py-1 px-3 rounded-full bg-secondary-fixed/30 hover:bg-secondary-fixed/50"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">auto_stories</span>
                Guest of Honor: Browse public folios without an account
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase opacity-70">
              Deckle Serialized Fiction Archives • Edition MMXXIV • Foxed Laid Paper v3.2
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
