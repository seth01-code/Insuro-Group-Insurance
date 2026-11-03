"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Bandage,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  FileText,
  HardHat,
  HeartHandshake,
  HeartPulse,
  Home,
  Mail,
  MessageSquareText,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Smartphone,
  Sprout,
  Stethoscope,
  UserPlus,
  UserRound,
  UserRoundCheck,
  Users,
  UsersRound,
  X,
  CarFront,
  type LucideIcon,
} from "lucide-react";
import { modalConfig, type Field, type ModalType } from "@/lib/modals";

const icons: Record<ModalType, LucideIcon> = {
  "get-started": Building2,
  "claim-car": CarFront,
  "claim-life": HeartHandshake,
  "claim-health": HeartPulse,
  "claim-electronics": Smartphone,
  "claim-travel": Plane,
  "claim-property": Home,
  "claim-business": Briefcase,
  "claim-marine": Ship,
  "claim-accident": Bandage,
  "claim-agriculture": Sprout,
  "claim-specialised": ShieldAlert,
  "service-medical": Stethoscope,
  "service-preemployment": UserRoundCheck,
  "service-fitness": HardHat,
  "add-employee": UserPlus,
};

const fieldIcons: Record<string, LucideIcon> = {
  company: Building2,
  email: Mail,
  size: Users,
  employee: UserRound,
  employees: UsersRound,
  fullName: UserRound,
  department: Briefcase,
  policy: FileText,
  date: CalendarDays,
  details: MessageSquareText,
  notes: MessageSquareText,
};

export type ModalSubmitData = Record<string, string>;

interface OpenOptions {
  /** Called with the submitted form values (field name → value). */
  onSubmit?: (data: ModalSubmitData) => void;
}

interface ModalContextValue {
  openModal: (type: ModalType, options?: OpenOptions) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

const inputClass =
  "w-full rounded-2xl border border-line bg-[#f8faff] py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";

/** Shows the image in a white tile if one is set, otherwise the icon.
 *  If the image fails to load, falls back to the icon. */
function ModalMark({ image, Icon }: { image?: string; Icon: LucideIcon }) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-lg md:h-20 md:w-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur md:h-16 md:w-16">
      <Icon size={28} strokeWidth={1.75} />
    </span>
  );
}

function FieldInput({ field }: { field: Field }) {
  const FieldIcon = fieldIcons[field.name];
  const isTextarea = field.type === "textarea";

  return (
    <div className="relative">
      {FieldIcon && (
        <FieldIcon
          size={17}
          className={`pointer-events-none absolute left-4 text-muted ${
            isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        />
      )}

      {isTextarea ? (
        <textarea
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      ) : field.type === "select" ? (
        <>
          <select
            name={field.name}
            className={`${inputClass} appearance-none pr-10`}
          >
            {field.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </>
      ) : (
        <input
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState<ModalType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSubmitRef = useRef<OpenOptions["onSubmit"]>(undefined);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    onSubmitRef.current = undefined;
    setCurrent(null);
    setSubmitted(false);
  }, []);

  const openModal = useCallback((type: ModalType, options?: OpenOptions) => {
    if (timer.current) clearTimeout(timer.current);
    onSubmitRef.current = options?.onSubmit;
    setSubmitted(false);
    setCurrent(type);
  }, []);

  // Escape to close + lock page scroll while open
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [current, close]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as ModalSubmitData;

    // Page-specific handler (e.g. the Employees list adding a person).
    // Mock for everything else: send `data` to your backend here.
    onSubmitRef.current?.(data);

    setSubmitted(true);
    timer.current = setTimeout(close, 2400);
  }

  const cfg = current ? modalConfig[current] : null;
  const Icon = current ? icons[current] : null;
  const NoteIcon = cfg?.noteIcon === "shield" ? ShieldCheck : Clock;

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}

      {current && cfg && Icon && (
        <div
          className="fixed inset-0 z-100 overflow-y-auto bg-[#0a0f1e]/65 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex min-h-full items-center justify-center">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="modal-in relative grid w-full max-w-3xl overflow-hidden rounded-4xl bg-white shadow-[0_50px_100px_-20px_rgba(10,15,30,0.6)] md:grid-cols-[0.85fr_1.15fr]"
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 md:bg-line/60 md:text-muted md:hover:bg-line md:hover:text-ink"
              >
                <X size={18} />
              </button>

              {/* Left: colored panel */}
              <div
                className={`relative flex flex-col overflow-hidden bg-linear-to-br p-7 text-white md:p-9 ${cfg.panel}`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.22) 1.5px, transparent 1.5px)",
                    backgroundSize: "22px 22px",
                    maskImage:
                      "linear-gradient(to bottom right, black 0%, transparent 70%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom right, black 0%, transparent 70%)",
                  }}
                />
                <div className="animate-ring absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-white/20" />
                <div className="animate-ring absolute -bottom-40 -right-36 h-112 w-md rounded-full border border-white/10 [animation-delay:1.5s]" />

                {/* key resets the image-failed state when switching modals */}
                <ModalMark key={current} image={cfg.image} Icon={Icon} />

                <h3
                  id="modal-title"
                  className="relative mt-6 pr-10 text-2xl font-extrabold leading-tight tracking-tight md:pr-0 md:text-[1.7rem]"
                >
                  {cfg.title}
                </h3>
                <p className="relative mt-3 text-[13px] leading-relaxed text-white/75">
                  {cfg.desc}
                </p>

                <div className="relative mt-6 md:mt-auto md:pt-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[12px] font-semibold backdrop-blur">
                    <NoteIcon size={14} />
                    {cfg.note}
                  </span>
                </div>
              </div>

              {/* Right: form / success */}
              <div className="relative p-7 md:min-h-104 md:p-9">
                {submitted ? (
                  <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                    <span className="relative flex h-20 w-20 items-center justify-center">
                      <span className="animate-ring absolute inset-0 rounded-full bg-emerald-200" />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                        <Check size={30} strokeWidth={3} />
                      </span>
                    </span>
                    <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
                      {cfg.success}
                    </h3>
                    <p className="mt-2 text-[13px] text-muted">
                      {cfg.successNote ?? "We'll be in touch shortly."}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col"
                  >
                    <div className="space-y-4 md:pt-6">
                      {cfg.fields.map((f) => (
                        <div key={f.name}>
                          <label className="mb-2 block text-[12.5px] font-semibold text-ink">
                            {f.label}
                          </label>
                          <FieldInput field={f} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex gap-3 md:mt-auto md:pt-8">
                      <button
                        type="button"
                        onClick={close}
                        className="flex-1 rounded-full border border-line py-3.5 text-[13px] font-semibold text-muted transition hover:border-ink/30 hover:text-ink"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`flex-2 rounded-full py-3.5 text-[13px] font-semibold text-white shadow-lg transition ${cfg.btnClass}`}
                      >
                        {cfg.btn} →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
