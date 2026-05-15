export const Footer = () => {
  return (
    <footer className="bg-primary-deep text-white/80 mt-20">
      <div className="container-stage py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-3xl text-white mb-3">
            Dramat<em className="text-gold not-italic">iva</em>
          </p>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            Cartelera cultural independiente. Escenarios chicos, decisiones grandes.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Secciones</p>
          <ul className="space-y-1.5 text-sm">
            <li>Dramativa</li>
            <li>Cartelera</li>
            <li>Reseñas</li>
            <li>Dónde estudiar</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Contacto</p>
          <a href="mailto:dramaticaycreativa@gmail.com" className="text-sm text-white/60 hover:text-gold transition-colors">
            dramaticaycreativa@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-stage py-5 text-xs text-white/40 flex justify-between">
          <span>© {new Date().getFullYear()} Dramativa</span>
          <span className="italic font-display">Que se levante el telón.</span>
        </div>
      </div>
    </footer>
  );
};
