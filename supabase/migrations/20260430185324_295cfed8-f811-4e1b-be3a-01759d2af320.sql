-- 1. Add 'especial' to event_type enum
ALTER TYPE public.event_type ADD VALUE IF NOT EXISTS 'especial';

-- 2. Create app_settings table for editable site config
CREATE TABLE IF NOT EXISTS public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by everyone"
  ON public.app_settings FOR SELECT USING (true);

CREATE POLICY "Admins can insert settings"
  ON public.app_settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update settings"
  ON public.app_settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete settings"
  ON public.app_settings FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_app_settings_updated_at
  BEFORE UPDATE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Seed default label for the dynamic "especial" filter
INSERT INTO public.app_settings (key, value)
VALUES ('especial_label', 'Especial')
ON CONFLICT (key) DO NOTHING;