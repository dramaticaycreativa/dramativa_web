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
    nombre: "Estudio La Trastienda",
    docente: "Mariana Solís",
    horarios: "Lun y Mié · 19 a 22 hs",
    inicio: "5 de mayo",
    precio: "$28.000 / mes",
    whatsapp: "https://wa.me/5491100000001",
    mapsUrl: "https://maps.google.com/?q=Humahuaca+3759+CABA",
    modalidad: "Presencial",
  },
  {
    id: "e2",
    nombre: "Taller Escena Abierta",
    docente: "Diego Vela",
    horarios: "Sáb · 11 a 14 hs",
    inicio: "10 de mayo",
    precio: "$22.000 / mes",
    whatsapp: "https://wa.me/5491100000002",
    mapsUrl: "https://maps.google.com/?q=Av.+Corrientes+1530+CABA",
    modalidad: "Presencial / Híbrido",
  },
  {
    id: "e3",
    nombre: "Laboratorio del Cuerpo",
    docente: "Lucía Méndez",
    horarios: "Mar y Jue · 18 a 20 hs",
    inicio: "12 de mayo",
    precio: "$24.000 / mes",
    whatsapp: "https://wa.me/5491100000003",
    mapsUrl: "https://maps.google.com/?q=Junín+1930+CABA",
    modalidad: "Presencial",
  },
  {
    id: "e4",
    nombre: "Escuela El Extranjero",
    docente: "Equipo docente",
    horarios: "Vie · 18 a 22 hs",
    inicio: "9 de mayo",
    precio: "$30.000 / mes",
    whatsapp: "https://wa.me/5491100000004",
    mapsUrl: "https://maps.google.com/?q=Valentín+Gómez+3378+CABA",
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
