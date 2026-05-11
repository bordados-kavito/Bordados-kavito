import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const { items, removeItem, addItem, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
        <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500">
           <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-black text-white">TU CARRITO ESTÁ VACÍO</h2>
        <p className="text-slate-400 max-w-sm">Explora nuestro catálogo y digitaliza tus bordados con la mejor tecnología Wilcom.</p>
        <Link to="/catalogo" className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500">
           Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white mb-12 uppercase tracking-tighter">Mi Carrito</h1>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
             <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-6 rounded-3xl border border-blue-900/40 bg-blue-950/20 p-6"
                  >
                     <img src={item.image} className="h-24 w-24 rounded-2xl object-cover bg-black" alt="" />
                     <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-slate-500">{item.formats.join(' • ')}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center border border-blue-900 rounded-full px-2">
                           <button onClick={() => removeItem(item.id)} className="p-2 text-slate-500 hover:text-white"><Minus className="h-4 w-4" /></button>
                           <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                           <button onClick={() => addItem(item)} className="p-2 text-slate-500 hover:text-white"><Plus className="h-4 w-4" /></button>
                        </div>
                        <div className="text-right min-w-[80px]">
                           <div className="text-xl font-black text-white">${(item.price * item.quantity).toFixed(2)}</div>
                           <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase font-bold text-red-500 hover:underline">Eliminar</button>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
             
             <button 
               onClick={clearCart}
               className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors px-6"
             >
                Vaciar carrito
             </button>
          </div>

          <div className="space-y-8">
             <div className="rounded-[2.5rem] border border-blue-500/20 bg-blue-950/40 p-8 space-y-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Resumen</h3>
                
                <div className="space-y-4">
                   <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-slate-400">
                      <span>Impuestos (IA Digital)</span>
                      <span className="text-white">$0.00</span>
                   </div>
                   <div className="pt-4 border-t border-blue-900/50 flex justify-between items-end">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-4xl font-black text-blue-500">${total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <button className="w-full rounded-full bg-blue-600 py-5 text-lg font-black text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3">
                      FINALIZAR COMPRA
                      <ArrowRight className="h-5 w-5" />
                   </button>
                   <div className="flex items-center justify-center gap-4 text-slate-500">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Garantía Wilcom E4.2</span>
                   </div>
                </div>
                
                <div className="pt-8 border-t border-blue-900/50">
                   <div className="flex justify-center gap-4 grayscale opacity-50">
                      <CreditCard className="h-8 w-8" />
                      <div className="h-8 w-12 bg-slate-800 rounded" />
                      <div className="h-8 w-10 bg-slate-800 rounded" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
