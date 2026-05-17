import portrait from "@/assets/dramativa-portrait.png";
import { Instagram, Youtube, Mail } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.1 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.14-.24z" />
  </svg>
);

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/dramaticaycreativa/" },
  { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@dramaticaycreativa" },
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@Dramaticaycreativa" },
];

const ejes = [
  {
    n: "01",
    t: "El amor en sus zonas oscuras",
    d: "Dependencia, control, sacrificio, imposibles. Hablar del amor sin endulzarlo.",
  },
  {
    n: "02",
    t: "Verdad vs. apariencia",
    d: "Las redes, el “estar bien”, las estructuras que nos piden mostrar lo que no sentimos.",
  },
  {
    n: "03",
    t: "El teatro como experiencia transformadora",
    d: "No entretenimiento: una herramienta para pensar, sentir y vincularse.",
  },
];

export const Dramativa = () => {
  return (
    <article>
      {/* HERO · MANIFIESTO */}
      <section
        className="relative overflow-hidden text-foreground"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 8% 90%) 0%, hsl(220 10% 78%) 60%, hsl(220 12% 68%) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_hsl(46_67%_56%/0.35),_transparent_60%)]" />
        <div className="container-stage relative grid md:grid-cols-12 gap-10 py-20 md:py-32 items-center">
          <div className="md:col-span-7 animate-curtain-rise">
            <p className="ornament text-gold uppercase text-xs tracking-[0.4em] mb-6 inline-block">
              Manifiesto
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-balance text-primary-deep">
              No traduzco obras.
              <br />
              <em className="text-gold not-italic font-normal italic">Traduzco lo que nos pasa.</em>
            </h1>
            <p className="text-lg md:text-xl text-primary-deep/80 max-w-xl leading-relaxed">
              Dramática y Creativa no es una agenda cultural. Es un puente entre el teatro
              independiente jujeño y vos: una excusa para hablar de lo que sentimos, conectarnos
              con otros y animarnos a mirar lo que muchas veces evitamos.
            </p>
          </div>
          <div className="md:col-span-5 animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-4 border border-gold/60 -rotate-2" />
              <img
                src={portrait}
                alt="Retrato editorial de Dramática y Creativa"
                width={1024}
                height={1280}
                className="relative w-full object-cover shadow-stage"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="container-stage py-20 md:py-28 max-w-4xl">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">A. Qué hago</p>
        <h2 className="font-display text-4xl md:text-5xl mb-10 text-balance">
          Uso el teatro como excusa para nombrar lo que cuesta nombrar.
        </h2>
        <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-6">
          <p className="drop-cap text-lg">
            Hago mediación emocional entre el público y el teatro independiente jujeño. Eso
            significa que no escribo reseñas técnicas ni armo agenda: traduzco las obras en
            preguntas, conflictos y emociones humanas. Convierto lo escénico en algo cercano,
            actual, necesario.
          </p>
          <p>
            Mi propuesta no es que vayas a ver una obra. Es que te veas a vos en lo que ves.
          </p>
          <p>
            Le hablo a quienes no van habitualmente al teatro pero sí consumen contenido que
            los interpela: gente en búsqueda, atravesada emocionalmente, con preguntas sobre
            el amor, la soledad, la vocación, la pertenencia. También a la comunidad cultural
            que quiere sostener lo local desde un lugar sensible.
          </p>
        </div>
      </section>

      <div className="gold-rule container-stage" />

      {/* EJES */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-stage grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">B. Ejes</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Los temas que <em className="text-primary">vuelven</em> en todo lo que escribo.
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              No elijo obras al azar. Hay obsesiones que aparecen una y otra vez en mis guiones,
              porque son las mismas obsesiones que veo en quienes me leen.
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            {ejes.map((e) => (
              <div key={e.n} className="border-l-2 border-gold pl-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-display italic text-3xl text-gold">{e.n}</span>
                  <h3 className="font-display text-2xl md:text-3xl">{e.t}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="container-stage py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">C. Diferencial</p>
          <h2 className="font-display text-4xl md:text-5xl text-balance">
            Por qué no soy una cuenta más de difusión.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              t: "No es agenda.",
              d: "No te digo qué hay esta semana. Te muestro qué te puede pasar a vos viendo lo que hay esta semana.",
            },
            {
              t: "No es crítica clásica.",
              d: "No califico actuaciones ni puesta en escena. Interpreto lo que la obra moviliza, lo que deja resonando.",
            },
            {
              t: "No es contenido neutro.",
              d: "Busco identificación incómoda, catarsis, comunidad. Que dudes, que te cuestiones, que te sientas nombrado.",
            },
          ].map((b, i) => (
            <div key={i} className="ticket-card p-8">
              <h3 className="font-display text-2xl mb-3 text-primary-deep">{b.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-gradient-stage text-white py-24">
        <div className="container-stage max-w-4xl text-center">
          <p className="font-display italic text-3xl md:text-5xl leading-tight text-balance">
            “Te propongo no solo ir a ver.
            <br />
            <span className="text-gold">Te propongo verte a vos en lo que ves.”</span>
          </p>
        </div>
      </section>

      {/* CTA · ESCRIBIME */}
      <section className="container-stage py-20">
        <div className="relative max-w-4xl mx-auto ticket-card p-10 md:p-14 text-center">
          <div className="absolute -inset-2 border border-gold/40 pointer-events-none" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">¿Tenés una obra?</p>
          <h2 className="font-display text-3xl md:text-5xl mb-5 text-balance">
            ¿Querés que escriba sobre tu obra?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Si dirigís, actuás o producís teatro independiente en Jujuy y querés que tu obra
            sea parte de Dramática y Creativa, escribime.
          </p>
          <a
            href="mailto:dramaticaycreativa@gmail.com?subject=Quiero%20que%20escribas%20sobre%20mi%20obra"
            className="inline-flex items-center gap-2 bg-gold text-gold-foreground hover:bg-gold/90 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            <Mail className="w-4 h-4" /> Escribime
          </a>
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
