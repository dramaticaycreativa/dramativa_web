import { escuelas } from "@/data/content";
import { Calendar, Clock, MapPin, MessageCircle, User, DollarSign, Sparkles } from "lucide-react";

export const Estudiar = () => {
  return (
    <article>
      <section className="container-stage py-16 md:py-20">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
          Pestaña 04 · Formación
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-4 text-balance">
          Dónde estudiar teatro
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Una selección de espacios independientes que abren sus puertas para formarse en
          actuación, dirección y dramaturgia.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {escuelas.map((e, i) => (
            <article
              key={e.id}
              className="ticket-card p-8 flex flex-col animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {e.modalidad}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2 text-balance">
                {e.nombre}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> A cargo de {e.docente}
              </p>

              <dl className="grid grid-cols-1 gap-3 text-sm mb-8">
                <Row Icon={Clock} label="Horarios" value={e.horarios} />
                <Row Icon={Calendar} label="Inicio" value={e.inicio} />
                <Row Icon={DollarSign} label="Precio" value={e.precio} />
              </dl>

              <div className="flex gap-2 mt-auto">
                <a
                  href={e.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-deep text-primary-foreground hover:bg-primary px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" /> Contactar
                </a>
                <a
                  href={e.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border hover:border-gold px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4" /> Ubicación
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
};

const Row = ({ Icon, label, value }: { Icon: typeof Clock; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="text-foreground/85">{value}</dd>
    </div>
  </div>
);
