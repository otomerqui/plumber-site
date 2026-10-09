"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site";

type Data = {
  service: string; property: string; urgency: string; details: string;
  name: string; email: string; phone: string; area: string; time: string;
};
type Errors = Partial<Record<keyof Data, string>>;

const properties = ["Casa", "Apartamento", "Local comercial"];
const urgencies = ["Emergencia (hoy)", "Esta semana", "Sin prisa"];
const times = ["Mañana", "Tarde", "Noche", "Cualquier hora"];

function validate(step: 1 | 2, d: Data): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.service) e.service = "Elige el servicio que necesitas.";
    if (!d.property) e.property = "Elige el tipo de inmueble.";
    if (!d.urgency) e.urgency = "Elige qué tan pronto nos necesitas.";
    if (d.details.trim().length < 10) e.details = "Describe el problema (mínimo 10 caracteres).";
  } else {
    if (d.name.trim().length < 2) e.name = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Escribe un correo electrónico válido.";
    if (d.phone.replace(/\D/g, "").length < 7) e.phone = "Escribe un teléfono donde podamos contactarte.";
    if (d.area.trim().length < 3) e.area = "Escribe tu dirección o código postal.";
    if (!d.time) e.time = "Elige un horario preferido para contactarte.";
  }
  return e;
}

function Choice({
  name, value, checked, onChange, children,
}: { name: string; value: string; checked: boolean; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <span className="block rounded-lg border border-steel/40 px-4 py-3 text-[15px] font-medium transition-colors peer-checked:border-copper peer-checked:bg-copper-light peer-checked:text-copper-dark peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-copper-bright hover:border-copper">
        {children}
      </span>
    </label>
  );
}

export default function QuoteForm({ defaultService = "", defaultPlan = "" }: { defaultService?: string; defaultPlan?: string }) {
  const validService = services.some((s) => s.slug === defaultService) ? defaultService : "";
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<Data>({
    service: validService, property: "", urgency: "", time: "",
    details: defaultPlan && validService === "care-plan" ? `Me interesa el plan ${defaultPlan} de cuidado del hogar.` : "",
    name: "", email: "", phone: "", area: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "done">("idle");
  const [reference, setReference] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headingRef.current?.focus();
  }, [step, status]);

  const update = (k: keyof Data) => (v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const text = (k: keyof Data) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(k)(ev.target.value);
  const aria = (k: keyof Data) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  function next() {
    const found = validate(1, data);
    setErrors(found);
    if (!Object.keys(found).length) setStep(2);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate(2, data);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setReference(json.reference);
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") {
    const svc = services.find((s) => s.slug === data.service)?.title;
    return (
      <div role="status" className="rounded-2xl bg-mist p-8 sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-bold outline-none">Solicitud de cotización recibida</h2>
        <p className="mt-3 max-w-lg text-lg text-steel">
          Gracias, {data.name.split(" ")[0]}. Revisaremos los detalles y te contactaremos por {data.time === "Cualquier hora" ? "teléfono o correo" : `teléfono o correo en la ${data.time.toLowerCase()}`}.
          La mayoría de las cotizaciones salen en un día hábil.
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2">
          <div><dt className="font-semibold">Referencia</dt><dd className="text-steel">{reference}</dd></div>
          <div><dt className="font-semibold">Servicio</dt><dd className="text-steel">{svc}</dd></div>
          <div><dt className="font-semibold">Inmueble</dt><dd className="text-steel">{data.property}</dd></div>
          <div><dt className="font-semibold">Urgencia</dt><dd className="text-steel">{data.urgency}</dd></div>
        </dl>
      </div>
    );
  }

  const steps = ["El trabajo", "Tus datos"];

  return (
    <div>
      <ol className="mb-10 flex gap-3" aria-label="Progreso">
        {steps.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const complete = step > n;
          return (
            <li key={label} aria-current={active ? "step" : undefined} className="flex-1">
              <span className={`block h-1.5 rounded-full ${active || complete ? "bg-copper" : "bg-ink/15"}`} />
              <span className={`mt-2 block text-sm font-semibold ${active ? "text-ink" : "text-steel"}`}>
                Paso {n} de 2: {label}
              </span>
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate className="space-y-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">¿Qué necesitas que hagamos?</h2>

          <div>
            <label htmlFor="service" className="label">Servicio</label>
            <select
              id="service" name="service" value={data.service}
              onChange={(e) => update("service")(e.target.value)}
              className="field" {...aria("service")}
            >
              <option value="">Selecciona un servicio</option>
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
            {errors.service && <p id="service-err" className="error">{errors.service}</p>}
          </div>

          <fieldset aria-describedby={errors.property ? "property-err" : undefined}>
            <legend className="label">Tipo de inmueble</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {properties.map((p) => (
                <Choice key={p} name="property" value={p} checked={data.property === p} onChange={update("property")}>{p}</Choice>
              ))}
            </div>
            {errors.property && <p id="property-err" className="error">{errors.property}</p>}
          </fieldset>

          <fieldset aria-describedby={errors.urgency ? "urgency-err" : undefined}>
            <legend className="label">¿Qué tan pronto nos necesitas?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {urgencies.map((u) => (
                <Choice key={u} name="urgency" value={u} checked={data.urgency === u} onChange={update("urgency")}>{u}</Choice>
              ))}
            </div>
            {errors.urgency && <p id="urgency-err" className="error">{errors.urgency}</p>}
          </fieldset>

          <div>
            <label htmlFor="details" className="label">Describe el problema</label>
            <textarea
              id="details" name="details" rows={5} value={data.details} onChange={text("details")}
              placeholder="¿Dónde está, qué está pasando y desde cuándo?"
              className="field" {...aria("details")}
            />
            {errors.details && <p id="details-err" className="error">{errors.details}</p>}
          </div>

          <button type="submit" className="btn btn-primary">Continuar con tus datos</button>
        </form>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-6">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">¿Cómo te contactamos?</h2>

          <div>
            <label htmlFor="name" className="label">Nombre completo</label>
            <input id="name" name="name" autoComplete="name" value={data.name} onChange={text("name")} className="field" {...aria("name")} />
            {errors.name && <p id="name-err" className="error">{errors.name}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="label">Correo electrónico</label>
              <input id="email" name="email" type="email" autoComplete="email" value={data.email} onChange={text("email")} className="field" {...aria("email")} />
              {errors.email && <p id="email-err" className="error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="label">Teléfono</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={data.phone} onChange={text("phone")} className="field" {...aria("phone")} />
              {errors.phone && <p id="phone-err" className="error">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="area" className="label">Dirección del trabajo o código postal</label>
            <input id="area" name="area" autoComplete="postal-code" value={data.area} onChange={text("area")} className="field" {...aria("area")} />
            {errors.area && <p id="area-err" className="error">{errors.area}</p>}
          </div>

          <fieldset aria-describedby={errors.time ? "time-err" : undefined}>
            <legend className="label">Mejor horario para contactarte</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {times.map((t) => (
                <Choice key={t} name="time" value={t} checked={data.time === t} onChange={update("time")}>{t}</Choice>
              ))}
            </div>
            {errors.time && <p id="time-err" className="error">{errors.time}</p>}
          </fieldset>

          {status === "failed" && (
            <p role="alert" className="error">No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn border-2 border-ink/25 hover:border-ink">Atrás</button>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
              {status === "sending" ? "Enviando..." : "Pedir mi cotización"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
