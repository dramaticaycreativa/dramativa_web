import portrait from "@/assets/dramativa-portrait.jpg";
import { Instagram, Facebook, Youtube } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.1 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.14-.24z" />
  </svg>
);

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: TikTokIcon, label: "TikTok", href: "https://tiktok.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export const Dramativa = () => {
  return (
    <article>
      {/* HERO */}
      <section className="relative bg-gradient-stage text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_hsl(46_67%_56%/0.4),_transparent_60%)]" />
        <div className="container-stage relative grid md:grid-cols-12 gap-10 py-20 md:py-32 items-center">
          <div className="md:col-span-7 animate-curtain-rise">
            <p className="ornament text-gold uppercase text-xs tracking-[0.4em] mb-6 inline-block">
              Manifiesto
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-balance">
              El teatro <em className="text-gold not-italic font-normal italic">no se mira</em>,
              <br /> se respira.
            </h1>
            <p className="text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
              Soy actriz, gestora y agitadora cultural. Dramativa es mi forma de sostener
              y mostrar lo que pasa en las salas independientes que aún se atreven.
            </p>
          </div>
          <div className="md:col-span-5 animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-4 border border-gold/40 -rotate-2" />
              <img
                src={portrait}
                alt="Retrato editorial de la creadora de Dramativa"
                width={1024}
                height={1280}
                className="relative w-full object-cover shadow-stage"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUIÉN SOY */}
      <section className="container-stage py-20 md:py-28 max-w-4xl">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">A. Quién soy</p>
        <h2 className="font-display text-4xl md:text-5xl mb-10 text-balance">
          Llegué al teatro buscando una forma de habitar el mundo.
        </h2>
        <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-6">
          <p className="drop-cap text-lg">
            Empecé a los catorce, en un sótano sin calefacción, leyendo a García Lorca con cinco
            chicas más. No sabíamos que aquello era teatro: era una forma urgente de decirnos
            cosas que en otros lados no se podían decir. Veintidós años después, sigo creyendo
            que el escenario es ese mismo sótano: un lugar donde algo verdadero está por pasar.
          </p>
          <p>
            Trabajé como actriz, como asistente de dirección, como productora, como acomodadora.
            En cada rol entendí algo distinto sobre lo escénico: que el teatro independiente se
            sostiene con cuerpos, no con presupuestos.
          </p>
        </div>
      </section>

      <div className="gold-rule container-stage" />

      {/* CAMINO */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-stage grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">B. Camino</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Lo que me <em className="text-primary">define</em> hoy.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            {[
              {
                t: "Me interesan las obras incómodas.",
                d: "Las que no buscan agradar. Las que arriesgan forma, las que se animan al silencio largo, las que confían en el público adulto.",
              },
              {
                t: "Construyo comunidad, no audiencia.",
                d: "Dramativa no es un medio: es un punto de encuentro entre quienes hacen, quienes ven y quienes enseñan teatro en mi ciudad.",
              },
              {
                t: "Escribo lo que veo.",
                d: "Reseño cada obra que voy a ver. No para juzgar, sino para dejar registro de que algo, alguna noche, sucedió.",
              },
            ].map((b, i) => (
              <div key={i} className="border-l-2 border-gold pl-6">
                <h3 className="font-display text-2xl md:text-3xl mb-2">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECCIÓN */}
      <section className="container-stage py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">C. Proyección</p>
          <h2 className="font-display text-4xl md:text-5xl text-balance">
            Hacia dónde camina esto.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "En un año", d: "Convertir Dramativa en referencia local de cartelera independiente, con publicación semanal y críticos invitados." },
            { n: "02", t: "Profesionalmente", d: "Estrenar mi próxima obra como dramaturga y dirigir un ciclo de lecturas escénicas de autoras emergentes." },
            { n: "03", t: "A largo plazo", d: "Sostener un espacio físico: una sala chica donde se pueda fallar, ensayar y empezar de nuevo." },
          ].map((b) => (
            <div key={b.n} className="ticket-card p-8">
              <div className="font-display italic text-5xl text-gold mb-4">{b.n}</div>
              <h3 className="font-display text-xl mb-3">{b.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-gradient-stage text-white py-24">
        <div className="container-stage max-w-4xl text-center">
          <p className="font-display italic text-3xl md:text-5xl leading-tight text-balance">
            “Hacer teatro independiente, hoy, es una forma de no mentirse.
            <br />
            <span className="text-gold">Y mostrarlo es una forma de cuidarlo.”</span>
          </p>
        </div>
      </section>

      {/* SOCIALES */}
      <section className="container-stage py-20 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">D. Encontrame</p>
        <h2 className="font-display text-3xl md:text-4xl mb-10">Seguí lo que pasa.</h2>
        <div className="flex justify-center gap-4">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-14 h-14 flex items-center justify-center border border-border hover:border-gold hover:bg-gold hover:text-gold-foreground transition-all duration-300 hover:-translate-y-1"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </section>
    </article>
  );
};
