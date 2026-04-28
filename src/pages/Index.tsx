import { useEffect, useState } from "react";
import { TabsNav } from "@/components/TabsNav";
import { Dramativa } from "@/components/sections/Dramativa";
import { Cartelera } from "@/components/sections/Cartelera";
import { Resenas } from "@/components/sections/Resenas";
import { Estudiar } from "@/components/sections/Estudiar";
import { Footer } from "@/components/Footer";

const validTabs = ["dramativa", "cartelera", "resenas", "estudiar"] as const;
type Tab = (typeof validTabs)[number];

const sectionParam: Record<string, Tab> = {
  reseñas: "resenas",
  resenas: "resenas",
  cartelera: "cartelera",
  dramativa: "dramativa",
  estudiar: "estudiar",
};

const Index = () => {
  const [tab, setTab] = useState<Tab>("dramativa");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seccion = params.get("seccion");
    if (seccion && sectionParam[seccion.toLowerCase()]) {
      setTab(sectionParam[seccion.toLowerCase()]);
    }
  }, []);

  const handleChange = (next: string) => {
    const t = (validTabs as readonly string[]).includes(next) ? (next as Tab) : "dramativa";
    setTab(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const url = new URL(window.location.href);
    url.searchParams.set("seccion", t);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TabsNav active={tab} onChange={handleChange} />
      <main className="flex-1">
        <div key={tab} className="animate-fade-in">
          {tab === "dramativa" && <Dramativa />}
          {tab === "cartelera" && <Cartelera onGoReviews={() => handleChange("resenas")} />}
          {tab === "resenas" && <Resenas />}
          {tab === "estudiar" && <Estudiar />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
