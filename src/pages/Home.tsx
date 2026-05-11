import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/home/Hero.tsx';
import ProductCard from '../components/shared/ProductCard.tsx';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData.ts';
import { Cpu, Sparkles, Scissors, Rocket, Gift, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Featured AI Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 to-[#020617] p-8 md:p-16 border border-blue-500/20">
          <div className="absolute right-0 top-0 h-64 w-64 bg-blue-500/10 blur-[100px]" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-400">
                <Cpu className="h-4 w-4" />
                Nuevo: Bordado con IA
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
                TRANSFORMA FOTOS <br />
                <span className="text-blue-500">EN PUNTADAS REALES</span>
              </h2>
              <p className="max-w-md text-lg text-slate-400">
                Nuestra red neuronal entrenada con miles de diseños de Wilcom E4.2 genera simulaciones hiperrealistas en segundos.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/ai-bordado" className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-500">
                  Probar IA Gratis
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/50?u=${i}`} className="h-8 w-8 rounded-full border-2 border-[#020617]" alt="" />
                    ))}
                  </div>
                  <span>+1,200 Diseños generados hoy</span>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-blue-500/30 bg-black/50 shadow-2xl">
               {/* Simulated App UI */}
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/interface/800/450')] opacity-40 mix-blend-overlay" />
               <div className="absolute inset-0 flex flex-col p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                     </div>
                     <span className="text-[10px] font-mono text-blue-400">WILCOM_E4.2_MODE_ACTIVE</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                     <motion.div
                       animate={{ scale: [1, 1.05, 1] }}
                       transition={{ repeat: Infinity, duration: 4 }}
                       className="relative"
                     >
                        <img src="https://picsum.photos/seed/tiger/400/400" className="h-48 w-48 rounded-full object-cover" alt="" />
                        <div className="absolute inset-0 animate-pulse border-4 border-blue-500 rounded-full" />
                        <div className="absolute -inset-4 border border-blue-500/20 rounded-full animate-spin-slow" />
                     </motion.div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Feed */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tighter text-white md:text-5xl">
              DISEÑOS <span className="text-blue-500">DIGITALES</span>
            </h2>
            <div className="flex items-center gap-4">
               <div className="h-1 w-12 bg-blue-600 rounded-full" />
               <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Popular ahora</p>
            </div>
          </div>
          <Link to="/catalogo" className="hidden text-sm font-bold text-blue-500 hover:underline lg:block">
            Explorar todo el catálogo
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {/* Smart Banner within list */}
          <div className="relative flex flex-col justify-center gap-6 overflow-hidden rounded-3xl bg-blue-600 p-8 sm:col-span-2 lg:col-span-1">
             <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
             <div className="relative z-10 space-y-4">
                <Gift className="h-10 w-10 text-white" />
                <h3 className="text-2xl font-black leading-tight text-white">¿BUSCAS ALGO <br />ESPECÍFICO?</h3>
                <p className="text-sm font-medium text-blue-100">Nuestro equipo de digitalizadores Wilcom E4.2 crea tu diseño desde cero por solo $10.</p>
                <Link to="/personalizados" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-600">
                  Pedir Personalizado
                </Link>
             </div>
             <div className="absolute bottom-4 right-4 text-[60px] font-black italic text-white/10 select-none">10$</div>
          </div>

          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={`${product.id}-alt`} product={product} />
          ))}
        </div>
      </section>

      {/* Subscription Call to Action */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="rounded-[2rem] border-2 border-dashed border-blue-500/30 bg-blue-500/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-white capitalize">Únete a la elite del bordado</h2>
            <p className="mx-auto mb-8 max-w-lg text-slate-400 font-medium">Recibe packs semanales de diseños gratuitos y guías profesionales de Wilcom E4.2 para elevar tu producción.</p>
            <div className="mx-auto flex max-w-md gap-4">
               <input type="email" placeholder="Tu mejor correo..." className="flex-1 rounded-full border border-blue-900/50 bg-[#020617] px-6 py-3 text-white focus:border-blue-500 outline-none" />
               <button className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors">
                  Suscribirse
               </button>
            </div>
         </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-blue-950/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
             {[
               { icon: Sparkles, label: 'Calidad Wilcom E4.2', sub: 'Puntadas certificadas' },
               { icon: Rocket, label: 'Descarga Instantánea', sub: 'Sin tiempos de espera' },
               { icon: Star, label: 'Precios Competitivos', sub: 'Desde $0.00 USD' },
               { icon: Scissors, label: 'Optimizado Industrial', sub: 'Mínimas roturas de hilo' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center gap-3">
                 <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-500 border border-blue-500/20">
                   <item.icon className="h-6 w-6" />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-white">{item.label}</h4>
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{item.sub}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
