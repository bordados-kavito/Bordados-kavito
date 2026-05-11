import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, Cpu, User, LayoutGrid, Award, Star, History, Gift, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'Inicio', href: '/', icon: LayoutGrid },
  { name: 'Catálogo', href: '/catalogo', icon: History },
  { name: 'Bordados con IA', href: '/ai-bordado', icon: Cpu },
  { name: 'Personalizados', href: '/personalizados', icon: Award },
  { name: 'Suscripciones', href: '#subscribe', icon: Star },
  { name: 'Gratis', href: '/catalogo?filter=gratis', icon: Gift },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const { items } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-900/50 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              className="relative p-2"
            >
              <Cpu className="h-8 w-8 text-blue-500" />
              <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-lg" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-white">
              BORDADOS <span className="text-blue-500">KAVITO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/carrito" className="relative p-2 text-slate-300 hover:text-white">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL || ''} alt="" className="h-8 w-8 rounded-full border border-blue-500/50" />
                <button onClick={logout} className="text-sm font-medium text-slate-400 hover:text-white">
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Ingresar
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-300 hover:bg-blue-900/30 lg:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-blue-900/50 bg-[#020617] lg:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-slate-300 hover:bg-blue-900/20 hover:text-blue-400"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
