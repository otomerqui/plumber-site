"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";


const links = [
  { href: "/", label: "Inicio" },
  { href: "/#services", label: "Servicios" },
  { href: "/#pricing", label: "Planes" },
  { href: "/#work", label: "Trabajos" },
  { href: "/#faq", label: "Preguntas" },
  { href: "/contact", label: "Contacto" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M3 8 H15 a5 5 0 0 1 5 5 V22" fill="none" stroke="#E07B3C" strokeWidth="6" strokeLinejoin="round" />
        <rect x="14" y="21" width="12" height="6" rx="1.5" fill={light ? "#fff" : "#0E2433"} />
      </svg>
      <span className={`font-display text-xl font-bold transition-colors duration-300 ${light ? "text-white" : "text-ink"}`}>
        {site.name}
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll, close on Escape, and close if the viewport grows to desktop size.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const delay = (i: number) => ({ transitionDelay: open ? `${200 + i * 55}ms` : "0ms" });

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          open ? "border-white/10 bg-ink" : "border-ink/10 bg-white/95 backdrop-blur"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <Link href="/" aria-label={`${site.name}, inicio`}>
            <Logo light={open} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[15px] font-medium text-ink hover:text-copper">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={site.phoneHref} className="text-[15px] font-semibold text-ink hover:text-copper">{site.phone}</a>
            <Link href="/quote" className="btn btn-primary !py-2.5">Pedir cotización</Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
              open ? "border-white/30 text-white" : "border-ink/20 text-ink"
            }`}
          >
            <span className="relative block h-6 w-6" aria-hidden="true">
              <span className={`absolute left-0 top-1/2 -mt-px h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "translate-y-0 rotate-45" : "-translate-y-[7px]"}`} />
              <span className={`absolute left-0 top-1/2 -mt-px h-0.5 w-6 rounded bg-current transition-all duration-200 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`absolute left-0 top-1/2 -mt-px h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "translate-y-0 -rotate-45" : "translate-y-[7px]"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen menu. Sits outside <header> so the header's backdrop blur doesn't clip it. */}
      <div
        id="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        className="menu-panel fixed inset-0 z-40 overflow-y-auto bg-ink pt-[72px] lg:hidden"
      >
        <nav aria-label="Móvil" className="wrap flex min-h-full flex-col pb-10 pt-6">
          <ul>
            {links.map((l, i) => {
              const active = l.href === pathname;
              return (
                <li key={l.href} className="menu-item border-b border-white/10" style={delay(i)}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-3xl font-semibold transition-colors hover:text-copper-bright ${
                      active ? "text-copper-bright" : "text-white"
                    }`}
                  >
                    {l.label}
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-copper-bright" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-3 pt-10">
            <div className="menu-item" style={delay(links.length)}>
              <Link href="/quote" onClick={() => setOpen(false)} className="btn btn-primary w-full !py-4 text-lg">
                Pedir cotización gratis
              </Link>
            </div>
            <div className="menu-item" style={delay(links.length + 1)}>
              <a href={site.phoneHref} className="btn btn-outline w-full !py-4 text-lg">Llamar al {site.phone}</a>
            </div>
            <p className="menu-item pt-3 text-center text-sm text-white/60" style={delay(links.length + 2)}>
              Emergencias atendidas 24/7
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
