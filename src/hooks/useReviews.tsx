import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Review } from "@/data/content";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select(`
        id, event_id, rating, aspectos, experiencia, recomendacion, comentario, created_at,
        events!inner (title),
        profiles!reviews_user_id_fkey (display_name)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // The relation profiles!reviews_user_id_fkey may not exist; fallback approach below
      setReviews(
        (data as any[]).map((r) => ({
          id: r.id,
          eventId: r.event_id,
          obra: r.events?.title ?? "Sin título",
          nombre: r.profiles?.display_name ?? "Anónimo",
          fecha: r.created_at,
          puntuacion: r.rating,
          aspectos: r.aspectos,
          experiencia: r.experiencia,
          recomendacion: r.recomendacion,
          comentario: r.comentario,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { reviews, loading, refetch };
};
