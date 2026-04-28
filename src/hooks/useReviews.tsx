import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Review } from "@/data/content";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data: rows, error } = await supabase
      .from("reviews")
      .select("id, event_id, user_id, rating, aspectos, experiencia, recomendacion, comentario, created_at")
      .order("created_at", { ascending: false });

    if (error || !rows) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const eventIds = Array.from(new Set(rows.map((r) => r.event_id)));
    const userIds = Array.from(new Set(rows.map((r) => r.user_id)));

    const [eventsRes, profilesRes] = await Promise.all([
      eventIds.length
        ? supabase.from("events").select("id, title").in("id", eventIds)
        : Promise.resolve({ data: [] as any[] }),
      userIds.length
        ? supabase.from("profiles").select("user_id, display_name").in("user_id", userIds)
        : Promise.resolve({ data: [] as any[] }),
    ]);

    const eventMap = new Map((eventsRes.data ?? []).map((e: any) => [e.id, e.title]));
    const profileMap = new Map((profilesRes.data ?? []).map((p: any) => [p.user_id, p.display_name]));

    setReviews(
      rows.map((r) => ({
        id: r.id,
        eventId: r.event_id,
        obra: eventMap.get(r.event_id) ?? "Función eliminada",
        nombre: profileMap.get(r.user_id) ?? "Anónimo",
        fecha: r.created_at,
        puntuacion: r.rating,
        aspectos: r.aspectos,
        experiencia: r.experiencia,
        recomendacion: r.recomendacion,
        comentario: r.comentario,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { reviews, loading, refetch };
};
