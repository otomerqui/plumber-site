import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import PipeArt from "@/components/PipeArt";
import Stars from "@/components/Stars";
import { faqs, features, plans, projects, reviews, services, site, stats, team, testimonials } from "@/lib/site";

const initials = (name: string) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

export default function HomePage() {
  const [featured, ...others] = [...testimonials].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="wrap grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
              Plomería y reparaciones bien hechas desde la primera vez.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Plomeros y técnicos con licencia para fugas, desagües, calentadores y grifería. Conoces el
              precio antes de que empiece el trabajo.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/quote" className="btn btn-primary">Pedir cotización gratis</Link>
              <a href={site.phoneHref} className="btn btn-outline">Llamar al {site.phone}</a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-white/80">
              <li>Con licencia y asegurados</li>
              <li>Precios claros</li>
              <li>Visitas el mismo día</li>
            </ul>
          </div>
          <div className="mx-auto aspect-square w-full max-w-md lg:max-w-none">
            <PipeArt />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Placeholder label="Foto: técnico trabajando" className="aspect-[4/5] w-full" />
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Por qué nuestros clientes guardan nuestro número</h2>
            <p className="mt-4 max-w-lg text-lg text-steel">
              Tratamos cada llamado como si fuera nuestra propia casa. Eso significa llegar a tiempo y
              explicar el problema en palabras sencillas.
            </p>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {features.map((f) => (
                <div key={f.title} className="py-5">
                  <dt className="text-xl font-semibold">{f.title}</dt>
                  <dd className="mt-1 text-steel">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Emergency band */}
      <section className="bg-copper text-white">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">¿Se rompió una tubería? No esperes al lunes.</h2>
            <p className="mt-2 text-lg text-white/90">Nuestra línea de emergencias atiende a cualquier hora, todos los días.</p>
          </div>
          <a href={site.phoneHref} className="btn btn-light shrink-0 !px-8 !py-4 text-xl">{site.phone}</a>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-mist">
        <div className="wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-bold text-copper">{s.value}</p>
              <p className="mt-2 max-w-[16rem] text-steel">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section scroll-mt-20">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">De reparaciones pequeñas a proyectos de toda la casa</h2>
            <Link href="/quote" className="btn btn-dark self-start md:self-auto">Solicitar cotización</Link>
          </div>
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug} className="border-t border-ink/15 py-7">
                <Link href={`/quote?service=${s.slug}`} className="group block">
                  <h3 className="text-xl font-semibold group-hover:text-copper">{s.title}</h3>
                  <p className="mt-2 text-steel">{s.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section id="pricing" className="section scroll-mt-20 bg-mist">
        <div className="wrap">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">Planes de cuidado del hogar para mantener tus costos bajo control</h2>
          <p className="mt-4 max-w-xl text-lg text-steel">Detecta los problemas pequeños antes de que se vuelvan caros. Cancela cuando quieras.</p>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-2xl p-8 ${p.featured ? "bg-ink text-white md:-my-4 md:py-12" : "bg-white"}`}
              >
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-3">
                  <span className="font-display text-5xl font-bold">${p.price}</span>
                  <span className={p.featured ? "text-white/70" : "text-steel"}> {site.currency} / mes</span>
                </p>
                <ul className={`mt-6 flex-1 space-y-3 ${p.featured ? "text-white/90" : "text-steel"}`}>
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" className="mt-0.5 shrink-0" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke={p.featured ? "#E07B3C" : "#B8551F"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/quote?service=care-plan&plan=${encodeURIComponent(p.name)}`}
                  className={`btn mt-8 ${p.featured ? "btn-primary" : "btn-dark"}`}
                >
                  Elegir {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section scroll-mt-20">
        <div className="wrap">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Trabajos recientes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <figure key={p.title} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                <Placeholder label={`Foto: ${p.title}`} className={i % 3 === 0 ? "aspect-[21/9] w-full" : "aspect-[4/3] w-full"} />
                <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-lg font-semibold">{p.title}</span>
                  <span className="text-sm text-steel">{p.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section scroll-mt-20 bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2>
            <p className="mt-4 text-lg text-steel">
              ¿Tienes otra duda? <Link href="/contact" className="font-semibold text-copper underline underline-offset-4">Escríbenos un mensaje</Link>.
            </p>
          </div>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl leading-none text-copper transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-prose text-steel">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-ink text-white">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Lo que dicen quienes ya nos llamaron</h2>
            <div className="flex items-center gap-4">
              <p className="font-display text-6xl font-bold leading-none">{reviews.score}</p>
              <div>
                <Stars rating={5} className="text-white" />
                <p className="mt-1.5 text-sm text-white/70">de 5, según {reviews.count} reseñas</p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:grid-rows-2">
            {/* Featured */}
            <figure className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-copper p-8 sm:p-12 lg:col-span-3 lg:row-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[16rem] font-bold leading-none text-white/15">
                &rdquo;
              </span>
              <div className="relative">
                <Stars rating={featured.rating ?? 5} fill="#fff" />
                <blockquote className="mt-6 font-display text-2xl font-medium leading-snug sm:text-[2rem] sm:leading-[1.25]">
                  {featured.text}
                </blockquote>
              </div>
              <figcaption className="relative mt-10 flex flex-wrap items-center gap-4">
                <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white font-display text-lg font-bold text-copper-dark">
                  {initials(featured.name)}
                </span>
                <span>
                  <span className="block text-lg font-semibold">{featured.name}</span>
                  <span className="text-white/85">{featured.role}</span>
                </span>
                <span className="rounded-full bg-ink/25 px-3.5 py-1.5 text-sm sm:ml-auto">{featured.service}</span>
              </figcaption>
            </figure>

            {/* Secondary */}
            {others.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.06] p-7 lg:col-span-2">
                <div>
                  <Stars rating={t.rating ?? 5} />
                  <blockquote className="mt-4 text-lg leading-relaxed text-white/90">{t.text}</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-copper-bright font-display font-bold text-ink">
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block truncate text-sm text-white/65">{t.role} &middot; {t.service}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="wrap">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Las personas que llegarán a tu puerta</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink font-display text-xl font-bold text-white"
                >
                  {initials(m.name)}
                </span>
                <span>
                  <span className="block text-lg font-semibold">{m.name}</span>
                  <span className="text-steel">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-mist">
        <div className="wrap flex flex-col items-start gap-6 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Cuéntanos qué pasa. Te enviamos una cotización en menos de un día.</h2>
          <Link href="/quote" className="btn btn-primary shrink-0 !px-8 !py-4 text-lg">Iniciar mi cotización</Link>
        </div>
      </section>
    </>
  );
}
