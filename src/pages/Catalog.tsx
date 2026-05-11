import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, LayoutGrid, List, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData.ts';
import ProductCard from '../components/shared/ProductCard.tsx';
import { cn } from '../lib/utils.ts';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-12 pb-24 space-y-12">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
               <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
                  EL <span className="text-blue-500">CATÁLOGO</span> DEFINITIVO
               </h1>
               <p className="max-w-xl text-slate-400 font-medium">
                  Miles de diseños digitalizados profesionalmente, categorizados y listos para descargar. Filtra por técnica de puntada o formato de máquina industrial.
               </p>
            </div>
            
            <div className="relative w-full max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
               <input
                 type="text"
                 placeholder="Buscar diseños..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full rounded-full border border-blue-900/50 bg-blue-950/20 py-4 pl-12 pr-6 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
               />
            </div>
         </div>
      </section>

      {/* Hero Category Carousel */}
      <section className="relative w-full">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">Categorías Populares</h3>
               <div className="flex gap-2">
                  <button className="p-2 rounded-full border border-blue-900/50 hover:bg-blue-900/30 text-slate-400"><ChevronLeft className="h-5 w-5"/></button>
                  <button className="p-2 rounded-full border border-blue-900/50 hover:bg-blue-900/30 text-slate-400"><ChevronRight className="h-5 w-5"/></button>
               </div>
            </div>
         </div>
         
         <div className="flex gap-4 overflow-x-auto px-4 pb-8 sm:px-8 no-scrollbar scroll-smooth">
            <button
               onClick={() => setSelectedCategory('All')}
               className={cn(
                 "flex-shrink-0 min-w-[200px] group relative h-40 overflow-hidden rounded-[2rem] border transition-all",
                 selectedCategory === 'All' ? "border-blue-500 bg-blue-600/20" : "border-blue-900/40 bg-blue-950/20 hover:border-blue-500/50"
               )}
            >
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/all/400/200')] opacity-20 grayscale group-hover:grayscale-0 transition-all" />
               <div className="relative h-full flex flex-col justify-end p-6">
                  <span className="text-lg font-black text-white">Todos</span>
                  <span className="text-[10px] uppercase font-bold text-blue-400">Ver todo</span>
               </div>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex-shrink-0 min-w-[200px] group relative h-40 overflow-hidden rounded-[2rem] border transition-all",
                  selectedCategory === cat ? "border-blue-500 bg-blue-600/20" : "border-blue-900/40 bg-blue-950/20 hover:border-blue-500/50"
                )}
              >
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/category/400/200')] opacity-20 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <span className="text-lg font-black text-white">{cat}</span>
                  <span className="text-[10px] uppercase font-bold text-blue-400">Explorar</span>
                </div>
              </button>
            ))}
         </div>
      </section>

      {/* Grid Controls */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between border-b border-blue-900/30 pb-6">
            <div className="flex items-center gap-4">
               <span className="text-sm font-bold text-slate-500">Mostrando {filteredProducts.length} resultados</span>
               {selectedCategory !== 'All' && (
                  <button 
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-black uppercase text-blue-500 hover:underline"
                  >
                     Limpiar filtros
                  </button>
               )}
            </div>
            
            <div className="flex items-center gap-4">
               <div className="hidden items-center rounded-full bg-blue-950/40 p-1 md:flex">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn("p-2 rounded-full transition-all", viewMode === 'grid' ? "bg-blue-600 text-white" : "text-slate-500")}
                  >
                     <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn("p-2 rounded-full transition-all", viewMode === 'list' ? "bg-blue-600 text-white" : "text-slate-500")}
                  >
                     <List className="h-4 w-4" />
                  </button>
               </div>
               <button className="flex items-center gap-2 rounded-full border border-blue-900/50 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white">
                  <Filter className="h-4 w-4" />
                  Filtrar
               </button>
            </div>
         </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
               <motion.div 
                 layout
                 className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
               >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
               </motion.div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex flex-col items-center justify-center py-24 text-center"
               >
                  <div className="mb-6 rounded-full bg-blue-900/20 p-6 text-blue-500">
                     <Search className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-2">No encontramos diseños</h3>
                  <p className="text-slate-400 max-w-md">No hay resultados para "{search}" en esta categoría. Intenta con otros términos o solicita un diseño personalizado.</p>
               </motion.div>
            )}
         </AnimatePresence>
      </section>

      {/* Pagination Placeholder */}
      <div className="flex justify-center pt-8">
         <button className="rounded-full border border-blue-500/50 bg-blue-500/10 px-8 py-3 text-sm font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
            Cargar más diseños
         </button>
      </div>
    </div>
  );
}
