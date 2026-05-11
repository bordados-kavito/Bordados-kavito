import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Send, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-blue-900/50 bg-[#020617] pb-12 pt-24 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tighter text-white">
                BORDADOS <span className="text-blue-500">KAVITO</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Líderes en digitalización de bordados profesionales con tecnología Wilcom E4.2. Innovación y calidad en cada puntada.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full border border-blue-900/50 p-2 transition-colors hover:border-blue-500 hover:text-blue-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Tienda</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/catalogo" className="hover:text-blue-400 transition-colors">Catálogo</Link></li>
                <li><Link to="/catalogo?filter=premium" className="hover:text-blue-400 transition-colors">Diseños Premium</Link></li>
                <li><Link to="/catalogo?filter=gratis" className="hover:text-blue-400 transition-colors">Gratis</Link></li>
                <li><Link to="/promociones" className="hover:text-blue-400 transition-colors">Promociones</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Servicios</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/ai-bordado" className="hover:text-blue-400 transition-colors">IA Digitalizador</Link></li>
                <li><Link to="/personalizados" className="hover:text-blue-400 transition-colors">Pedidos Custom</Link></li>
                <li><Link to="/resenas" className="hover:text-blue-400 transition-colors">Reseñas</Link></li>
                <li><Link to="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div id="subscribe" className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Suscríbete</h4>
            <p className="text-sm">Recibe diseños gratis y ofertas exclusivas cada semana.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full rounded-full border border-blue-900/50 bg-blue-900/10 px-6 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-1 top-1 rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-500">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between border-t border-blue-900/30 pt-8 text-xs sm:flex-row">
          <p>© 2024 BORDADOS KAVITO. Todos los derechos reservados.</p>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Pagos Seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>PayPal / Stripe / Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
