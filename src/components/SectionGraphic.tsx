import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MedicalCharts = ({ progress, labels }: { progress: any; labels: { clear: string; obscured: string } }) => {
  const driftY = useTransform(progress, [0, 1], [26, -24]);
  const desktopCards = [
    { label: labels.clear, tone: 'clear', className: 'left-[6%] top-[12%] w-[clamp(136px,13vw,204px)] rotate-[-8deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'left-[26%] top-[7%] w-[clamp(118px,11vw,170px)] rotate-[7deg]' },
    { label: labels.clear, tone: 'clear', className: 'right-[8%] top-[15%] w-[clamp(140px,13vw,210px)] rotate-[9deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'right-[25%] top-[8%] w-[clamp(112px,10.5vw,164px)] rotate-[-6deg]' },
    { label: labels.clear, tone: 'clear', className: 'left-[9%] bottom-[13%] w-[clamp(136px,12.2vw,198px)] rotate-[6deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'left-[30%] bottom-[6%] w-[clamp(112px,10vw,158px)] rotate-[-10deg]' },
    { label: labels.clear, tone: 'clear', className: 'right-[11%] bottom-[11%] w-[clamp(128px,12vw,192px)] rotate-[-7deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'right-[29%] bottom-[5%] w-[clamp(108px,9.5vw,154px)] rotate-[8deg]' },
  ];
  const mobileCards = [
    { label: labels.clear, tone: 'clear', className: 'left-[-5%] top-[17%] w-[116px] rotate-[-8deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'right-[-8%] top-[24%] w-[104px] rotate-[9deg]' },
    { label: labels.clear, tone: 'clear', className: 'left-[3%] bottom-[16%] w-[108px] rotate-[7deg]' },
    { label: labels.obscured, tone: 'obscured', className: 'right-[7%] bottom-[13%] w-[98px] rotate-[-10deg]' },
  ];

  return (
    <motion.div
      style={{ y: driftY }}
      className="medical-research-field absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="hidden h-full w-full sm:block">
        {desktopCards.map((card, index) => (
          <ResearchCard key={`${card.label}-${index}`} {...card} />
        ))}
      </div>
      <div className="h-full w-full sm:hidden">
        {mobileCards.map((card, index) => (
          <ResearchCard key={`${card.label}-mobile-${index}`} {...card} />
        ))}
      </div>
    </motion.div>
  );
};

type ResearchCardProps = {
  label: string;
  tone: string;
  className: string;
};

const ResearchCard: React.FC<ResearchCardProps> = ({ label, tone, className }) => (
  <div className={`medical-research-card medical-research-card-${tone} absolute ${className}`}>
    <div className="medical-research-card-label">{label}</div>
    <div className="medical-research-card-lines">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="medical-research-card-rule"
          style={{ width: `${92 - index * 12}%` }}
        />
      ))}
    </div>
  </div>
);

export const SectionGraphic = ({ type, progress, index, medicalLabels = { clear: 'HOMBRE', obscured: 'MUJERES' } }: { type: 'data' | 'identity' | 'void' | 'medical' | 'biological' | 'alert' | 'system'; progress?: any; index?: number; medicalLabels?: { clear: string; obscured: string } }) => {
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
    return <MedicalCharts progress={activeProgress} labels={medicalLabels} />;
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
