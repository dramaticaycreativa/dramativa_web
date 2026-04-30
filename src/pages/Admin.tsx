import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useAppSetting } from "@/hooks/useAppSettings";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, Loader2, Copy, Save } from "lucide-react";
import type { CulturalEvent, EventTag, EventType } from "@/data/content";

const TYPES: EventType[] = ["teatro", "cine", "musica", "muestra", "especial"];
const TAGS: EventTag[] = ["estreno", "ultimas-funciones", "gratis", "destacado"];

const eventSchema = z.object({
  title: z.string().trim().min(2).max(140),
  type: z.enum(["teatro", "cine", "musica", "muestra", "especial"]),
  date: z.string().min(1),
  venue: z.string().trim().min(2).max(140),
  address: z.string().trim().min(2).max(200),
  maps_url: z.string().url().or(z.literal("")),
  price: z.string().trim().min(1).max(40),
  description: z.string().trim().min(5).max(3000),
  ticket_url: z.string().url().or(z.literal("")),
  tags: z.array(z.enum(["estreno", "ultimas-funciones", "gratis", "destacado"])),
});

interface FormState {
  title: string; type: EventType; date: string; venue: string; address: string;
  maps_url: string; price: string; description: string; ticket_url: string;
  tags: EventTag[];
}

const empty: FormState = {
  title: "", type: "teatro", date: "", venue: "", address: "",
  maps_url: "", price: "", description: "", ticket_url: "", tags: [],
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { events, refetch } = useEvents();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CulturalEvent | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-gold" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
        <h1 className="font-display text-3xl">Acceso restringido</h1>
        <p className="text-muted-foreground max-w-md">
          Esta sección es solo para administradores. Si necesitás acceso, pedile a quien gestiona el sitio que te lo habilite.
        </p>
        <Link to="/" className="text-gold hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (ev: CulturalEvent) => {
    setEditing(ev);
    setForm({
      title: ev.title,
      type: ev.type,
      date: toLocalInput(ev.date),
      venue: ev.venue,
      address: ev.address,
      maps_url: ev.mapsUrl ?? "",
      price: ev.price,
      description: ev.description,
      ticket_url: ev.ticketUrl ?? "",
      tags: ev.tags ?? [],
    });
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const parsed = eventSchema.parse(form);
      const payload = {
        title: parsed.title,
        type: parsed.type,
        date: new Date(parsed.date).toISOString(),
        venue: parsed.venue,
        address: parsed.address,
        maps_url: parsed.maps_url || null,
        price: parsed.price,
        description: parsed.description,
        ticket_url: parsed.ticket_url || null,
        tags: parsed.tags,
      };
      const { error } = editing
        ? await supabase.from("events").update(payload).eq("id", editing.id)
        : await supabase.from("events").insert(payload);
      if (error) throw error;
      toast.success(editing ? "Función actualizada" : "Función creada");
      setOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Error al guardar");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (ev: CulturalEvent) => {
    if (!confirm(`¿Eliminar "${ev.title}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("events").delete().eq("id", ev.id);
    if (error) toast.error(error.message);
    else { toast.success("Función eliminada"); refetch(); }
  };

  const toggleTag = (t: EventTag) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="container-stage flex items-center justify-between h-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-deep">
            <ArrowLeft className="w-4 h-4" /> Volver al sitio
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut} className="rounded-none">
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container-stage py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Panel</p>
            <h1 className="font-display text-4xl md:text-5xl">Cartelera · Admin</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {events.length} {events.length === 1 ? "función cargada" : "funciones cargadas"}
            </p>
          </div>
          <Button onClick={openCreate} className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-none">
            <Plus className="w-4 h-4 mr-2" /> Nueva función
          </Button>
        </div>

        <div className="space-y-3">
          {events.map((ev) => (
            <article key={ev.id} className="bg-surface border border-border p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest bg-primary-deep text-primary-foreground px-2 py-0.5">
                    {ev.type}
                  </span>
                  {ev.tags?.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest bg-gold-soft text-foreground px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl truncate">{ev.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(ev.date).toLocaleString("es-AR")} · {ev.venue} · {ev.price}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(ev)} className="rounded-none">
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(ev)} className="rounded-none text-curtain border-curtain/40 hover:bg-curtain hover:text-white">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </article>
          ))}
          {events.length === 0 && (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border">
              No hay funciones todavía. Creá la primera con el botón de arriba.
            </div>
          )}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editing ? "Editar función" : "Nueva función"}
            </DialogTitle>
            <DialogDescription>Los cambios se reflejan al instante en la cartelera pública.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
              <SelectField label="Tipo" value={form.type} onChange={(v) => setForm({ ...form, type: v as EventType })} options={TYPES} />
              <Field label="Fecha y hora" type="datetime-local" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
              <Field label="Precio" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="$6.000 o Gratis" />
              <Field label="Sala / Espacio" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
              <Field label="Dirección" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
              <Field label="Link Google Maps" value={form.maps_url} onChange={(v) => setForm({ ...form, maps_url: v })} placeholder="https://maps.google.com/…" required={false} />
              <Field label="Link compra entrada" value={form.ticket_url} onChange={(v) => setForm({ ...form, ticket_url: v })} placeholder="https://…" required={false} />
            </div>

            <TextArea label="Descripción" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={4} />

            <div>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Etiquetas</span>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition ${
                      form.tags.includes(t)
                        ? "bg-gold text-gold-foreground border-gold"
                        : "border-border text-muted-foreground hover:border-gold"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={busy} className="w-full bg-primary-deep text-primary-foreground hover:bg-primary-deep/90 rounded-none">
              {busy ? "Guardando…" : editing ? "Guardar cambios" : "Crear función"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const Field = ({
  label, value, onChange, type = "text", placeholder, required = true,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold transition"
    />
  </label>
);

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold transition capitalize"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

const TextArea = ({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      required
      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold transition resize-none"
    />
  </label>
);

export default Admin;
