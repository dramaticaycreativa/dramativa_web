import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LayoutDashboard, LogOut } from "lucide-react";

interface TabsNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: "cartelera", label: "Cartelera" },
  { id: "resenas", label: "Reseñas" },
  { id: "estudiar", label: "Dónde estudiar" },
];

export const TabsNav = ({ active, onChange }: TabsNavProps) => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container-stage flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => onChange("dramativa")}
          className="flex items-baseline gap-1 group"
          aria-label="Inicio Dramativa"
        >
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-primary-deep">
            Drama
          </span>
          <span className="font-display text-2xl md:text-3xl font-bold italic text-gold group-hover:text-primary transition-colors">
            tiva
          </span>
          <span className="hidden md:inline text-xs uppercase tracking-[0.25em] text-muted-foreground ml-3">
            cartelera cultural
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                active === t.id ? "text-primary-deep" : "text-muted-foreground hover:text-primary-deep"
              )}
            >
              {t.label}
              {active === t.id && (
                <span className="absolute left-1/2 -bottom-0.5 h-0.5 w-8 -translate-x-1/2 bg-gold" />
              )}
            </button>
          ))}

          <span className="w-px h-5 bg-border mx-2" />

          {isAdmin && (
            <Link
              to="/admin"
              className="px-3 py-2 text-xs uppercase tracking-widest text-gold hover:text-primary-deep transition-colors inline-flex items-center gap-1.5"
              title="Panel admin"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={signOut}
              className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-curtain transition-colors inline-flex items-center gap-1.5"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary-deep transition-colors inline-flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" /> Ingresar
            </Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="text-gold p-2" aria-label="Admin">
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          )}
          {!user && (
            <Link to="/auth" className="text-muted-foreground p-2" aria-label="Ingresar">
              <LogIn className="w-4 h-4" />
            </Link>
          )}
          <select
            value={active}
            onChange={(e) => onChange(e.target.value)}
            className="bg-surface border border-border rounded-sm px-3 py-2 text-sm font-medium"
            aria-label="Navegar"
          >
            {tabs.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
