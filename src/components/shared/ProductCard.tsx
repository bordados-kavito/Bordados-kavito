import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Download, Shield, Zap, Maximize2 } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-blue-900/40 bg-blue-950/20 p-4 transition-all hover:border-blue-500/50 hover:bg-blue-900/30"
    >
      {/* Badges */}
      <div className="absolute right-6 top-6 z-10 flex flex-col gap-2">
        {product.isPremium && (
          <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-black uppercase text-black">
            Premium
          </span>
        )}
        {product.isFree && (
          <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black uppercase text-black">
            Gratis
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick View Button (Simulated) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
           <button className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20">
              <Maximize2 className="h-6 w-6" />
           </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            {product.category}
          </span>
          <div className="flex gap-1">
            {product.formats.slice(0, 2).map((fmt) => (
              <span key={fmt} className="rounded border border-blue-900 px-1 text-[8px] text-slate-500">
                {fmt}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className="font-bold text-white transition-colors group-hover:text-blue-400">
          {product.name}
        </h3>
        
        <p className="line-clamp-1 text-xs text-slate-400">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 line-through">
              ${(product.price * 1.5).toFixed(2)}
            </span>
            <span className="text-lg font-black text-white">
              {product.price === 0 ? 'GRATIS' : `$${product.price.toFixed(2)}`}
            </span>
          </div>
          
          <button
            onClick={() => addItem(product)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            {product.isFree ? <Download className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Tech Details Overlay on Hover */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full px-6 pb-6 pt-4 transition-transform group-hover:-translate-y-0">
         <div className="flex items-center gap-4 text-[10px] font-bold text-blue-400">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {product.stitchCount || '4k'} puntadas</span>
            <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> HQ Digital</span>
         </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
