import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata: Metadata = { title: "Contacto", description: `Llama, escribe o envía un mensaje a ${site.name}.` };

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="wrap py-16 sm:py-20">
          <ScrollFadeIn>
            <h1 className="text-4xl font-bold sm:text-5xl">Contáctanos</h1>
          </ScrollFadeIn>
          <ScrollFadeIn delay={100}>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Llámanos si es urgente. Para todo lo demás, envía un mensaje y te respondemos en un día hábil.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-9">
            <div>
              <ScrollFadeIn>
                <h2 className="text-xl font-semibold">Teléfono (emergencias 24/7)</h2>
              </ScrollFadeIn>
              <ScrollFadeIn delay={100}>
                <a href={site.phoneHref} className="mt-1 block text-2xl font-bold text-copper hover:underline">{site.phone}</a>
              </ScrollFadeIn>
            </div>
            <ScrollFadeIn delay={200}>
              <div>
                <h2 className="text-xl font-semibold">Correo electrónico</h2>
                <a href={`mailto:${site.email}`} className="mt-1 block text-lg text-steel hover:text-copper">{site.email}</a>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={300}>
              <div>
                <h2 className="text-xl font-semibold">Oficina</h2>
                <p className="mt-1 text-lg text-steel">{site.address}</p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={400}>
              <div>
                <h2 className="text-xl font-semibold">Horario</h2>
                <ul className="mt-1 space-y-1 text-steel">
                  {site.hours.map((h) => (
                    <li key={h.days}><span className="font-semibold text-ink">{h.days}:</span> {h.time}</li>
                  ))}
                </ul>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={500}>
              <p className="rounded-xl bg-mist p-5 text-steel">
                ¿Necesitas el precio de un trabajo específico? El <Link href="/quote" className="font-semibold text-copper underline underline-offset-4">formulario de cotización</Link> es más rápido.
              </p>
            </ScrollFadeIn>
          </div>

          <div>
            <ScrollFadeIn>
              <h2 className="mb-6 text-2xl font-bold">Envíanos un mensaje</h2>
            </ScrollFadeIn>
            <ScrollFadeIn delay={100}>
              <ContactForm />
            </ScrollFadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
