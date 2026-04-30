import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAppSetting = (key: string, fallback = "") => {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("app_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (data?.value) setValue(data.value);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const save = useCallback(
    async (newValue: string) => {
      const { error } = await supabase
        .from("app_settings")
        .upsert({ key, value: newValue }, { onConflict: "key" });
      if (!error) setValue(newValue);
      return error;
    },
    [key]
  );

  return { value, loading, save, refetch };
};
