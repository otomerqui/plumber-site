"use client";
import { useState } from "react";

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", phone: "", message: "" };

function validate(d: Fields): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Escribe tu nombre.";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Escribe un correo electrónico válido.";
  if (d.phone && d.phone.replace(/\D/g, "").length < 7) e.phone = "Escribe un teléfono válido o déjalo en blanco.";
  if (d.message.trim().length < 10) e.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  return e;
}

export default function ContactForm() {
  const [data, setData] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: ev.target.value }));

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setData(empty);
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-mist p-8">
        <h2 className="text-2xl font-bold">Mensaje enviado</h2>
        <p className="mt-2 text-steel">Gracias por escribirnos. Respondemos en un día hábil.</p>
        <button type="button" className="btn btn-dark mt-6" onClick={() => setStatus("idle")}>Enviar otro mensaje</button>
      </div>
    );
  }

  const field = (k: keyof Fields) => ({
    id: k,
    name: k,
    value: data[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="label">Nombre completo</label>
        <input {...field("name")} autoComplete="name" className="field" />
        {errors.name && <p id="name-err" className="error">{errors.name}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="label">Correo electrónico</label>
          <input {...field("email")} type="email" autoComplete="email" className="field" />
          {errors.email && <p id="email-err" className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="label">Teléfono (opcional)</label>
          <input {...field("phone")} type="tel" autoComplete="tel" className="field" />
          {errors.phone && <p id="phone-err" className="error">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">¿En qué podemos ayudarte?</label>
        <textarea {...field("message")} rows={6} className="field" />
        {errors.message && <p id="message-err" className="error">{errors.message}</p>}
      </div>
      {status === "failed" && (
        <p role="alert" className="error">No pudimos enviar tu mensaje. Inténtalo de nuevo o llámanos.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
