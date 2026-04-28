// ============================================================
// Cartelera + reseñas ahora viven en la base de datos.
// Este archivo conserva tipos compartidos y los datos
// estáticos que no cambian seguido (escuelas).
// ============================================================

export type EventType = "teatro" | "cine" | "musica" | "muestra";
export type EventTag = "estreno" | "ultimas-funciones" | "gratis" | "destacado";

export interface CulturalEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO
  venue: string;
  address: string;
  mapsUrl: string;
  price: string;
  description: string;
  image?: string | null;
  tags?: EventTag[];
  ticketUrl?: string | null;
}

export interface Review {
  id: string;
  eventId: string;
  obra: string;
  nombre: string;
  fecha: string;
  puntuacion: number;
  aspectos: string;
  experiencia: string;
  recomendacion: string;
  comentario?: string | null;
}

export interface Escuela {
  id: string;
  nombre: string;
  docente: string;
  horarios: string;
  inicio: string;
  precio: string;
  whatsapp: string;
  mapsUrl: string;
  modalidad: string;
}

export const escuelas: Escuela[] = [
  {
    id: "e1",
    nombre: "Teatro comunitario · Centro Cultural Jorge Accame",
    docente: "Eduardo López",
    horarios: "Mié y Jue · 17:30 a 18:30 hs",
    inicio: "Marzo",
    precio: "Gratuito · inscripción previa (cupos limitados)",
    whatsapp: "https://www.instagram.com/centroculturaljorgeaccame/",
    mapsUrl: "https://maps.app.goo.gl/McHZQGunnzw3prcZ9",
    modalidad: "Presencial",
  },
  {
    id: "e2",
    nombre: "Taller de teatro comunitario · Experiencia Biblioteca Viva",
    docente: "Centro Cultural Héctor Tizón",
    horarios: "Lun · 18:30 a 19:30 hs",
    inicio: "16 de marzo",
    precio: "Consultar · inscripción previa",
    whatsapp: "https://www.instagram.com/centroculturalhectortizon/",
    mapsUrl: "https://maps.app.goo.gl/7HH62Ea5uxMWfpTz5",
    modalidad: "Presencial",
  },
  {
    id: "e3",
    nombre: "Taller de teatro comunitario",
    docente: "Gabriela Espinoza",
    horarios: "Jue · 8:30 a 10:30 hs",
    inicio: "5 de marzo",
    precio: "Gratuito · inscripción previa",
    whatsapp: "https://www.facebook.com/profile.php?id=100063766174559",
    mapsUrl: "https://maps.app.goo.gl/4Fm9MxxNMPYcxBaw7",
    modalidad: "Presencial",
  },
  {
    id: "e4",
    nombre: "Taller de teatro de la UNJu",
    docente: "Guillermo Rocha",
    horarios: "Jue · 19 a 21 hs (18 a 60 años) · 17 a 18:30 hs (+60 años)",
    inicio: "9 de abril · inscripción previa",
    precio: "Consultar",
    whatsapp: "https://www.instagram.com/extension_unju/",
    mapsUrl: "https://maps.app.goo.gl/DYPE7s1eFXBW6uuY8",
    modalidad: "Presencial",
  },
];

// Mapper DB row -> CulturalEvent
export const mapEvent = (row: any): CulturalEvent => ({
  id: row.id,
  title: row.title,
  type: row.type,
  date: row.date,
  venue: row.venue,
  address: row.address,
  mapsUrl: row.maps_url ?? "",
  price: row.price,
  description: row.description,
  image: row.image,
  tags: row.tags ?? [],
  ticketUrl: row.ticket_url,
});
