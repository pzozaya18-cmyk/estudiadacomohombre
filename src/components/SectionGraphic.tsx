import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MedicalCharts = ({ progress }: { progress: any }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-[30vh]">
      <div className="relative w-full max-w-5xl flex justify-center gap-6 md:gap-16 px-8">
        {/* HOMBRES Card */}
        <div className="w-1/2 max-w-[280px] md:max-w-[320px] aspect-[4/5] bg-white/20 backdrop-blur-2xl border border-white/50 rounded-sm p-6 md:p-8 flex flex-col shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)] relative z-30">
          <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-100 text-white">
            HOMBRES
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="h-[2px] w-full bg-white/50" 
                style={{ width: `${100 - (i * 5)}%` }}
              />
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 flex justify-between">
            <div className="w-12 h-1 bg-white/60" />
            <div className="w-8 h-1 bg-white/40" />
          </div>
        </div>

        {/* MUJERES Card */}
        <div className="w-1/2 max-w-[280px] md:max-w-[320px] aspect-[4/5] bg-white/10 backdrop-blur-[4px] border border-white/20 rounded-sm p-6 md:p-8 flex flex-col shadow-xl relative z-10 scale-95">
          <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-60 text-white">
            MUJERES
          </div>
          <div className="flex-1 flex flex-col gap-4 blur-[3px] opacity-40">
             {[...Array(5)].map((_, i) => (
              <div key={i} className="h-[2px] w-full bg-white/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionGraphic = ({ type, progress, index }: { type: 'data' | 'identity' | 'void' | 'medical' | 'biological' | 'alert' | 'system'; progress?: any; index?: number }) => {
  const { scrollYProgress: internalProgress } = useScroll();
  const activeProgress = progress || internalProgress;

  if (type === 'data') {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="grid grid-cols-8 gap-4">
          {Array(32).fill(0).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: (i % 8) * 0.1 }}
              className="w-12 h-12 border-2 border-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'medical') {
    return <MedicalCharts progress={activeProgress} />;
  }

  if (type === 'biological') {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
         <motion.div 
           initial={{ rotate: -10, opacity: 0 }}
           whileInView={{ rotate: 10, opacity: 1 }}
           className="text-[300px] font-black"
         >
           XX
         </motion.div>
      </div>
    );
  }

  if (type === 'alert') {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
         <motion.div 
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="text-[500px] font-black"
         >
           !
         </motion.div>
      </div>
    );
  }

  if (type === 'system') {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
         <div className="flex gap-10">
           {Array(3).fill(0).map((_, i) => (
             <div key={i} className="w-20 h-screen bg-white" />
           ))}
         </div>
      </div>
    );
  }

  if (type === 'identity') {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
      </div>
    );
  }

  return null;
};
