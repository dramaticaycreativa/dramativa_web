export type EventType = "teatro" | "cine" | "musica" | "muestra";

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
  image?: string;
  tags?: ("estreno" | "ultimas-funciones" | "gratis" | "destacado")[];
  views?: number;
  ticketUrl?: string;
}

export const events: CulturalEvent[] = [
  {
    id: "1",
    title: "La gaviota errante",
    type: "teatro",
    date: "2026-05-08T21:00:00",
    venue: "Sala Itinerante",
    address: "Av. Rivadavia 2345, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+2345+CABA",
    price: "$6.000",
    description:
      "Una relectura libre del clásico de Chéjov, atravesada por la mirada contemporánea de tres dramaturgas locales. Una obra sobre el deseo, el fracaso y la búsqueda artística.",
    tags: ["estreno", "destacado"],
    views: 1240,
  },
  {
    id: "2",
    title: "Ciclo de cine independiente: Voces del sur",
    type: "cine",
    date: "2026-05-10T20:00:00",
    venue: "Cine Club Lumière",
    address: "Bolívar 870, CABA",
    mapsUrl: "https://maps.google.com/?q=Bolívar+870+CABA",
    price: "Gratis",
    description:
      "Cuatro cortometrajes latinoamericanos seleccionados por su mirada poética sobre los márgenes urbanos. Función con presencia de directores.",
    tags: ["gratis"],
    views: 890,
  },
  {
    id: "3",
    title: "Trío Penumbra — Jazz contemporáneo",
    type: "musica",
    date: "2026-05-12T22:30:00",
    venue: "Bar Notorious",
    address: "Av. Callao 966, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Callao+966+CABA",
    price: "$8.500",
    description:
      "Una noche íntima de jazz contemporáneo con composiciones originales del trío liderado por la pianista Lucía Méndez.",
    views: 540,
  },
  {
    id: "4",
    title: "Cuerpos en deriva — Muestra colectiva",
    type: "muestra",
    date: "2026-05-15T18:00:00",
    venue: "Centro Cultural Recoleta",
    address: "Junín 1930, CABA",
    mapsUrl: "https://maps.google.com/?q=Junín+1930+CABA",
    price: "Gratis",
    description:
      "Quince artistas visuales exploran el cuerpo como territorio político. Pintura, instalación y performance.",
    tags: ["gratis", "destacado"],
    views: 2100,
  },
  {
    id: "5",
    title: "Hamlet, fragmentos",
    type: "teatro",
    date: "2026-05-18T20:30:00",
    venue: "Teatro El Extranjero",
    address: "Valentín Gómez 3378, CABA",
    mapsUrl: "https://maps.google.com/?q=Valentín+Gómez+3378+CABA",
    price: "$7.500",
    description:
      "Una versión despojada del clásico shakesperiano interpretada por un solo actor sobre un escenario vacío.",
    tags: ["ultimas-funciones"],
    views: 1680,
  },
  {
    id: "6",
    title: "El cuarto silencioso",
    type: "teatro",
    date: "2026-05-22T21:00:00",
    venue: "Espacio Callejón",
    address: "Humahuaca 3759, CABA",
    mapsUrl: "https://maps.google.com/?q=Humahuaca+3759+CABA",
    price: "$5.500",
    description:
      "Drama familiar sobre el regreso a la casa de la infancia. Texto y dirección de Mariana Solís.",
    tags: ["estreno"],
    views: 760,
  },
  {
    id: "7",
    title: "Concierto de cámara: Cuarteto Aurora",
    type: "musica",
    date: "2026-05-25T19:00:00",
    venue: "Auditorio San Martín",
    address: "Av. Corrientes 1530, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Corrientes+1530+CABA",
    price: "$4.000",
    description: "Programa con obras de Schubert, Piazzolla y compositoras contemporáneas argentinas.",
    views: 410,
  },
  {
    id: "8",
    title: "La hora del lobo",
    type: "cine",
    date: "2026-05-28T22:00:00",
    venue: "MALBA",
    address: "Av. Figueroa Alcorta 3415, CABA",
    mapsUrl: "https://maps.google.com/?q=MALBA+CABA",
    price: "$3.500",
    description: "Función especial del clásico de Bergman con introducción crítica.",
    views: 980,
  },
  {
    id: "9",
    title: "Diálogos con la sombra",
    type: "teatro",
    date: "2026-06-02T20:30:00",
    venue: "Sala Itinerante",
    address: "Av. Rivadavia 2345, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+2345+CABA",
    price: "$6.500",
    description: "Monólogo experimental que explora los límites del lenguaje teatral.",
    tags: ["destacado"],
    views: 1340,
  },
];

export interface Review {
  id: string;
  obra: string;
  nombre: string;
  fecha: string;
  puntuacion: number; // 1-5
  aspectos: string;
  experiencia: string;
  recomendacion: string;
  comentario?: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    obra: "La gaviota errante",
    nombre: "Camila R.",
    fecha: "2026-04-12",
    puntuacion: 5,
    aspectos: "Actuaciones, dirección, vestuario",
    experiencia: "Salí emocionada. Una experiencia que me sacudió por dentro.",
    recomendacion: "Totalmente recomendada para amantes del teatro contemporáneo.",
    comentario: "La escena final con la lluvia es inolvidable.",
  },
  {
    id: "r2",
    obra: "La gaviota errante",
    nombre: "Federico M.",
    fecha: "2026-04-15",
    puntuacion: 4,
    aspectos: "Texto y puesta en escena",
    experiencia: "Muy buen ritmo, el segundo acto se siente algo extenso.",
    recomendacion: "Recomendable, sobre todo si conocés el original de Chéjov.",
  },
  {
    id: "r3",
    obra: "La gaviota errante",
    nombre: "Sofía T.",
    fecha: "2026-04-18",
    puntuacion: 5,
    aspectos: "Iluminación impecable",
    experiencia: "El diseño lumínico hace toda la diferencia.",
    recomendacion: "Sí, sin dudas.",
  },
  {
    id: "r4",
    obra: "Hamlet, fragmentos",
    nombre: "Lautaro P.",
    fecha: "2026-04-08",
    puntuacion: 5,
    aspectos: "Trabajo del actor",
    experiencia: "Una hora y media en estado de hipnosis.",
    recomendacion: "Imperdible.",
    comentario: "Hacía mucho que no veía un trabajo actoral tan honesto.",
  },
  {
    id: "r5",
    obra: "Hamlet, fragmentos",
    nombre: "Valentina G.",
    fecha: "2026-04-10",
    puntuacion: 4,
    aspectos: "Adaptación del texto",
    experiencia: "Me costó entrar al principio, pero luego me atrapó.",
    recomendacion: "Recomendada para públicos pacientes.",
  },
  {
    id: "r6",
    obra: "El cuarto silencioso",
    nombre: "Martín D.",
    fecha: "2026-04-20",
    puntuacion: 4,
    aspectos: "Dramaturgia y dirección",
    experiencia: "Una obra delicada, con momentos muy logrados.",
    recomendacion: "Sí, especialmente si te gusta el teatro de cámara.",
  },
  {
    id: "r7",
    obra: "Diálogos con la sombra",
    nombre: "Julia A.",
    fecha: "2026-04-22",
    puntuacion: 5,
    aspectos: "Riesgo formal",
    experiencia: "Pocas veces vi una propuesta tan radical en sala chica.",
    recomendacion: "Para quienes buscan experiencias distintas.",
    comentario: "Vale el viaje hasta la sala.",
  },
];

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
