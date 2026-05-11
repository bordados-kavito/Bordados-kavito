import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background with mesh gradient and noise */}
      <div className="absolute inset-0 bg-[#020617]">
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1e40af 0%, transparent 50%), radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)' 
        }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-400"
          >
            <Sparkles className="h-4 w-4" />
            Digitalización Wilcom E4.2 Premium
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-6xl font-black leading-tight tracking-tighter text-white lg:text-8xl"
          >
            BORDADOS QUE <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              DAN VIDA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 max-w-xl text-lg text-slate-400"
          >
            Lleva tus ideas al siguiente nivel con nuestra digitalización profesional. Diseños optimizados para máquinas industriales, con el respaldo de la mejor tecnología IA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <Link
              to="/catalogo"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Ver Catálogo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/ai-bordado"
              className="flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-8 py-4 text-sm font-bold text-blue-400 transition-all hover:bg-blue-500/20"
            >
              <Play className="h-5 w-5 fill-current" />
              IA Digitalizador
            </Link>
          </motion.div>
        </div>

        {/* Decorative Grid/Machine Part */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="relative h-[600px] w-[600px]">
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-spin-slow" />
            <div className="absolute inset-20 rounded-full border border-blue-500/10 animate-reverse-spin-slow" />
            <img 
              src="https://picsum.photos/seed/machine/800/800" 
              alt="Industrial Embroidery Machine" 
              className="absolute inset-32 rounded-3xl object-cover shadow-[0_0_50px_rgba(37,99,235,0.2)] mix-blend-screen opacity-50 grayscale hover:grayscale-0 transition-all"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Stitches */}
      <div className="absolute bottom-10 left-0 right-0 overflow-hidden py-4 opacity-50">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-20"
        >
          {['SATIN', 'TATAMI', 'RUNNING', 'ZIG-ZAG', 'WILCOM E4.2', 'EMB', 'DST'].map((tech) => (
            <span key={tech} className="text-sm font-black tracking-widest text-blue-900/50">
              {tech} • {tech} • {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
