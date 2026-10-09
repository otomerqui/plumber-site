// Single place to edit business details and page content.

export const site = {
  name: "Copperline",
  description: "Servicios de plomería y mantenimiento del hogar con precios claros y atención de emergencias 24/7.",
  phone: "+57 300 123 4567",
  phoneHref: "tel:+573001234567",
  whatsapp: "573001234567", // digits only, with country code
  whatsappMessage: "Hola, quisiera información sobre sus servicios de plomería.",
  email: "hola@copperline.example",
  address: "Calle 72 #45-20, Tu Ciudad",
  currency: "USD",
  hours: [
    { days: "Lunes a viernes", time: "8:00 a. m. a 6:00 p. m." },
    { days: "Sábados", time: "9:00 a. m. a 4:00 p. m." },
    { days: "Domingos", time: "Solo emergencias" },
  ],
};

export const services = [
  { slug: "emergency-repairs", title: "Reparaciones de emergencia", blurb: "Tubería rota, inodoro desbordado, sin agua. Contestamos 24/7 y buscamos llegar en menos de una hora dentro de nuestra zona." },
  { slug: "leak-detection", title: "Detección y reparación de fugas", blurb: "Encontramos fugas ocultas en paredes y pisos y las reparamos sin romper más de lo necesario." },
  { slug: "drain-cleaning", title: "Destape de desagües", blurb: "Lavaplatos lentos, duchas tapadas, tuberías colapsadas. Destapamos con la herramienta correcta y revisamos con cámara." },
  { slug: "water-heaters", title: "Calentadores de agua", blurb: "Reparación, reemplazo e instalación de calentadores de tanque y de paso, normalmente en una sola visita." },
  { slug: "fixtures", title: "Instalación de grifería y sanitarios", blurb: "Grifos, lavamanos, inodoros, duchas y trituradores instalados, sellados y probados antes de irnos." },
  { slug: "repiping", title: "Cambio de tuberías", blurb: "Redes de agua corroídas o en mal estado, cambiadas por tramos o en toda la casa, con precio fijo por escrito." },
  { slug: "handyman", title: "Mantenimiento y arreglos", blurb: "Esos arreglos pequeños que se acumulan: resanes, puertas, muebles, instalar y colgar cosas, sellado y más." },
  { slug: "care-plan", title: "Plan de cuidado del hogar", blurb: "Revisión anual y prioridad de agenda por una cuota mensual baja. Mira los planes más abajo." },
];

export const plans = [
  { name: "Básico", price: 19, featured: false, items: ["Inspección anual de plomería", "10 % de descuento en reparaciones", "Prioridad para agendar"] },
  { name: "Estándar", price: 39, featured: true, items: ["Todo lo del plan Básico", "Inspección dos veces al año", "Sin costo de visita", "Emergencias atendidas en máximo 2 horas"] },
  { name: "Premium", price: 59, featured: false, items: ["Todo lo del plan Estándar", "20 % de descuento en reparaciones", "Un destape de desagüe gratis al año", "Lavado del calentador incluido"] },
];

export const features = [
  { title: "Respuesta rápida", text: "Una persona real contesta el teléfono y casi siempre tienes un plomero agendado en minutos." },
  { title: "Precio antes de empezar", text: "Recibes una cotización por escrito primero. Si encontramos algo adicional, te preguntamos antes de tocarlo." },
  { title: "Trabajo limpio y cuidadoso", text: "Protegemos pisos y muebles y dejamos todo limpio al terminar. Ni se nota que estuvimos allí." },
  { title: "Trabajo con garantía", text: "Cada reparación incluye garantía por escrito. Si falla, volvemos y la arreglamos." },
];

export const stats = [
  { value: "3.400+", label: "trabajos realizados" },
  { value: "98 %", label: "de los clientes nos vuelven a llamar o nos recomiendan" },
  { value: "4,9", label: "calificación promedio" },
  { value: "24/7", label: "línea de emergencias, todos los días" },
];

export const projects = [
  { title: "Cambio de tuberías en cocina, casa de los años 60", tag: "Cambio de tuberías" },
  { title: "Fuga en losa encontrada y reparada", tag: "Detección de fugas" },
  { title: "Cambio a calentador de paso", tag: "Calentadores de agua" },
  { title: "Baño completo: grifería y sanitarios", tag: "Instalación de grifería" },
];

export const faqs = [
  { q: "¿Qué tan rápido pueden llegar?", a: "En emergencias buscamos llegar en menos de una hora dentro de nuestra zona de servicio. Para trabajos normales, casi siempre tenemos cupo en uno o dos días." },
  { q: "¿Qué hago mientras llega el plomero?", a: "Cierra la llave de paso principal, apaga el calentador si la fuga está cerca y aleja tus cosas del agua. Por teléfono te guiamos paso a paso." },
  { q: "¿Cobran por cotizar?", a: "No. Las cotizaciones en línea son gratis. Si necesitamos ir a ver el problema, el costo de la visita se descuenta si decides hacer el trabajo con nosotros." },
  { q: "¿Tienen licencia y seguro?", a: "Sí. Todos nuestros plomeros tienen licencia, antecedentes verificados y seguro de responsabilidad civil. Agrega aquí tu número de licencia antes de publicar." },
];

export const reviews = {
  score: "4,9",
  count: "320",
};

export const testimonials = [
  {
    name: "Juanita Flores",
    role: "Propietaria",
    service: "Reparación de emergencia",
    text: "Se rompió una tubería un domingo en la noche. Me contestaron de inmediato y el plomero estaba en mi puerta en menos de una hora. Me explicó todo antes de empezar y dejó la cocina más limpia de como la encontró.",
    rating: 5,
    featured: true,
  },
  {
    name: "Camila Rojas",
    role: "Administra seis apartamentos",
    service: "Cambio de tuberías",
    text: "Copperline se encarga de todos mis inmuebles. Cotizaciones claras y cero sorpresas en la factura.",
    rating: 5,
    featured: false,
  },
  {
    name: "Marcos Díaz",
    role: "Dueño de restaurante",
    service: "Trabajo comercial",
    text: "Cambiaron la línea de la trampa de grasa fuera de horario y no perdimos ni un servicio. Muy profesionales.",
    rating: 5,
    featured: false,
  },
];

export const team = [
  { name: "Andrés Rojas", role: "Plomero principal" },
  { name: "Elena Torres", role: "Gerente de operaciones" },
  { name: "Esteban Herrera", role: "Líder de mantenimiento" },
];
