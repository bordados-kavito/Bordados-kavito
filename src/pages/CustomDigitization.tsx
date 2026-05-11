import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Ruler, FileType, MessageSquare, CreditCard, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const FORMATS = ['DST', 'PES', 'JEF', 'EMB', 'EXP', 'HUS', 'VP3', 'XXX', 'VIP', 'ART'];

export default function CustomDigitization() {
  const { user, login } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [size, setSize] = useState('10x10');
  const [selectedFormat, setSelectedFormat] = useState('DST');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      login();
      return;
    }
    if (!image) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'custom_requests'), {
        userId: user.uid,
        userEmail: user.email,
        image,
        size,
        format: selectedFormat,
        instructions,
        status: 'pending',
        createdAt: Date.now(),
        price: 10
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error al enviar pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-blue-950/20 border border-blue-500/30 rounded-[3rem] p-12 text-center space-y-6"
        >
          <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
             <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-white">PEDIDO RECIBIDO</h2>
          <p className="text-slate-400">Nuestro equipo de digitalizadores Wilcom comenzará a trabajar en tu diseño. Recibirás un correo con el archivo final en menos de 24 horas.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full rounded-full bg-blue-600 py-4 font-bold text-white hover:bg-blue-500"
          >
            Realizar otro pedido
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center space-y-4">
           <h1 className="text-4xl font-black text-white md:text-6xl uppercase tracking-tighter">
              Digitalización <span className="text-blue-500">A Pedido</span>
           </h1>
           <p className="mx-auto max-w-xl text-slate-400">
              Convierte cualquier logo o diseño complejo en un archivo de bordado profesional. Digitalizado manualmente por expertos en Wilcom E4.2.
           </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-8">
             {/* Step 1: Image */}
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-black text-white">01</div>
                   <h3 className="text-xl font-bold text-white">Sube tu Imagen</h3>
                </div>
                <div 
                  onClick={() => document.getElementById('custom-file')?.click()}
                  className={cn(
                    "relative aspect-video rounded-[2rem] border-2 border-dashed border-blue-900/50 bg-blue-950/20 cursor-pointer overflow-hidden transition-all hover:bg-blue-900/10",
                    image && "border-solid border-blue-500/30"
                  )}
                >
                   {image ? (
                      <img src={image} className="h-full w-full object-contain p-8" alt="" />
                   ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                         <Upload className="h-10 w-10" />
                         <span className="text-sm font-bold">Haz clic o arrastra tu logo aquí</span>
                      </div>
                   )}
                   <input id="custom-file" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
             </div>

             {/* Step 2: Specs */}
             <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-black text-white">02</div>
                      <h3 className="text-xl font-bold text-white">Medidas Sugeridas</h3>
                   </div>
                   <div className="relative">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Ej: 10x10 cm, 3x5 pulgadas..." 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full rounded-2xl border border-blue-900 bg-blue-950/20 py-4 pl-12 pr-6 text-white focus:border-blue-500 outline-none"
                      />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-black text-white">03</div>
                      <h3 className="text-xl font-bold text-white">Formato de Salida</h3>
                   </div>
                   <div className="relative">
                      <FileType className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                      <select 
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-full rounded-2xl border border-blue-900 bg-blue-950/20 py-4 pl-12 pr-6 text-white focus:border-blue-500 outline-none appearance-none"
                      >
                         {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                   </div>
                </div>
             </div>

             {/* Step 3: Instructions */}
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-black text-white">04</div>
                   <h3 className="text-xl font-bold text-white">Instrucciones Especiales</h3>
                </div>
                <div className="relative">
                   <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                   <textarea 
                     rows={4}
                     placeholder="Ej: Necesito que tenga alto relieve en los bordes, usar hilos metalizados, evitar deformación en poliéster..."
                     value={instructions}
                     onChange={(e) => setInstructions(e.target.value)}
                     className="w-full rounded-3xl border border-blue-900 bg-blue-950/20 py-4 pl-12 pr-6 text-white focus:border-blue-500 outline-none resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Checkout Side */}
          <div className="space-y-8">
             <div className="sticky top-32 rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-blue-900/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Resumen del Pedido</h3>
                
                <div className="space-y-4 divide-y divide-blue-900/30">
                   <div className="flex justify-between pb-4">
                      <span className="text-slate-400">Digitalización Wilcom</span>
                      <span className="text-white font-bold">$10.00 USD</span>
                   </div>
                   <div className="flex justify-between py-4">
                      <span className="text-slate-400">Tiempo de Entrega</span>
                      <span className="text-blue-400 font-bold">{'< 24 Horas'}</span>
                   </div>
                   <div className="flex justify-between py-4">
                      <span className="text-slate-400">Revisiones</span>
                      <span className="text-blue-400 font-bold">ILIMITADAS</span>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-blue-500/20 flex justify-between items-end mb-8">
                   <span className="text-sm font-bold text-slate-500 uppercase">Total Final</span>
                   <span className="text-4xl font-black text-white">$10<span className="text-xl opacity-50">.00</span></span>
                </div>

                <button 
                  disabled={!image || isSubmitting}
                  onClick={handleSubmit}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 rounded-full py-5 text-lg font-black transition-all",
                    image && !isSubmitting ? "bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30" : "bg-slate-900 text-slate-700 cursor-not-allowed"
                  )}
                >
                   {isSubmitting ? <History className="h-6 w-6 animate-spin" /> : <CreditCard className="h-6 w-6" />}
                   {isSubmitting ? 'PROCESANDO...' : 'PAGAR AHORA'}
                </button>

                <div className="mt-6 flex items-center justify-center gap-4">
                   <ShieldCheck className="h-5 w-5 text-emerald-500" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Transacción SSL Encriptada</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
