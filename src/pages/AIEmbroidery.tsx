import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Cpu, Zap, Activity, Shield, Download, Undo2, Layers, MousePointer2, Settings, Play, Image as ImageIcon } from 'lucide-react';
import { transformToEmbroidery } from '../services/aiService';
import { cn } from '../lib/utils';

type Step = 'upload' | 'processing' | 'result';

export default function AIEmbroidery() {
  const [step, setStep] = useState<Step>('upload');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [embroideredImage, setEmbroideredImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stitchCount, setStitchCount] = useState(0);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => setOriginalImage(reader.result as string);
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const startTransformation = async () => {
    if (!originalImage) return;
    setStep('processing');
    setProgress(0);
    setStitchCount(0);

    // Simulation steps
    const simulationStates = [
      { text: 'Iniciando Wilcom E4.2 Core...', time: 1000 },
      { text: 'Analizando vectores y profundidades...', time: 1500 },
      { text: 'Generando mapa de puntadas Tatami...', time: 2000 },
      { text: 'Calculando compensación de estiramiento...', time: 1500 },
      { text: 'Optimizando saltos de hilo y cortes...', time: 2000 },
      { text: 'Renderizado hiperrealista final...', time: 3000 },
    ];

    let currentProgress = 0;
    for (const s of simulationStates) {
      setStatus(s.text);
      const interval = setInterval(() => {
        currentProgress += Math.random() * 2;
        if (currentProgress >= 100) currentProgress = 99;
        setProgress(Math.floor(currentProgress));
        setStitchCount(prev => prev + Math.floor(Math.random() * 500));
      }, 100);

      await new Promise(resolve => setTimeout(resolve, s.time));
      clearInterval(interval);
    }

    try {
      const result = await transformToEmbroidery(originalImage);
      setEmbroideredImage(result);
      setProgress(100);
      setStep('result');
    } catch (error) {
      alert("Error al transformar la imagen. Por favor intenta de nuevo.");
      setStep('upload');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-12 pb-24 overflow-hidden relative" onPaste={handlePaste}>
      {/* Tech Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:40px_40px]" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-blue-500"
           >
              <Cpu className="h-4 w-4" /> AI Embroidery Engine v2.0
           </motion.div>
           <h1 className="text-5xl font-black tracking-tighter text-white md:text-7xl">
              WILCOM <span className="text-blue-500">AI</span> SIMULATOR
           </h1>
           <p className="mx-auto max-w-2xl text-slate-400 font-medium">
              Digitalización instantánea con realismo industrial. Sube tu imagen y deja que nuestra IA genere una vista previa profesional en estilo Wilcom E4.2.
           </p>
        </div>

        {/* Main Interface */}
        <div className="relative rounded-[3rem] border border-blue-900/50 bg-blue-950/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(29,78,216,0.1)]">
           {/* Wilcom-like Toolbar */}
           <div className="flex items-center gap-4 border-b border-blue-900/40 p-6">
              <div className="flex gap-2">
                 <div className="h-3 w-3 rounded-full bg-red-500/50" />
                 <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                 <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="h-6 w-px bg-blue-900/50" />
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                 {[Undo2, MousePointer2, Layers, Settings, Zap, Activity].map((Icon, i) => (
                    <Icon key={i} className="h-4 w-4 text-slate-500 hover:text-blue-400 cursor-pointer transition-colors flex-shrink-0" />
                 ))}
              </div>
           </div>

           <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                 {step === 'upload' && (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="flex flex-col items-center gap-8"
                    >
                       <div 
                         onClick={() => fileInputRef.current?.click()}
                         className={cn(
                           "group relative flex aspect-square w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-blue-900/50 bg-[#020617] transition-all hover:border-blue-500/50 hover:bg-blue-900/10",
                           originalImage && "border-solid border-blue-500/30"
                         )}
                       >
                          {originalImage ? (
                             <div className="relative h-full w-full p-4">
                                <img src={originalImage} className="h-full w-full rounded-[2rem] object-contain opacity-80" alt="" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                   <div className="rounded-full bg-blue-600 p-4 text-white shadow-xl shadow-blue-600/30">
                                      <ImageIcon className="h-8 w-8" />
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <div className="flex flex-col items-center gap-4 p-12 text-center">
                                <div className="rounded-full bg-blue-900/20 p-6 text-blue-500 group-hover:scale-110 transition-transform">
                                   <Upload className="h-10 w-10 text-blue-500" />
                                </div>
                                <div className="space-y-2">
                                   <p className="text-xl font-bold text-white">Sube una imagen o pega aquí</p>
                                   <p className="text-sm text-slate-500">Admitimos JPG, PNG de alta calidad</p>
                                </div>
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-900/30 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                   Ctrl + V para pegar
                                </div>
                             </div>
                          )}
                          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                       </div>

                       <button
                         disabled={!originalImage}
                         onClick={startTransformation}
                         className={cn(
                           "flex w-full max-w-md items-center justify-center gap-3 rounded-full py-5 text-lg font-black transition-all",
                           originalImage ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]" : "bg-slate-900 text-slate-700 cursor-not-allowed"
                         )}
                       >
                          <Zap className="h-6 w-6" />
                          TRANSFORMAR
                       </button>
                    </motion.div>
                 )}

                 {step === 'processing' && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-12 py-12"
                    >
                       <div className="relative h-64 w-64">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-b-2 border-l-2 border-blue-500"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute inset-4 rounded-full border-t-2 border-r-2 border-blue-900/50"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                             <span className="text-4xl font-black text-white">{progress}%</span>
                             <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Procesando</span>
                          </div>
                          
                          {/* Stitch dots animation */}
                          {[...Array(10)].map((_, i) => (
                             <motion.div
                               key={i}
                               animate={{ 
                                 scale: [0, 1, 0],
                                 x: [0, (Math.random() - 0.5) * 200],
                                 y: [0, (Math.random() - 0.5) * 200],
                               }}
                               transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                               className="absolute left-1/2 top-1/2 h-1 w-1 bg-blue-400 rounded-full"
                             />
                          ))}
                       </div>

                       <div className="w-full max-w-md space-y-4">
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                             <span>{status}</span>
                             <span className="text-blue-400 font-mono">{stitchCount.toLocaleString()} PUNTADAS</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-950">
                             <motion.div
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                             />
                          </div>
                          <div className="flex gap-2">
                             {[...Array(4)].map((_, i) => (
                               <div key={i} className={cn("h-1 flex-1 rounded-full", i < (progress / 25) ? "bg-blue-500" : "bg-blue-950")} />
                             ))}
                          </div>
                       </div>

                       <div className="flex gap-8">
                          <div className="flex flex-col items-center gap-1 opacity-50">
                             <Play className="h-5 w-5 text-blue-400" />
                             <span className="text-[8px] font-bold uppercase tracking-tighter">Motor Wilcom Active</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-50">
                             <Shield className="h-5 w-5 text-emerald-400" />
                             <span className="text-[8px] font-bold uppercase tracking-tighter">Security Scan OK</span>
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {step === 'result' && embroideredImage && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid gap-12 lg:grid-cols-2"
                    >
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <h3 className="text-xl font-bold text-white">Imagen Original</h3>
                             <span className="text-[10px] font-black uppercase text-slate-500">Input Source</span>
                          </div>
                          <div className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-black aspect-square">
                             <img src={originalImage!} className="h-full w-full object-contain" alt="" />
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <h3 className="text-xl font-bold text-blue-500">Simulación Wilcom E4.2</h3>
                             <span className="rounded-full bg-blue-600/20 px-3 py-1 text-[10px] font-black uppercase text-blue-400">AI PRO Render</span>
                          </div>
                          <div className="relative overflow-hidden rounded-3xl border border-blue-500/50 bg-[#020617] aspect-square shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                             <img src={embroideredImage} className="h-full w-full object-contain" alt="" />
                             
                             {/* Stitch Map Texture Overlay (simulated) */}
                             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                          </div>
                       </div>

                       <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 mt-8">
                          <button
                            onClick={() => setStep('upload')}
                            className="flex-1 rounded-full border border-blue-900 hover:border-blue-500/50 py-5 text-sm font-bold text-slate-400 transition-all"
                          >
                             Volver a Empezar
                          </button>
                          <a
                            href={embroideredImage}
                            download="kavito-ai-embroidery.png"
                            className="flex-[2] flex items-center justify-center gap-3 rounded-full bg-blue-600 py-5 text-lg font-black text-white hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                          >
                             <Download className="h-6 w-6" />
                             DESCARGAR SIMULACIÓN
                          </a>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
