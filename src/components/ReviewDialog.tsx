import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { CulturalEvent } from "@/data/content";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  aspectos: z.string().trim().min(2).max(200),
  experiencia: z.string().trim().min(5).max(500),
  recomendacion: z.string().trim().min(2).max(300),
  comentario: z.string().trim().max(800).optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  event: CulturalEvent | null;
  onSubmitted?: () => void;
}

export const ReviewDialog = ({ open, onOpenChange, event, onSubmitted }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [aspectos, setAspectos] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setRating(5);
    setAspectos("");
    setExperiencia("");
    setRecomendacion("");
    setComentario("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    if (!user) {
      onOpenChange(false);
      navigate("/auth");
      return;
    }
    setBusy(true);
    try {
      const parsed = schema.parse({
        rating, aspectos, experiencia, recomendacion, comentario,
      });
      const { error } = await supabase.from("reviews").insert({
        event_id: event.id,
        user_id: user.id,
        rating: parsed.rating,
        aspectos: parsed.aspectos,
        experiencia: parsed.experiencia,
        recomendacion: parsed.recomendacion,
        comentario: parsed.comentario || null,
      });
      if (error) {
        if (error.code === "23505") throw new Error("Ya dejaste una reseña para esta función.");
        throw error;
      }
      toast.success("¡Gracias por tu reseña!");
      reset();
      onOpenChange(false);
      onSubmitted?.();
    } catch (err: any) {
      toast.error(err?.message || "No pudimos guardar la reseña");
    } finally {
      setBusy(false);
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Dejar reseña</DialogTitle>
          <DialogDescription>{event.title}</DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="py-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Necesitás una cuenta para publicar tu reseña.
            </p>
            <Button
              onClick={() => { onOpenChange(false); navigate("/auth"); }}
              className="bg-primary-deep text-primary-foreground hover:bg-primary-deep/90 rounded-none"
            >
              Iniciar sesión / Registrarme
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Puntuación
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className="p-1"
                    aria-label={`${n} estrellas`}
                  >
                    <Star
                      className={cn(
                        "w-7 h-7 transition",
                        n <= rating ? "fill-gold text-gold" : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Field label="Aspectos destacados" value={aspectos} onChange={setAspectos}
              placeholder="Actuaciones, dirección, escenografía…" />
            <TextArea label="Tu experiencia" value={experiencia} onChange={setExperiencia}
              placeholder="¿Cómo te sentiste viéndola?" rows={3} />
            <Field label="¿La recomendarías?" value={recomendacion} onChange={setRecomendacion}
              placeholder="Sí, especialmente para…" />
            <TextArea label="Comentario (opcional)" value={comentario} onChange={setComentario}
              placeholder="Cualquier otra cosa que quieras compartir" rows={2} />

            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-gold text-gold-foreground hover:bg-gold/90 rounded-none"
            >
              {busy ? "Publicando…" : "Publicar reseña"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, value, onChange, placeholder }: any) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold transition"
    />
  </label>
);

const TextArea = ({ label, value, onChange, placeholder, rows }: any) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold transition resize-none"
    />
  </label>
);
