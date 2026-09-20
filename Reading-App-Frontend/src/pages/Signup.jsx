import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../auth/auth";
import guildInsignia from "../assets/guild-insignia.png";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const signupUser = async (data) => {
    setError("");
    try {
      const { confirmPassword, charter, ...signupData } = data;
      const session = await authService.createAccount(signupData);

      if (session) {
        dispatch(authLogin({ userData: session }));
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="w-full bg-background min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center py-12 px-4 sm:px-6 relative selection:bg-primary-fixed selection:text-primary">
        {/* Subtle Ambient Watermark Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#8d706d_1px,transparent_1px)] bg-size-[24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Central Stacking Parchment Wrapper */}
        <div className="relative w-full max-w-xl my-4">
          {/* Underlaid Faded Sheet 2 (Bottom layer, tilted slightly counter-clockwise) */}
          <div className="absolute inset-0 rounded-lg bg-surface-dim opacity-75 transform -rotate-1.5 translate-y-2 shadow-sm pointer-events-none" />
          {/* Underlaid Intermediate Leaf 1 (Middle layer, tilted slightly clockwise) */}
          <div className="absolute inset-0 rounded-lg bg-surface-container transform rotate-1 translate-y-1 shadow-md pointer-events-none" />

          {/* Primary Archival Folio Leaf (Main Certificate Container) */}
          <div className="relative rounded-lg bg-surface-container-lowest p-6 sm:p-10 shadow-xl overflow-hidden text-on-surface">
            {/* Corner Ornamental Vignettes */}
            <div className="absolute top-2 left-2 text-outline-variant pointer-events-none select-none">
              <svg className="w-8 h-8 text-primary opacity-30" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M4 24C4 12.9543 12.9543 4 24 4" strokeWidth="1.5" />
                <path d="M8 24C8 15.1634 15.1634 8 24 8" strokeWidth="1" />
                <circle cx="10" cy="10" fill="currentColor" r="2.5" />
                <path d="M4 4L16 16" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 text-outline-variant pointer-events-none select-none">
              <svg className="w-8 h-8 text-primary opacity-30 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M4 24C4 12.9543 12.9543 4 24 4" strokeWidth="1.5" />
                <path d="M8 24C8 15.1634 15.1634 8 24 8" strokeWidth="1" />
                <circle cx="10" cy="10" fill="currentColor" r="2.5" />
                <path d="M4 4L16 16" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 text-outline-variant pointer-events-none select-none">
              <svg className="w-8 h-8 text-primary opacity-30 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M4 24C4 12.9543 12.9543 4 24 4" strokeWidth="1.5" />
                <path d="M8 24C8 15.1634 15.1634 8 24 8" strokeWidth="1" />
                <circle cx="10" cy="10" fill="currentColor" r="2.5" />
                <path d="M4 4L16 16" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 text-outline-variant pointer-events-none select-none">
              <svg className="w-8 h-8 text-primary opacity-30 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M4 24C4 12.9543 12.9543 4 24 4" strokeWidth="1.5" />
                <path d="M8 24C8 15.1634 15.1634 8 24 8" strokeWidth="1" />
                <circle cx="10" cy="10" fill="currentColor" r="2.5" />
                <path d="M4 4L16 16" strokeWidth="1" />
              </svg>
            </div>

            {/* Header Section with Insignia & Hallmark */}
            <div className="flex flex-col items-center text-center mb-8 relative z-10">
              {/* Hallmark Emblem Container with Novitiate Badge */}
              <div className="relative mb-4 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md p-1 bg-surface-container-low flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    alt="Deckle Guild Insignia"
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                    src={guildInsignia}
                  />
                </div>
                {/* Novitiate Scribe Seal Badge */}
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                    Novitiate
                  </span>
                </div>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                Enroll in the Scriptorium
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1">
                Take the Scribe's Vow to bind and annotate serialized folios across the realm.
              </p>

              {/* Antique Fleuron Floral Divider */}
              <div className="flex items-center justify-center gap-3 w-full mt-4 text-outline-variant">
                <span className="h-px bg-surface-variant flex-1 max-w-[80px]" />
                <span className="font-headline-sm text-headline-sm text-primary select-none">❦</span>
                <span className="h-px bg-surface-variant flex-1 max-w-[80px]" />
              </div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4 relative z-10" onSubmit={handleSubmit(signupUser)}>
              {/* Field 1: Scribe's True Name (Full Name) */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                  Scribe&apos;s True Name <span className="text-secondary">(Full Name)</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                    person
                  </span>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Must be at least 2 characters" },
                    })}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
                    placeholder="e.g. Boot Reader One"
                    type="text"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-error">{errors.fullName.message}</p>
                )}
              </div>

              {/* Field 2: Scribe Moniker (Username) */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                  Patron or Scribe Moniker <span className="text-secondary">(Public Pen Name)</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                    history_edu
                  </span>
                  <input
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "Must be at least 3 characters" },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Only letters, numbers, and underscores allowed",
                      },
                    })}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
                    placeholder="e.g. boot_reader_one"
                    type="text"
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-error">{errors.username.message}</p>
                )}
              </div>

              {/* Field 3: Guild Dispatch Address (Email) */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                  Guild Dispatch Address <span className="text-secondary">(Email)</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                    mail
                  </span>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Enter a valid guild dispatch address",
                      },
                    })}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
                    placeholder="chronicler@alexandria.org"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Field 4 & 5: Wax Cyphers (Password & Confirmation) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cypher 1 */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                    Secret Wax Cypher
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                      key
                    </span>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Must be at least 8 runes" },
                      })}
                      className="w-full pl-11 pr-10 py-2.5 bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
                      placeholder="Min. 8 runes"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      className="absolute right-3 text-outline hover:text-primary transition-colors focus:outline-none"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title="Inspect Cypher"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-error">{errors.password.message}</p>
                  )}
                </div>

                {/* Cypher 2 */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                    Confirm Wax Cypher
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                      lock
                    </span>
                    <input
                      {...register("confirmPassword", {
                        required: "Please confirm your cypher",
                        validate: (value) =>
                          value === password || "Wax cyphers do not match",
                      })}
                      className="w-full pl-11 pr-10 py-2.5 bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner"
                      placeholder="Re-enter runes"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      className="absolute right-3 text-outline hover:text-primary transition-colors focus:outline-none"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      title="Inspect Cypher"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-error">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Field 6: Scriptorium Charter Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      {...register("charter", {
                        required: "You must pledge to the Scriptorium Charter",
                      })}
                      className="peer sr-only"
                      type="checkbox"
                    />
                    <div className="w-4 h-4 rounded bg-surface-container-high transition-colors peer-checked:bg-primary flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-xs opacity-0 peer-checked:opacity-100 font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight group-hover:text-on-surface transition-colors">
                    I pledge allegiance to the{" "}
                    <span className="text-primary font-medium hover:underline">
                      Scriptorium Charter
                    </span>{" "}
                    and honor the reader privacy guidelines.
                  </span>
                </label>
                {errors.charter && (
                  <p className="text-sm text-error mt-1">{errors.charter.message}</p>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <p className="text-sm text-error text-center">{error}</p>
              )}

              {/* CTA Action: Wax Seal Button */}
              <div className="pt-3">
                <button
                  className="w-full py-3.5 px-6 rounded bg-primary text-on-primary font-label-lg text-label-lg tracking-wider uppercase flex items-center justify-center gap-3 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {/* Faint Ambient Luster Overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_stories
                  </span>
                  <span>
                    {isSubmitting ? "Inscribing…" : "Inscribe Scribe Folio & Enter"}
                  </span>
                </button>
              </div>
            </form>

            {/* Secondary Divider: Guild Handshakes */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full bg-surface-container-high h-px" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-container-lowest px-4 font-label-sm text-label-sm text-outline tracking-widest uppercase flex items-center gap-2">
                  <span className="text-secondary opacity-60">∗</span>
                  or register via patron guild
                  <span className="text-secondary opacity-60">∗</span>
                </span>
              </div>
            </div>

            {/* Social Authentication / Guild Connections */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google Dispatch */}
              <button
                className="flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-all group"
                title="Authenticate via Google Dispatch"
                type="button"
              >
                <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10 0-.61-.06-1.2-.17-1.77H12v3.54h5.66c-.24 1.3-1 2.4-2.12 3.14l3.25 2.52C20.69 17.65 22 15.04 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface font-medium truncate">
                  Google
                </span>
              </button>

              {/* Discord Saloon */}
              <button
                className="flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-all group"
                title="Authenticate via Discord Saloon"
                type="button"
              >
                <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.02 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                </svg>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface font-medium truncate">
                  Discord
                </span>
              </button>

              {/* Apple Codex */}
              <button
                className="flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-all group"
                title="Authenticate via Apple Codex"
                type="button"
              >
                <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.03-.48 2.65-1.23z" />
                </svg>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface font-medium truncate">
                  Apple
                </span>
              </button>
            </div>

            {/* Login Navigational Footer */}
            <div className="mt-8 text-center pt-4 border-t border-surface-container">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already an ordained chronicler?
                <Link
                  className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold inline-flex items-center gap-1 transition-colors ml-1"
                  to="/login"
                >
                  <span>Enter the Grand Scriptorium</span>
                  <span className="material-symbols-outlined text-sm font-semibold">
                    arrow_forward
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Archival Colophon / Authenticity Imprint */}
        <div className="mt-6 text-center select-none">
          <p className="font-label-sm text-label-sm tracking-widest text-outline uppercase opacity-75">
            DECKLE SERIALIZED FICTION ARCHIVES • NOVITIATE REGISTER MMXXIV • FOXED LAID PAPER V3.2
          </p>
        </div>
      </div>
    </main>
  );
}
