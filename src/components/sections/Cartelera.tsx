import { useMemo, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useAppSetting } from "@/hooks/useAppSettings";
import { type EventType, type CulturalEvent } from "@/data/content";
import { Calendar, MapPin, Search, Theater, Music, Film, Image as ImageIcon, ArrowUpRight, Ticket, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReviewDialog } from "@/components/ReviewDialog";

const typeMeta: Record<EventType, { label: string; Icon: typeof Theater }> = {
  teatro: { label: "Teatro", Icon: Theater },
  cine: { label: "Cine", Icon: Film },
  musica: { label: "Música", Icon: Music },
  muestra: { label: "Muestra", Icon: ImageIcon },
  especial: { label: "Especial", Icon: Sparkles },
};

const tagStyles: Record<string, string> = {
  estreno: "bg-gold text-gold-foreground",
  "ultimas-funciones": "bg-curtain text-white",
  gratis: "bg-primary text-primary-foreground",
  destacado: "border border-gold text-gold",
};

const tagLabel: Record<string, string> = {
  estreno: "Estreno",
  "ultimas-funciones": "Últimas funciones",
  gratis: "Gratis",
  destacado: "Destacado",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const PER_PAGE = 6;

export const Cartelera = ({ onGoReviews: _ }: { onGoReviews: () => void }) => {
  const { events, loading } = useEvents();
  const { value: especialLabel } = useAppSetting("especial_label", "Especial");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<EventType | "todos">("todos");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reviewEvent, setReviewEvent] = useState<CulturalEvent | null>(null);

  const upcomingCount = useMemo(
    () => events.filter((e) => new Date(e.date) > new Date()).length,
    [events]
  );

  const filtered = useMemo(() => {
    return events
      .filter((e) => !e.hidden)
      .filter((e) => (filter === "todos" ? true : e.type === filter))
      .filter((e) => e.title.toLowerCase().includes(query.toLowerCase()));
  }, [events, query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <article>
      <section className="container-stage py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
              Pestaña 02 · Programación
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-balance">
              Cartelera
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Ticket className="w-5 h-5 text-gold" />
            <span className="text-muted-foreground">
              <strong className="text-foreground font-semibold">{upcomingCount}</strong> funciones próximas
            </span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar por nombre de obra…"
              className="w-full bg-surface border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["todos", "teatro", "cine", "musica", "muestra", "especial"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setFilter(t); setPage(1); }}
                className={cn(
                  "px-4 py-2 text-sm border transition-all",
                  filter === t
                    ? "bg-primary-deep text-primary-foreground border-primary-deep"
                    : "border-border text-muted-foreground hover:border-gold hover:text-foreground",
                  t === "especial" && filter !== t && "border-gold/60 text-gold"
                )}
              >
                {t === "todos" ? "Todos" : t === "especial" ? especialLabel : typeMeta[t].label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((ev, i) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  index={i}
                  expanded={expanded === ev.id}
                  onToggle={() => setExpanded(expanded === ev.id ? null : ev.id)}
                  onReview={() => setReviewEvent(ev)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="font-display italic text-2xl">El telón aún no se levanta.</p>
                <p className="text-sm mt-2">No encontramos funciones para esa búsqueda.</p>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "w-10 h-10 text-sm font-medium border transition-all",
                      page === i + 1
                        ? "bg-primary-deep text-primary-foreground border-primary-deep"
                        : "border-border hover:border-gold"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            )}
          </>
        )}
      </section>

      <ReviewDialog
        open={!!reviewEvent}
        onOpenChange={(o) => !o && setReviewEvent(null)}
        event={reviewEvent}
      />
    </article>
  );
};

const EventCard = ({
  event, index, expanded, onToggle, onReview,
}: {
  event: CulturalEvent; index: number; expanded: boolean; onToggle: () => void; onReview: () => void;
}) => {
  const { Icon, label } = typeMeta[event.type];
  return (
    <article
      className="ticket-card p-7 flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Icon className="w-3.5 h-3.5 text-gold" /> {label}
        </span>
        {event.tags && event.tags.length > 0 && (
          <span className={cn("text-[10px] uppercase tracking-widest px-2 py-1 font-semibold", tagStyles[event.tags[0]])}>
            {tagLabel[event.tags[0]]}
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight mb-4 text-balance">
        {event.title}
      </h3>

      <div className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="capitalize">{formatDate(event.date)}</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
          {event.venue}
        </p>
      </div>

      {expanded && (
        <div className="border-t border-border/70 pt-5 mb-5 space-y-4 animate-fade-in">
          <p className="text-sm leading-relaxed text-foreground/80">{event.description}</p>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Entrada</span>
            <span className="font-display text-2xl text-primary-deep">{event.price}</span>
          </div>
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground hover:bg-gold/90 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              <Ticket className="w-4 h-4" /> Comprar entrada
            </a>
          )}
          {event.mapsUrl && (
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm text-primary font-medium"
            >
              Ver en Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex-1 border-primary-deep text-primary-deep hover:bg-primary-deep hover:text-primary-foreground rounded-none"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </Button>
        <Button
          onClick={onReview}
          className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-none px-3"
          aria-label="Dejar reseña"
          title="Dejar reseña"
        >
          ★
        </Button>
      </div>
    </article>
  );
};
