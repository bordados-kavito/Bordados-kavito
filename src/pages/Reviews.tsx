import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Upload, Play, Camera, StarHalf, CheckCircle, Users } from 'lucide-react';
import { MICK_REVIEWS } from '../data/mockData.ts';
import { cn, formatDate } from '../lib/utils.ts';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Review } from '../types';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', image: '' });

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data.length > 0 ? data : MICK_REVIEWS);
    });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'reviews'), {
        userName: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        imageUrl: newReview.image,
        userAvatar: `https://i.pravatar.cc/150?u=${newReview.name}`,
        createdAt: Date.now()
      });
      setIsFormOpen(false);
      setNewReview({ name: '', rating: 5, comment: '', image: '' });
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <section className="relative rounded-[3rem] bg-gradient-to-br from-blue-900/40 to-[#020617] p-12 overflow-hidden border border-blue-500/20 text-center mb-16">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                 <Users className="h-4 w-4" /> Comunidad Kavito
              </div>
              <h1 className="text-4xl font-black text-white md:text-6xl tracking-tighter">
                 ¿QUÉ DICEN NUESTROS <br />
                 <span className="text-blue-500">CLIENTES?</span>
              </h1>
              <div className="flex justify-center gap-2 text-amber-500">
                 {[...Array(5)].map((_, i) => <Star key={i} className="h-8 w-8 fill-current" />)}
              </div>
              <p className="max-w-xl mx-auto text-slate-400 font-medium italic">
                "Digitalizaciones impecables. He probado muchos servicios pero Kavito es el único que respeta la configuración de mi máquina industrial."
              </p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-500 transition-all hover:scale-105"
              >
                 <MessageSquare className="h-5 w-5" /> Dejar mi reseña
              </button>
           </div>
        </section>

        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-24">
           {[
             { label: 'Rating Global', val: '4.9/5', icon: Star },
             { label: 'Proyectos', val: '+50k', icon: CheckCircle },
             { label: 'Clientes', val: '+12k', icon: Users },
             { label: 'Puntadas', val: '500M', icon: Play },
           ].map((stat, i) => (
             <div key={i} className="bg-blue-950/20 border border-blue-900/40 rounded-3xl p-6 text-center space-y-1">
                <div className="flex items-center justify-center mb-2"><stat.icon className="h-5 w-5 text-blue-500" /></div>
                <div className="text-2xl font-black text-white">{stat.val}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Reviews Masonry (Simulated) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
           {reviews.map((review, i) => (
             <motion.div 
               key={review.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: (i % 3) * 0.1 }}
               className="break-inside-avoid rounded-[2.5rem] bg-blue-950/20 border border-blue-900/40 p-8 space-y-6 hover:border-blue-500/50 transition-colors group"
             >
                <div className="flex items-center gap-4">
                   <img src={review.userAvatar} className="h-12 w-12 rounded-full border border-blue-500/30" alt="" />
                   <div>
                      <h4 className="font-bold text-white leading-none">{review.userName}</h4>
                      <div className="flex gap-0.5 text-amber-500 mt-1">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={cn("h-3 w-3 fill-current", i >= review.rating && "text-slate-700")} />
                         ))}
                      </div>
                   </div>
                   <div className="ml-auto text-[10px] items-center gap-1 font-bold text-slate-600 hidden sm:flex">
                      <CheckCircle className="h-3 w-3 text-emerald-500" /> Verificado
                   </div>
                </div>

                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                   "{review.comment}"
                </p>

                {review.imageUrl && (
                   <div className="relative overflow-hidden rounded-2xl group-hover:shadow-[0_0_20px_rgba(29,78,216,0.3)] transition-shadow">
                      <img src={review.imageUrl} className="w-full object-cover rounded-2xl grayscale-[0.5] group-hover:grayscale-0 transition-all" alt="" />
                      <div className="absolute inset-0 bg-blue-600/10" />
                   </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-blue-900/30">
                   <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{formatDate(review.createdAt)}</span>
                   <div className="flex gap-2">
                      <button className="rounded-full bg-blue-900/20 px-3 py-1 text-[10px] font-black text-blue-500 hover:bg-blue-900/40 transition-colors">Digitalización</button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Add Review Dialog (Simplified for this turn) */}
        <AnimatePresence>
           {isFormOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.9, opacity: 0 }}
                   className="w-full max-w-lg bg-blue-950 border border-blue-500/30 rounded-[3rem] p-10 space-y-6"
                 >
                    <h3 className="text-2xl font-black text-white">COMPARTE TU EXPERIENCIA</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                       <input 
                         required
                         type="text" 
                         placeholder="Tu nombre completo" 
                         className="w-full rounded-2xl border border-blue-900 bg-[#020617] px-6 py-4 text-white outline-none"
                         value={newReview.name}
                         onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                       />
                       <div className="flex gap-2">
                          {[1,2,3,4,5].map(r => (
                             <button 
                               key={r}
                               type="button"
                               onClick={() => setNewReview({...newReview, rating: r})}
                               className={cn("p-2 rounded-lg border border-blue-900", newReview.rating >= r ? "bg-amber-500/20 text-amber-500 border-amber-500/50" : "text-slate-600")}
                             >
                                <Star className={cn("h-6 w-6", newReview.rating >= r && "fill-current")} />
                             </button>
                          ))}
                       </div>
                       <textarea 
                         required
                         rows={4}
                         placeholder="Escribe tu comentario aquí..."
                         className="w-full rounded-2xl border border-blue-900 bg-[#020617] px-6 py-4 text-white outline-none resize-none"
                         value={newReview.comment}
                         onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                       />
                       <div className="grid grid-cols-2 gap-4">
                          <button 
                             type="button" 
                             onClick={() => setIsFormOpen(false)}
                             className="py-4 rounded-full border border-blue-900 text-slate-500 font-bold"
                          >
                             Cancelar
                          </button>
                          <button 
                             type="submit"
                             className="py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500"
                          >
                             Publicar Reseña
                          </button>
                       </div>
                    </form>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}
