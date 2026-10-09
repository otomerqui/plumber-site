import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Cotización gratis", description: `Pide una cotización gratis y sin compromiso a ${site.name}.` };

export default function QuotePage({ searchParams }: { searchParams: { service?: string; plan?: string } }) {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="wrap py-16 sm:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">Pide tu cotización gratis</h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Dos pasos rápidos. Cuéntanos sobre el trabajo y luego cómo contactarte. Sin compromiso.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <QuoteForm defaultService={searchParams.service} defaultPlan={searchParams.plan} />
          <aside className="h-fit rounded-2xl bg-mist p-7 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold">¿Prefieres hablar con alguien?</h2>
            <p className="mt-2 text-steel">Llama a cualquier hora. Las emergencias se atienden 24/7.</p>
            <a href={site.phoneHref} className="mt-4 block text-2xl font-bold text-copper hover:underline">{site.phone}</a>
            <h3 className="mt-8 text-lg font-semibold">Qué pasa después</h3>
            <ul className="mt-2 space-y-2 text-steel">
              <li>Revisamos tu solicitud, normalmente el mismo día.</li>
              <li>Te contactamos si necesitamos fotos o una visita rápida.</li>
              <li>Recibes un precio por escrito antes de empezar cualquier trabajo.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
