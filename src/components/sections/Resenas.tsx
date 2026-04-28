import { useMemo, useState } from "react";
import { reviews } from "@/data/content";
import { Stars } from "@/components/Stars";
import { Search, Quote, Award, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ObraGrouped {
  obra: string;
  promedio: number;
  cantidad: number;
  reviews: typeof reviews;
}

export const Resenas = () => {
  const [query, setQuery] = useState("");

  const grouped = useMemo<ObraGrouped[]>(() => {
    const map = new Map<string, typeof reviews>();
    reviews.forEach((r) => {
      if (!map.has(r.obra)) map.set(r.obra, []);
      map.get(r.obra)!.push(r);
    });
    const arr: ObraGrouped[] = Array.from(map.entries()).map(([obra, rs]) => ({
      obra,
      reviews: rs,
      cantidad: rs.length,
      promedio: rs.reduce((a, b) => a + b.puntuacion, 0) / rs.length,
    }));
    arr.sort((a, b) => b.promedio - a.promedio);
    return arr.filter((o) => o.obra.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const topObra = grouped[0];

  return (
    <article>
      <section className="container-stage py-16 md:py-20">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
          Pestaña 03 · La voz del público
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-10 text-balance">
          Reseñas
        </h1>

        {/* Top valorada */}
        {topObra && (
          <div className="bg-gradient-stage text-white p-8 md:p-10 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] mb-3">
                  <Award className="w-4 h-4" /> Obra mejor valorada
                </span>
                <h2 className="font-display text-3xl md:text-4xl mb-2">{topObra.obra}</h2>
                <div className="flex items-center gap-3">
                  <Stars value={topObra.promedio} size={20} />
                  <span className="text-sm text-white/70">
                    {topObra.promedio.toFixed(1)} · {topObra.cantidad} reseñas
                  </span>
                </div>
              </div>
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-none">
                <MessageSquarePlus className="w-4 h-4 mr-2" /> Dejar reseña
              </Button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-10 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por obra…"
            className="w-full bg-surface border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition"
          />
        </div>

        {/* Lista */}
        <div className="space-y-12">
          {grouped.map((g, gi) => (
            <ObraBlock key={g.obra} group={g} highlight={gi === 0} />
          ))}
        </div>
      </section>
    </article>
  );
};

const ObraBlock = ({ group, highlight }: { group: ObraGrouped; highlight: boolean }) => {
  const best = [...group.reviews].sort((a, b) => b.puntuacion - a.puntuacion)[0];
  return (
    <section className="border-t border-border pt-8">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <h3 className="font-display text-3xl md:text-4xl mb-2 text-balance">{group.obra}</h3>
          <div className="flex items-center gap-3">
            <Stars value={group.promedio} size={18} />
            <span className="text-sm text-muted-foreground">
              {group.promedio.toFixed(1)} de 5 · {group.cantidad}{" "}
              {group.cantidad === 1 ? "reseña" : "reseñas"}
            </span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {group.reviews.map((r) => {
          const isBest = r.id === best.id;
          return (
            <article
              key={r.id}
              className={cn(
                "ticket-card p-6 relative",
                isBest && highlight && "border-gold/80 bg-gold-soft/30"
              )}
            >
              {isBest && highlight && (
                <span className="absolute -top-3 left-6 bg-gold text-gold-foreground text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
                  Comentario destacado
                </span>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg">{r.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.fecha).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
                <Stars value={r.puntuacion} />
              </div>
              <dl className="space-y-2 text-sm">
                <Row label="Aspectos" value={r.aspectos} />
                <Row label="Experiencia" value={r.experiencia} />
                <Row label="Recomendación" value={r.recomendacion} />
              </dl>
              {r.comentario && (
                <blockquote className="mt-4 pt-4 border-t border-border/70 flex gap-3 text-sm italic text-foreground/80">
                  <Quote className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <p>{r.comentario}</p>
                </blockquote>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <dt className="text-xs uppercase tracking-widest text-muted-foreground min-w-[110px] pt-0.5">
      {label}
    </dt>
    <dd className="text-foreground/85 flex-1">{value}</dd>
  </div>
);
