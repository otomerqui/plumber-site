import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata: Metadata = { title: "Cotización gratis", description: `Pide una cotización gratis y sin compromiso a ${site.name}.` };

export default function QuotePage({ searchParams }: { searchParams: { service?: string; plan?: string } }) {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="wrap py-16 sm:py-20">
          <ScrollFadeIn>
            <h1 className="text-4xl font-bold sm:text-5xl">Pide tu cotización gratis</h1>
          </ScrollFadeIn>
          <ScrollFadeIn delay={100}>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Dos pasos rápidos. Cuéntanos sobre el trabajo y luego cómo contactarte. Sin compromiso.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <ScrollFadeIn delay={200}>
            <QuoteForm defaultService={searchParams.service} defaultPlan={searchParams.plan} />
          </ScrollFadeIn>
          <aside className="h-fit rounded-2xl bg-mist p-7 lg:sticky lg:top-28">
            <ScrollFadeIn>
              <h2 className="text-xl font-bold">¿Prefieres hablar con alguien?</h2>
            </ScrollFadeIn>
            <ScrollFadeIn delay={100}>
             <p className="mt-2 text-steel">Llama a cualquier hora. Las emergencias se atienden 24/7.</p>
            </ScrollFadeIn>
            <ScrollFadeIn delay={200}>
              <a href={site.phoneHref} className="mt-4 block text-2xl font-bold text-copper hover:underline">{site.phone}</a>
            </ScrollFadeIn>
            <ScrollFadeIn delay={300}>
              <h3 className="mt-8 text-lg font-semibold">Qué pasa después</h3>
            </ScrollFadeIn>
            <ScrollFadeIn delay={400}>
              <ul className="mt-2 space-y-2 text-steel">
                <li>Revisamos tu solicitud, normalmente el mismo día.</li>
                <li>Te contactamos si necesitamos fotos o una visita rápida.</li>
                <li>Recibes un precio por escrito antes de empezar cualquier trabajo.</li>
              </ul>
            </ScrollFadeIn>
          </aside>
        </div>
      </section>
    </>
  );
}
