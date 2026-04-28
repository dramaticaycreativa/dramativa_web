import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const emailSchema = z.string().trim().email("Email inválido").max(255);
const passwordSchema = z.string().min(6, "Mínimo 6 caracteres").max(72);
const nameSchema = z.string().trim().min(2, "Nombre muy corto").max(80);

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const emailV = emailSchema.parse(email);
      const passV = passwordSchema.parse(password);

      if (mode === "signup") {
        const nameV = nameSchema.parse(name);
        const { error } = await supabase.auth.signUp({
          email: emailV,
          password: passV,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: nameV },
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Revisá tu email para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailV,
          password: passV,
        });
        if (error) throw error;
        toast.success("¡Bienvenida/o de vuelta!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.message || "Algo salió mal");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("No pudimos iniciar sesión con Google");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container-stage py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-deep">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-2">Acceso</p>
            <h1 className="font-display text-4xl md:text-5xl">
              <span className="text-primary-deep">Drama</span>
              <span className="italic text-gold">tiva</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-3">
              {mode === "login" ? "Ingresá para dejar tu reseña" : "Creá tu cuenta para participar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-7 border border-border">
            {mode === "signup" && (
              <Field
                label="Nombre"
                value={name}
                onChange={setName}
                placeholder="Cómo querés firmar tus reseñas"
                type="text"
              />
            )}
            <Field label="Email" value={email} onChange={setEmail} placeholder="vos@email.com" type="email" />
            <Field label="Contraseña" value={password} onChange={setPassword} placeholder="••••••" type="password" />

            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-primary-deep text-primary-foreground hover:bg-primary-deep/90 rounded-none"
            >
              {busy ? "Procesando…" : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-2 text-muted-foreground tracking-widest">o</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full rounded-none border-primary-deep text-primary-deep hover:bg-primary-deep hover:text-primary-foreground"
            >
              Continuar con Google
            </Button>
          </form>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            {mode === "login" ? "¿Aún no tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-gold font-medium hover:underline"
            >
              {mode === "login" ? "Registrate" : "Iniciá sesión"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

const Field = ({
  label, value, onChange, placeholder, type,
}: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type: string }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold transition"
    />
  </label>
);

export default Auth;
