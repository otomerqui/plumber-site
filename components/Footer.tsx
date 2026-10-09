import Link from "next/link";
import { services, site } from "@/lib/site";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:pr-6">
          <Logo light />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed">{site.description}</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contacto</h3>
          <ul className="space-y-2.5 text-[15px]">
            <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li>{site.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Servicios</h3>
          <ul className="space-y-2.5 text-[15px]">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}><Link href={`/quote?service=${s.slug}`} className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Horario</h3>
          <ul className="space-y-2.5 text-[15px]">
            {site.hours.map((h) => (
              <li key={h.days}><span className="text-white">{h.days}:</span> {h.time}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
          <p className="flex gap-5">
            <Link href="/contact" className="hover:text-white">Política de privacidad</Link>
            <Link href="/contact" className="hover:text-white">Términos</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
