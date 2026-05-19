/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionValueEvent, useSpring } from 'motion/react';
import { Globe } from 'lucide-react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { SectionGraphic } from './components/SectionGraphic';
import { content } from './content';

export default function App() {
  const getInitialLanguage = (): 'es' | 'en' => {
    if (typeof window === 'undefined') return 'es';
    const params = new URLSearchParams(window.location.search);
    const requestedLang = params.get('lang');
    const resolvedLang = requestedLang === 'en' ? 'en' : 'es';

    if (requestedLang !== resolvedLang) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('lang', resolvedLang);
      window.history.replaceState(null, '', nextUrl.toString());
    }

    return resolvedLang;
  };

  const [lang, setLang] = useState<'es' | 'en'>(getInitialLanguage);
  const [isFinalScreenVisible, setIsFinalScreenVisible] = useState(false);
  const lastLanguageToggleAt = useRef(0);
  const t = content[lang];
  const { scrollYProgress } = useScroll();
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.92, 0.965], [1, 1, 0]);
  const nextLang = lang === 'es' ? 'en' : 'es';

  useEffect(() => {
    const syncLanguageFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedLang = params.get('lang');
      const resolvedLang = requestedLang === 'en' ? 'en' : 'es';
      setLang(resolvedLang);

      if (requestedLang !== resolvedLang) {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('lang', resolvedLang);
        window.history.replaceState(null, '', nextUrl.toString());
      }
    };

    syncLanguageFromUrl();
    window.addEventListener('popstate', syncLanguageFromUrl);

    return () => window.removeEventListener('popstate', syncLanguageFromUrl);
  }, []);

  const handleLanguageToggle = (event: React.MouseEvent<HTMLAnchorElement> | React.PointerEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const now = Date.now();
    if (now - lastLanguageToggleAt.current < 250) return;
    lastLanguageToggleAt.current = now;
    setLang(nextLang);

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', nextLang);
    window.history.pushState(null, '', nextUrl.toString());
  };

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-primary">
      <BackgroundGrid />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-start gap-4">
        <div className="text-white font-bold text-[clamp(0.82rem,2.4vw,1.25rem)] uppercase tracking-[0.18em] pointer-events-none">
          {t.nav.logo}
        </div>
        <a
          href={`/?lang=${nextLang}`}
          onPointerDown={handleLanguageToggle}
          onClick={handleLanguageToggle}
          className="text-white font-semibold text-[clamp(0.82rem,2.4vw,1.125rem)] hover:opacity-70 transition-opacity pointer-events-auto uppercase inline-flex items-center gap-2"
        >
          <Globe className="h-[1.05em] w-[1.05em]" strokeWidth={2.4} aria-hidden="true" />
          {lang === 'es' ? 'es | en' : 'en | es'}
        </a>
      </nav>

      <main className="relative z-10">
        {t.screens.map((screen, index) => {
          if (screen.id === 13) {
            return null;
          }

          const graphicType = 
            [2].includes(screen.id) ? 'medical' : 
            [11, 17, 7, 7.1].includes(screen.id) ? 'identity' : 
            [14].includes(screen.id) ? 'system' : 
            undefined;

          const graphic = 
            graphicType === 'medical' ? 'medical' :
            graphicType === 'identity' ? 'identity' :
            graphicType === 'system' ? 'system' :
            undefined;

          if (screen.layout === 'comparison') {
            return <ComparisonSection key={screen.id} screen={screen} graphic={graphic as any} />;
          }

          if (screen.layout === 'beats') {
            return <BeatsSection key={screen.id} screen={screen} />;
          }

          if (screen.layout === 'final') {
            return <FinalSection key={screen.id} screen={screen} onVisibleChange={setIsFinalScreenVisible} />;
          }

          if (screen.id === 1 || screen.id === 4) {
            return <PulsingHeroSection key={screen.id} screen={screen} />;
          }

          if (screen.id === 3) {
            return <ScreenThreeSection key={screen.id} screen={screen} />;
          }

          if (screen.sticky || screen.mode === 'karaoke' || screen.mode === 'karaoke_moments') {
            return (
              <StickyScrollSection 
                key={screen.id} 
                screen={screen} 
                isLast={index === t.screens.length - 1} 
              />
            );
          }
          return (
            <SimpleSection 
              key={screen.id} 
              screen={screen} 
              graphic={graphicType as any}
              isLast={index === t.screens.length - 1} 
            />
          );
        })}
      </main>

      <footer className="relative z-10 p-12 text-center opacity-50 text-xs uppercase tracking-widest">
        © {new Date().getFullYear()} Asociación Nuevo Horizonte
      </footer>
      {!isFinalScreenVisible && <GlobalScrollHint opacity={scrollHintOpacity} />}
    </div>
  );
}

const GlobalScrollHint = ({ opacity }: { opacity: any }) => (
  <motion.div className="scroll-hint-fixed" style={{ opacity }} aria-hidden="true">
    <div className="scroll-hint-arrow" />
  </motion.div>
);

const ScrollHintArrow = () => null;

const BeatsSection: React.FC<{ screen: any }> = ({ screen }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: screen.id === 12 ? ["start start", "end end"] : ["start end", "end start"]
  });

  if (screen.id === 10 || screen.id === 11 || screen.id === 12) {
    return (
      <OrderedNarrativeSection
        screen={screen}
        containerRef={containerRef}
        progress={scrollYProgress}
      />
    );
  }

  // Custom timings and offsets for Beats screens behavior
  const getBeatConfig = (index: number) => {
    if (screen.id === 10) {
      if (index === 0) return { start: 0.10, end: 0.40, stay: false, yOffset: 0 };
      
      const groupStart = 0.42;
      const buildDuration = 0.40;
      const step = buildDuration / 5;
      const offsets = [-150, -78, -6, 66, 138]; 
      
      if (index >= 1 && index <= 5) {
        return { 
          start: groupStart + (index - 1) * step, 
          end: 1.0, 
          stay: true, 
          yOffset: offsets[index - 1] 
        };
      }
    }

    if (screen.id === 11) {
      // Beat 0: StandaloneSentence
      if (index === 0) return { start: 0.10, end: 0.40, stay: false, yOffset: 0 };
      
      // Beats 1-3: Accumulate Sentence 2
      const groupStart = 0.42;
      const buildDuration = 0.40;
      const step = buildDuration / 3;
      const offsets = [-118, 0, 118]; // 3 line accumulation for screen 11
      
      if (index >= 1 && index <= 3) {
        return { 
          start: groupStart + (index - 1) * step, 
          end: 1.0, 
          stay: true, 
          yOffset: offsets[index - 1] 
        };
      }
    }

    if (screen.id === 12) {
      const groupStart = 0.15;
      const buildDuration = 0.65;
      const step = buildDuration / 3;
      const offsets = [-190, 0, 190]; 
      
      return { 
        start: groupStart + index * step, 
        end: 1.0, 
        stay: true, 
        yOffset: offsets[index] 
      };
    }

    if (screen.id === 13) {
      // Beat 0: Sticky Header (LA MOLESTIA NUEVOS SÍNTOMAS)
      // We use stay: false so it can exit at 0.5 accurately
      if (index === 0) {
        return { start: 0.0, end: 0.53, stay: false, yOffset: -128, xOffset: 0 };
      }
      // Beats 1, 2, 3: Cyclic Symptoms underneath the header
      if (index >= 1 && index <= 3) {
        const step = 0.35 / 3;
        return { 
          start: 0.18 + (index - 1) * step, 
          end: 0.18 + index * step, 
          stay: false, 
          yOffset: 108,
          xOffset: 0
        };
      }
      // Beat 4: TODO LO DEMÁS SE DESCARTA (Sticky Phase 2)
      if (index === 4) {
        return { start: 0.55, end: 1.0, stay: true, yOffset: -88, xOffset: 0 };
      }
      // Beat 5: The card (ES SOLO SU AUTISMO)
      if (index === 5) {
        return { start: 0.78, end: 1.0, stay: true, yOffset: 156, xOffset: 0 };
      }
    }

    if (screen.id === 14 || screen.id === 15) {
      return { start: 0.1, end: 0.9, stay: true, yOffset: 0, xOffset: 0 };
    }

    if (screen.id === 16) {
      return { start: 0.06, end: 0.72, stay: true, yOffset: 0, xOffset: 0 };
    }

    if (screen.id === 17) {
      if (index === 0) {
        return { start: 0.12, end: 1.0, stay: true, yOffset: -96, xOffset: '0%' };
      }
      return { start: 0.42, end: 1.0, stay: true, yOffset: 78, xOffset: '0%' };
    }
    
    if (screen.id === 18) {
      if (index === 0) {
        // "NO SE LE" - Sticky middle header for replacements
        return { start: 0.08, end: 0.95, stay: true, yOffset: -84, xOffset: '0%' };
      }
      if (index >= 1 && index <= 3) {
        // Replacement words: ESTUDIA, ENTIENDE, APOYA
        const cycleStart = 0.18;
        const cycleEnd = 0.9;
        const step = (cycleEnd - cycleStart) / 3;
        return { 
          start: cycleStart + (index - 1) * step, 
          end: cycleStart + index * step, 
          stay: false, 
          yOffset: 92,
          xOffset: '0%'
        };
      }
    }
    
    const total = screen.beats.length;
    return { start: index / total, end: (index + 1) / total, stay: false, yOffset: 0, xOffset: 0 };
  };

  return (
    <section ref={containerRef} className={`relative ${screen.id === 13 || screen.id === 18 ? 'h-[600vh]' : screen.id === 17 ? 'h-[390vh]' : screen.id === 10 || screen.id === 11 || screen.id === 12 ? 'h-[320vh]' : 'h-[240vh]'}`}>
      <div className={`sticky top-0 h-[100svh] w-full flex items-center justify-center ${screen.id === 16 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <div className={`relative z-10 w-full min-h-[100svh] flex flex-col items-center justify-center sticky-safe ${screen.id === 16 ? 'screen-16-safe' : ''}`}>
          {screen.beats.map((beat: any, i: number) => {
            const config = getBeatConfig(i);
            return (
              <BeatItem 
                key={i} 
                beat={beat} 
                index={i} 
                screenId={screen.id}
                start={config.start}
                end={config.end}
                stay={config.stay}
                yOffset={config.yOffset}
                xOffset={config.xOffset}
                progress={scrollYProgress} 
              />
            );
          })}
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const OrderedNarrativeSection: React.FC<{
  screen: any;
  containerRef: React.RefObject<HTMLElement | null>;
  progress: any;
}> = ({ screen, containerRef, progress }) => {
  if (screen.id === 12) {
    return (
      <AutismOnlyTransitionSection
        screen={screen}
        containerRef={containerRef}
        progress={progress}
      />
    );
  }

  const lines = getOrderedNarrativeLines(screen);
  const totalWords = lines.reduce((count, line) => count + line.words.length, 0);
  const opacity = useTransform(
    progress,
    [0, 0.06, 0.9, 0.98],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [0, 0.08, 0.9, 0.98],
    [28, 0, 0, -24],
    { ease: easeInOut }
  );

  return (
    <section ref={containerRef} className="relative h-[380vh]">
      <div className="sticky top-0 h-dvh w-full flex items-center justify-center overflow-visible">
        <motion.div
          style={{ opacity, y }}
          className={`ordered-narrative ordered-narrative-${screen.id} relative z-10 flex flex-col items-center justify-center text-center font-black uppercase tracking-normal text-white gap-[clamp(0.6rem,2.2vh,1.8rem)]`}
        >
          {lines.map((line, lineIndex) => (
            <div
              key={`${line.text}-${lineIndex}`}
              className={`ordered-narrative-line ${getOrderedNarrativeLineClass(screen.id, line.text)}`}
            >
              {line.words.map((word, wordIndex) => (
                <OrderedNarrativeWord
                  key={`${word}-${lineIndex}-${wordIndex}`}
                  word={word}
                  lineText={line.text}
                  screenId={screen.id}
                  index={line.startIndex + wordIndex}
                  total={totalWords}
                  progress={progress}
                  highlighted={isOrderedWordHighlighted(word, line.highlight)}
                />
              ))}
            </div>
          ))}
        </motion.div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const AutismOnlyTransitionSection: React.FC<{
  screen: any;
  containerRef: React.RefObject<HTMLElement | null>;
  progress: any;
}> = ({ screen, containerRef, progress }) => {
  const [sectionProgress, setSectionProgress] = useState(0);
  const isEnglish = screen.beats[0]?.text.toUpperCase().includes('FOR MANY');
  const firstLines = screen.beats[0].text.split('\n');
  const secondLines = screen.beats[1].text.split('\n');
  const finalPhrase = isEnglish
    ? ['EVERYTHING ELSE IS', 'IGNORED.']
    : ['TODO LO DEMÁS ES', 'IGNORADO.'];
  const examples = isEnglish
    ? ['PAIN.', 'NEW SYMPTOMS.', 'HORMONAL CHANGES.', 'MENOPAUSE.', 'CHRONIC ILLNESS.']
    : ['LA MOLESTIA.', 'NUEVOS SÍNTOMAS.', 'CAMBIOS HORMONALES.', 'MENOPAUSIA.', 'ENFERMEDADES CRÓNICAS.'];

  useMotionValueEvent(progress, 'change', (latest: number) => {
    setSectionProgress(latest);
  });

  const introY = useTransform(progress, [0, 0.08], [28, 0], { ease: easeInOut });
  const upperOpacity =
    sectionProgress <= 0.62 ? 1 : sectionProgress >= 0.7 ? 0 : 1 - easeInOut((sectionProgress - 0.62) / 0.08);
  const upperY = useTransform(progress, [0.56, 0.7], [0, -86], { ease: easeInOut });
  const finalY = useTransform(progress, [0.62, 0.74], ['0vh', '-43vh'], { ease: easeInOut });
  const finalScale = useTransform(progress, [0.62, 0.74], [1, 0.66], { ease: easeInOut });

  return (
    <section ref={containerRef} className="relative h-[820vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <AutismGlassCards progress={progress} />
        <div className="autism-transition-stage pointer-events-none absolute inset-0 z-30">
          <motion.div
            style={{ y: introY }}
            className="absolute inset-0"
          >
            <motion.div
              style={{ opacity: upperOpacity, y: upperY }}
              className="autism-transition-copy autism-transition-copy-top"
            >
              {firstLines.map((line: string, index: number) => (
                <AutismTransitionLine
                  key={line}
                  line={line}
                  tone="secondary"
                  openingIndex={index}
                  sectionProgress={sectionProgress}
                  revealRange={[0.05 + index * 0.065, 0.13 + index * 0.065]}
                />
              ))}
            </motion.div>

            <motion.div
              style={{ opacity: upperOpacity, y: upperY }}
              className="autism-transition-copy autism-transition-copy-middle"
            >
              {secondLines.map((line: string, index: number) => (
                <AutismTransitionLine
                  key={line}
                  line={line}
                  tone="primary"
                  sectionProgress={sectionProgress}
                  revealRange={[0.27 + index * 0.04, 0.35 + index * 0.04]}
                />
              ))}
            </motion.div>

            <motion.div
              style={{ y: finalY, scale: finalScale }}
              className="autism-transition-final"
            >
              <AutismTransitionLine
                line={finalPhrase[0]}
                tone="primary"
                sectionProgress={sectionProgress}
                revealRange={[0.5, 0.56]}
                className="autism-transition-final-main large-display-text"
              />
              <AutismTransitionLine
                line={finalPhrase[1]}
                tone="primary"
                sectionProgress={sectionProgress}
                revealRange={[0.54, 0.6]}
                className="autism-transition-final-emphasis large-display-text"
              />
            </motion.div>
          </motion.div>

          <div className="autism-transition-examples">
            {examples.map((line, index) => (
              <AutismTransitionExample
                key={line}
                line={line}
                index={index}
                progress={progress}
              />
            ))}
          </div>
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const AutismTransitionLine: React.FC<{
  line: string;
  tone: 'primary' | 'secondary';
  openingIndex?: number;
  sectionProgress: number;
  revealRange: [number, number];
  className?: string;
}> = ({ line, tone, openingIndex, sectionProgress, revealRange, className = '' }) => {
  const cleanLine = normalizeWord(line);
  const isHero = getAutismOnlyHeroLines().includes(cleanLine);
  const openingClass =
    openingIndex === 0
      ? 'autism-transition-opening-small'
      : openingIndex === 1
        ? 'autism-transition-opening-medium'
        : openingIndex === 2
          ? 'autism-transition-opening-hero'
          : '';
  const words = line.split(/\s+/).filter(Boolean);

  return (
    <div
      className={`autism-transition-line ${
        tone === 'primary' || isHero ? 'autism-transition-line-primary' : 'autism-transition-line-secondary'
      } ${openingClass} ${className}`}
    >
      {words.map((word, index) => (
        <AutismTransitionWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          sectionProgress={sectionProgress}
          revealRange={revealRange}
        />
      ))}
    </div>
  );
};

const AutismTransitionWord: React.FC<{
  word: string;
  index: number;
  total: number;
  sectionProgress: number;
  revealRange: [number, number];
}> = ({ word, index, total, sectionProgress, revealRange }) => {
  const [start, end] = revealRange;
  const span = end - start;
  const wordStart = start + (index / Math.max(total, 1)) * span * 0.72;
  const wordEnd = wordStart + span * 0.22;
  const revealProgress =
    sectionProgress < wordStart
      ? 0
      : sectionProgress >= wordEnd
        ? 1
        : easeInOut((sectionProgress - wordStart) / (wordEnd - wordStart));
  const opacity = revealProgress >= 1 ? 1 : revealProgress <= 0 ? 0 : revealProgress;
  const y = 18 * (1 - revealProgress);

  return (
    <motion.span style={{ opacity, y }} className="autism-transition-word">
      {word}
    </motion.span>
  );
};

const AutismTransitionExample: React.FC<{ line: string; index: number; progress: any }> = ({ line, index, progress }) => {
  const start = 0.75 + index * 0.045;
  const enterEnd = start + 0.015;
  const exitStart = start + 0.031;
  const end = start + 0.045;
  const opacity = useTransform(progress, (latest: number) => {
    if (latest < start || latest >= end) return 0;
    if (latest >= enterEnd && latest <= exitStart) return 1;
    if (latest < enterEnd) return easeInOut((latest - start) / (enterEnd - start));
    return 1 - easeInOut((latest - exitStart) / (end - exitStart));
  });
  const y = useTransform(progress, (latest: number) => {
    if (latest < start) return 58;
    if (latest >= end) return -58;
    if (latest < enterEnd) return 58 * (1 - easeInOut((latest - start) / (enterEnd - start)));
    if (latest <= exitStart) return 0;
    return -58 * easeInOut((latest - exitStart) / (end - exitStart));
  });
  const normalized = normalizeWord(line);
  const isMajor =
    normalized === 'MENOPAUSIA' ||
    normalized === 'MENOPAUSE' ||
    normalized === 'ENFERMEDADES CRÓNICAS' ||
    normalized === 'CHRONIC ILLNESS';

  return (
    <motion.div
      style={{ opacity, y }}
      className={`autism-transition-example ${isMajor ? 'autism-transition-example-major' : ''}`}
    >
      {line}
    </motion.div>
  );
};

const IgnoredFollowupPhase: React.FC<{ progress: any; screen: any }> = ({ progress, screen }) => {
  const isEnglish = screen.beats[0]?.text.toUpperCase().includes('FOR MANY');
  const pinnedPhrase = isEnglish
    ? ['EVERYTHING ELSE IS', 'IGNORED.']
    : ['TODO LO DEMÁS ES', 'IGNORADO.'];
  const examples = isEnglish
    ? ['PAIN.', 'NEW SYMPTOMS.', 'HORMONAL CHANGES.', 'MENOPAUSE.', 'CHRONIC ILLNESS.']
    : ['LA MOLESTIA.', 'NUEVOS SÍNTOMAS.', 'CAMBIOS HORMONALES.', 'MENOPAUSIA.', 'ENFERMEDADES CRÓNICAS.'];

  const anchorOpacity = useTransform(progress, [0.78, 0.86], [0, 1]);
  const anchorY = useTransform(progress, [0.78, 0.86], [48, 0], { ease: easeInOut });

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      <motion.div
        style={{ opacity: anchorOpacity, y: anchorY }}
        className="ignored-anchor absolute left-1/2 top-[24vh] w-[min(88vw,900px)] -translate-x-1/2 text-center font-black uppercase"
      >
        <span className="ignored-anchor-line">{pinnedPhrase[0]}</span>
        <span className="ignored-anchor-line ignored-anchor-emphasis">{pinnedPhrase[1]}</span>
      </motion.div>
      <div className="absolute inset-x-0 bottom-[8vh] top-[40vh] flex items-center justify-center overflow-hidden">
        {examples.map((line, index) => (
          <IgnoredFollowupLine
            key={line}
            line={line}
            index={index}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
};

const IgnoredFollowupLine: React.FC<{ line: string; index: number; progress: any }> = ({ line, index, progress }) => {
  const start = 0.8 + index * 0.04;
  const middle = start + 0.018;
  const end = start + 0.036;
  const opacity = useTransform(progress, [start, start + 0.012, end - 0.01, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, middle, end], [190, 0, -190], { ease: easeInOut });
  const normalized = normalizeWord(line);
  const isMajor =
    normalized === 'MENOPAUSIA' ||
    normalized === 'MENOPAUSE' ||
    normalized === 'ENFERMEDADES CRÓNICAS' ||
    normalized === 'CHRONIC ILLNESS';

  return (
    <motion.div
      style={{ opacity, y }}
      className={`ignored-example absolute inset-x-0 mx-auto w-[min(90vw,980px)] text-center font-black uppercase text-[#fff] ${
        isMajor ? 'ignored-example-major' : ''
      }`}
    >
      {line}
    </motion.div>
  );
};

const AutismGlassCards: React.FC<{ progress: any }> = ({ progress }) => {
  const y = useTransform(progress, [0.18, 0.86], [130, -76], { ease: easeInOut });
  const opacity = useTransform(progress, [0.18, 0.36, 0.86], [0, 0.86, 0.94]);
  const rotate = useTransform(progress, [0.18, 0.86], [-2, 3]);

  const cards = [
    { x: '-34%', top: '42%', width: 'clamp(132px, 24vw, 280px)', rotate: '-5deg' },
    { x: '24%', top: '50%', width: 'clamp(148px, 26vw, 320px)', rotate: '4deg' },
    { x: '-10%', top: '60%', width: 'clamp(160px, 29vw, 350px)', rotate: '-1deg' },
    { x: '38%', top: '66%', width: 'clamp(118px, 20vw, 240px)', rotate: '7deg' },
  ];

  return (
    <motion.div
      style={{ y, opacity, rotate }}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden="true"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="autism-glass-card"
          style={{
            left: `calc(50% + ${card.x})`,
            top: card.top,
            width: card.width,
            transform: `translateX(-50%) rotate(${card.rotate})`,
          }}
        >
          <div className="autism-glass-card-label" />
          {Array.from({ length: 5 }).map((_, lineIndex) => (
            <div
              key={lineIndex}
              className="autism-glass-card-rule"
              style={{ width: `${94 - lineIndex * 11}%` }}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

const IgnoredExamplesSection: React.FC<{ screen: any }> = ({ screen }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isEnglish = screen.beats[0]?.text.toUpperCase().includes('PAIN');
  const pinnedPhrase = isEnglish ? 'EVERYTHING ELSE IS IGNORED.' : 'TODO LO DEMÁS ES IGNORADO.';
  const symptomLines = [
    ...screen.beats[0].text.split('\n'),
    screen.beats[1].text,
    screen.beats[2].text,
    screen.beats[3].text,
  ];
  const dismissalLines = [
    screen.beats[4].text.replace('\n', ' '),
    screen.beats[5].text.replace('\n', ' '),
  ];
  const allLines = [...symptomLines, ...dismissalLines];

  const pinnedY = useTransform(scrollYProgress, [0, 0.16], [42, 0], { ease: easeInOut });
  const pinnedOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[520vh]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden sticky-safe">
        <motion.div
          style={{ y: pinnedY, opacity: pinnedOpacity }}
          className="ignored-anchor absolute left-1/2 top-[24vh] z-20 w-[min(88vw,900px)] -translate-x-1/2 text-center font-black uppercase"
        >
          {pinnedPhrase}
        </motion.div>

        <div className="absolute inset-x-0 bottom-[11vh] top-[35vh] z-10 flex items-center justify-center overflow-hidden">
          {allLines.map((line: string, index: number) => (
            <IgnoredExampleLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              total={allLines.length}
              progress={scrollYProgress}
              isDismissal={index >= symptomLines.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const IgnoredExampleLine: React.FC<{
  line: string;
  index: number;
  total: number;
  progress: any;
  isDismissal: boolean;
}> = ({ line, index, total, progress, isDismissal }) => {
  const start = 0.08 + index * 0.12;
  const middle = start + 0.08;
  const end = start + 0.22;
  const opacity = useTransform(progress, [start, start + 0.04, end - 0.06, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, middle, end], [170, 0, -150], { ease: easeInOut });
  const scale = useTransform(progress, [start, middle, end], [0.96, 1, 0.96], { ease: easeInOut });

  const normalized = normalizeWord(line);
  const isMajor =
    normalized === 'MENOPAUSIA' ||
    normalized === 'MENOPAUSE' ||
    normalized === 'ENFERMEDADES CRÓNICAS' ||
    normalized === 'CHRONIC ILLNESS';

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`ignored-example absolute inset-x-0 mx-auto w-[min(90vw,980px)] text-center font-black uppercase text-[#fff] ${
        isDismissal ? 'ignored-example-dismissal' : isMajor ? 'ignored-example-major' : ''
      }`}
    >
      {line}
    </motion.div>
  );
};

const OrderedNarrativeWord: React.FC<{
  word: string;
  lineText: string;
  screenId: number;
  index: number;
  total: number;
  progress: any;
  highlighted?: boolean;
}> = ({ word, lineText, screenId, index, total, progress, highlighted }) => {
  const start = 0.08 + (index / Math.max(total, 1)) * 0.66;
  const end = start + 0.09;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const className = getOrderedNarrativeWordClass(screenId, word, lineText, highlighted);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`ordered-narrative-word ${className}`}
    >
      {word}
    </motion.span>
  );
};

const getOrderedNarrativeLines = (screen: any) => {
  const rawLines =
    screen.id === 10
      ? [
          { text: screen.beats[0].text.replace(/\n/g, ' '), highlight: screen.beats[0].highlight },
          { text: screen.beats.slice(1).map((beat: any) => beat.text).join(' '), highlight: 'MUJERES ALGO MÁS WOMEN SOMETHING ELSE' },
        ]
      : screen.beats.flatMap((beat: any) =>
          beat.text.split('\n').map((line: string) => ({
            text: line,
            highlight: beat.highlight,
          }))
        );

  let startIndex = 0;
  return rawLines
    .filter((line) => line.text.trim().length > 0)
    .map((line) => {
      const words = line.text.trim().split(/\s+/);
      const lineWithIndex = { ...line, words, startIndex };
      startIndex += words.length;
      return lineWithIndex;
    });
};

const isOrderedWordHighlighted = (word: string, highlight?: string) => {
  if (!highlight) return false;
  const cleanWord = normalizeWord(word);
  return highlight.split(/\s+/).map(normalizeWord).includes(cleanWord);
};

const getOrderedNarrativeLineClass = (screenId: number, lineText: string) => {
  if (screenId === 12) {
    const cleanLine = normalizeWord(lineText);
    if (getAutismOnlyPrimaryLines().includes(cleanLine)) return 'autism-only-line-primary';
    return 'autism-only-line-secondary';
  }

  if (screenId !== 11) return '';

  const cleanLine = normalizeWord(lineText);
  if (getDiagnosisPrimaryLines().includes(cleanLine)) {
    return 'diagnosis-line-primary';
  }

  return 'diagnosis-line-secondary';
};

const getOrderedNarrativeWordClass = (
  screenId: number,
  word: string,
  lineText: string,
  highlighted?: boolean
) => {
  if (screenId !== 11) {
    if (screenId === 12) {
      const cleanLine = normalizeWord(lineText);
      if (getAutismOnlyHeroLines().includes(cleanLine)) return 'autism-only-word-hero text-[#fff]';
      if (getAutismOnlyPrimaryLines().includes(cleanLine)) return 'autism-only-word-primary text-[#fff]';
      return 'autism-only-word-secondary';
    }

    return highlighted ? 'text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]' : 'text-white/95';
  }

  const cleanWord = normalizeWord(word);
  const cleanLine = normalizeWord(lineText);
  const primaryLines = getDiagnosisPrimaryLines();

  if (primaryLines.includes(cleanLine)) {
    if (['NUNCA', 'NEVER', 'DIAGNOSTICADAS', 'DIAGNOSED', 'DIAGNÓSTICO', 'DIAGNOSIS', 'EL AUTISMO', 'AUTISM'].includes(cleanLine)) {
      return 'diagnosis-word-hero text-[#fff]';
    }

    return 'diagnosis-word-strong text-[#fff]';
  }

  if (cleanWord === 'GENERALIZADO' || cleanWord === 'GENERALIZED') {
    return 'diagnosis-word-strong text-[#fff]';
  }

  return 'diagnosis-word-secondary';
};

const getDiagnosisPrimaryLines = () => [
  'NUNCA',
  'DIAGNOSTICADAS',
  'A UN SOLO',
  'DIAGNÓSTICO',
  'EL AUTISMO',
  'NEVER',
  'DIAGNOSED',
  'TO ONLY ONE',
  'GENERALIZED',
  'DIAGNOSIS',
  'AUTISM',
];

const getAutismOnlyPrimaryLines = () => [
  'EL AUTISMO',
  'AUTISM',
  'EN LO ÚNICO',
  'LO ÚNICO',
  'ONLY THING',
  'QUE SE VE',
  'SEEN',
  'TODO LO DEMÁS',
  'EVERYTHING ELSE',
  'ES IGNORADO',
  'IS IGNORED',
];

const getAutismOnlyHeroLines = () => [
  'EL AUTISMO',
  'AUTISM',
  'EN LO ÚNICO',
  'LO ÚNICO',
  'ONLY THING',
  'QUE SE VE',
  'SEEN',
  'TODO LO DEMÁS',
  'EVERYTHING ELSE',
  'ES IGNORADO',
  'IS IGNORED',
];

const normalizeWord = (word: string) =>
  word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""'“”‘’]/g, '').toUpperCase();

const BeatItem: React.FC<{ 
  beat: any; 
  index: number; 
  screenId: number;
  start: number; 
  end: number; 
  stay: boolean; 
  yOffset: number;
  xOffset?: number | string;
  progress: any 
}> = ({ beat, index, screenId, start, end, stay, yOffset, xOffset = 0, progress }) => {
  const isCard = beat.isCard;
  const isDenseBeat = screenId === 10 || screenId === 11 || screenId === 12;
  const isFinalHashtag = screenId === 17 && index === 0;
  const isFinalMainCopy = screenId === 17 && index === 1;
  
  // Custom timing logic for Screen 13 (Symptoms) to ensure holds and bounce
  const holdRatio = 0.6; // Hold for 60% of the duration
  const transitionRatio = 0.2; // Use 20% for in and 20% for out
  
  const actualStart = start;
  const actualHoldStart = start + (end - start) * transitionRatio;
  const actualHoldEnd = end - (end - start) * transitionRatio;
  const actualEnd = end;

  // Opacity: fade in at start, fade out at end (stay group holds until 0.9)
  const opacityEnd = stay ? (screenId === 16 ? 0.82 : screenId === 17 ? 0.995 : 0.98) : end;
  const opacity = useTransform(
    progress, 
    stay ? [start, start + (screenId === 17 ? 0.1 : 0.06), opacityEnd - (screenId === 17 ? 0.025 : 0.08), opacityEnd] : [actualStart, actualHoldStart, actualHoldEnd, actualEnd], 
    [0, 1, 1, 0],
    { ease: easeInOut }
  );
  
  // Entry animation with "overshoot" effect for bounce
  const entryDistance = screenId === 17 ? 18 : 40;
  const entryY = useTransform(
    progress, 
    stay ? [start, start + (screenId === 17 ? 0.1 : 0.06)] : [actualStart, actualHoldStart - (end - start) * 0.05, actualHoldStart], 
    stay ? [entryDistance, 0] : [40, -4, 0],
    { ease: easeInOut }
  );
  
  // Shared Exit behavior for the group (drift up together at the very end)
  const groupExitY = useTransform(progress, screenId === 17 ? [0.975, 0.995] : [0.92, 0.98], screenId === 17 ? [0, -10] : [0, -40], { ease: easeInOut });
  // Individual exit for non-staying beats
  const singleExitY = useTransform(
    progress, 
    stay ? [0.92, 0.98] : [actualHoldEnd, actualEnd], 
    [0, -40]
  );

  const y = useTransform(progress, (p) => {
    const ey = entryY.get();
    const gey = groupExitY.get();
    const sey = singleExitY.get();
    return ey + (stay ? gey : sey) + yOffset;
  });

  const x = useTransform(progress, [start, end], [xOffset, xOffset]);

  const scale = useTransform(
    progress,
    [start, start + (screenId === 17 ? 0.1 : 0.08), opacityEnd - (screenId === 17 ? 0.025 : 0.08), opacityEnd],
    screenId === 17 ? [0.995, 1, 1, 1] : [isCard ? 0.95 : 0.98, 1, 1, 1.02],
    { ease: easeInOut }
  );

  return (
    <motion.div 
      style={{ 
        opacity, 
        scale,
        y,
        x,
        display: useTransform(progress, (p: number) => (p >= start - 0.02 && (stay ? p < (screenId === 16 ? 0.86 : screenId === 17 ? 0.995 : 0.99) : p < end + 0.02) ? 'flex' : 'none')) 
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center text-center sticky-safe ${isCard ? 'z-20' : 'z-10'}`}
    >
      <div className={`
        flex flex-col items-center gap-[clamp(0.22rem,1vw,0.9rem)] beat-block relative
        ${isDenseBeat ? 'beat-block-dense' : ''}
        ${isFinalMainCopy ? 'beat-block-final' : ''}
        ${isFinalHashtag ? 'final-hashtag-wrap' : ''}
        ${isCard ? 'bg-white/5 backdrop-blur-2xl border border-white/10 p-[clamp(1.5rem,6vw,5rem)] shadow-sm rounded-none' : ''}
      `}>
        {beat.text.split('\n').map((line: string, li: number) => {
          const lineWords = line.trim().split(/\s+/).filter(w => w !== '');
          return (
            <div key={li} className={`flex flex-wrap justify-center gap-y-[0.1em] ${isFinalMainCopy ? 'final-main-line' : ''} ${screenId === 14 || screenId === 15 || screenId === 16 || screenId === 17 ? 'gap-x-[0.25em] md:gap-x-[0.55em]' : 'gap-x-[0.18em] md:gap-x-[0.3em]'} ${screenId === 14 || screenId === 16 ? 'large-display-flex' : ''}`}>
              {lineWords.map((word: string, wi: number) => {
                const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""'“”‘’]/g,"").toUpperCase();
                const highlightWords = beat.highlight ? beat.highlight.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""'“”‘’]/g,"").toUpperCase().split(/\s+/) : [];
                const isHighlighted = highlightWords.includes(cleanWord);
                
                // Pacing: reveal words over ~40% of the beat's duration
                const allWords = beat.text.trim().split(/\s+/).filter((w: string) => w !== '');
                const wordCount = allWords.length;
                const textUpToLine = beat.text.split('\n').slice(0, li).join(' ');
                const wordsBeforeThisLine = textUpToLine.trim() === '' ? 0 : textUpToLine.trim().split(/\s+/).length;
                const globalWordIndex = wordsBeforeThisLine + wi;

                const duration = (stay ? 0.9 : end) - start;
                // Faster reveal for card and screen 13 header, slower for others to be readable
                // For screen 18 index 0 (NO SE LE), we want them to appear at once (revealRatio 0)
                const revealRatio = (screenId === 18 && index === 0) ? 0 : (isCard || (screenId === 13 && index === 0) ? 0.2 : (screenId === 14 || screenId === 15 || screenId === 16 || screenId === 17 || screenId === 18 ? 0.8 : (stay ? 0.4 : 0.6)));
                const wordStart = start + 0.03 + (globalWordIndex / (wordCount || 1)) * duration * revealRatio;
                const wordEnd = wordStart + 0.05;

                const isExtraLarge = (cleanWord === 'ÚNICO' || cleanWord === 'ONLY' || cleanWord === 'IGNORADO' || cleanWord === 'IGNORED' || (cleanWord === 'AUTISMO' && !isCard) || (cleanWord === 'AUTISM' && !isCard) || cleanWord === 'DIAGNOSTICADAS' || cleanWord === 'DIAGNOSED' || screenId === 14 || screenId === 15 || screenId === 16 || (screenId === 17 && index === 0) || (screenId === 18 && index >= 1));
                const isSi = cleanWord === 'SÍ' || cleanWord === 'YES' || cleanWord === 'ARE' || cleanWord === 'DESCARTA' || cleanWord === 'DISMISSED';
                const isDiagnosticadas = cleanWord === 'MUJERES' || cleanWord === 'WOMEN' || cleanWord === 'AUTISTAS' || cleanWord === 'AUTISTIC';
                
                const isSymptom = screenId === 13 && index >= 1 && index <= 4;

                // Screen 17 Subtext (Index 1)
                const isSubtext = screenId === 17 && index === 1;

                // Screen 18 Replacement logic
                const isReplacementHeader = screenId === 18 && index === 0;
                const isReplacementWord = screenId === 18 && (index >= 1 && index <= 3);

                // Dominant words for the final card
                const isCardDominant = isCard && (cleanWord === 'SOLO' || cleanWord === 'JUST' || cleanWord === 'AUTISMO' || cleanWord === 'AUTISM');
                const isCardSecondary = isCard && (cleanWord === 'ES' || cleanWord === 'ITS' || cleanWord === 'IT’S' || cleanWord === 'SU' || cleanWord === 'HER');

                return (
                  <BeatWord 
                    key={wi}
                    word={word}
                    wordStart={wordStart}
                    wordEnd={wordEnd}
                    isHighlighted={isHighlighted}
                    isCardDominant={isCardDominant}
                    isCardSecondary={isCardSecondary}
                    isSymptom={isSymptom}
                    isSubtext={isSubtext}
                    isReplacementHeader={isReplacementHeader}
                    isReplacementWord={isReplacementWord}
                    isExtraLarge={isExtraLarge}
                    isSi={isSi}
                    isDiagnosticadas={isDiagnosticadas}
                    screenId={screenId}
                    index={index}
                    progress={progress}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const BeatWord: React.FC<{
  word: string;
  wordStart: number;
  wordEnd: number;
  isHighlighted: boolean;
  isCardDominant: boolean;
  isCardSecondary: boolean;
  isSymptom: boolean;
  isSubtext: boolean;
  isReplacementHeader: boolean;
  isReplacementWord: boolean;
  isExtraLarge: boolean;
  isSi: boolean;
  isDiagnosticadas: boolean;
  screenId: number;
  index: number;
  progress: any;
}> = ({ 
  word, wordStart, wordEnd, isHighlighted, 
  isCardDominant, isCardSecondary, isSymptom, isSubtext, 
  isReplacementHeader, isReplacementWord, isExtraLarge, 
  isSi, isDiagnosticadas, screenId, index, progress 
}) => {
  const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
  const y = useTransform(progress, [wordStart, wordEnd], [8, 0]);
  const scale = useTransform(progress, [wordStart, wordEnd], [isHighlighted ? 1.1 : 1, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`
        ${isFinalHashtagWord(screenId, index)
          ? 'final-hashtag-word'
          : isFinalMainWord(screenId, index)
            ? 'final-main-word'
          : isDenseNarrativeWord(screenId)
            ? denseNarrativeClass(isHighlighted, isExtraLarge, isSi, isDiagnosticadas)
          : isCardDominant
          ? 'text-[clamp(3rem,15vw,11.25rem)] font-black text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.5)]'
          : isCardSecondary
            ? 'text-[clamp(1.25rem,4vw,2.75rem)] font-bold text-white/50'
            : isSymptom
              ? 'text-[clamp(1.35rem,7vw,6.25rem)] font-black text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]'
              : isSubtext
                ? 'text-[clamp(1rem,3.4vw,2.65rem)] font-bold text-white/80'
                : isReplacementHeader
                  ? 'text-[clamp(1.25rem,4vw,3.4rem)] font-bold text-white'
                  : isReplacementWord
                    ? 'text-[clamp(2rem,8vw,6.25rem)] font-black text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.7)]'
                    : isExtraLarge
                  ? (screenId === 16
                      ? 'screen-16-word font-black text-white'
                      : screenId === 14 || screenId === 15 || screenId === 17
                      ? 'text-[clamp(2.35rem,12vw,12.5rem)] font-black text-white' 
                      : 'text-[clamp(2.75rem,12vw,10rem)] font-black text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.5)]')
                : isSi
                  ? 'text-[clamp(2.55rem,10vw,8.75rem)] font-black text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                  : isDiagnosticadas
                    ? 'text-[clamp(1.65rem,5vw,3rem)] font-black text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                    : isHighlighted 
                        ? 'text-[clamp(2.3rem,9vw,7.5rem)] font-black text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]' 
                        : 'text-[clamp(1.35rem,5.5vw,4.4rem)] font-black text-white/95'
        } 
        leading-[1.14] md:leading-[1.08] uppercase tracking-normal ${isExtraLarge || isSi || isHighlighted ? 'large-display-text' : ''}
      `}
    >
      {word}
    </motion.span>
  );
};

const isDenseNarrativeWord = (screenId: number) => screenId === 10 || screenId === 11 || screenId === 12;
const isFinalHashtagWord = (screenId: number, index: number) => screenId === 17 && index === 0;
const isFinalMainWord = (screenId: number, index: number) => screenId === 17 && index === 1;

const denseNarrativeClass = (
  isHighlighted: boolean,
  isExtraLarge: boolean,
  isSi: boolean,
  isDiagnosticadas: boolean
) => {
  if (isExtraLarge || isSi) {
    return 'text-[clamp(2rem,7.6vw,6.2rem)] font-black text-white drop-shadow-[0_0_44px_rgba(255,255,255,0.32)]';
  }

  if (isHighlighted) {
    return 'text-[clamp(1.85rem,6.8vw,5.2rem)] font-black text-white drop-shadow-[0_0_36px_rgba(255,255,255,0.28)]';
  }

  if (isDiagnosticadas) {
    return 'text-[clamp(1.35rem,4.8vw,3.2rem)] font-black text-white';
  }

  return 'text-[clamp(1.2rem,4.4vw,3.45rem)] font-black text-white/95';
};

const ComparisonSection: React.FC<{ screen: any; graphic?: any }> = ({ screen, graphic }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const revealLines = [
    { text: screen.top, kind: 'support', range: [0.0, 0.16] as [number, number] },
    ...screen.middle.split('\n').map((line: string, index: number) => ({
      text: line,
      kind: 'number',
      range: [0.12 + index * 0.14, 0.32 + index * 0.14] as [number, number],
    })),
    ...screen.bottom.split('\n').map((line: string, index: number) => ({
      text: line,
      kind: 'support',
      range: [0.46 + index * 0.1, 0.64 + index * 0.1] as [number, number],
    })),
  ];

  return (
    <section ref={containerRef} className="relative h-[225vh]">
      <div className="sticky top-0 h-dvh w-full flex flex-col items-center justify-center sticky-safe">
        {/* Background Graphic */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
          {graphic && <SectionGraphic type={graphic} progress={scrollYProgress} />}
        </div>

        <div className="max-w-5xl w-full flex flex-col items-center text-center gap-[clamp(0.22rem,1vh,0.85rem)] relative z-10">
          {revealLines.map((line, index) => (
            <ComparisonRevealLine
              key={`${line.text}-${index}`}
              text={line.text}
              kind={line.kind}
              range={line.range}
              progress={scrollYProgress}
            />
          ))}
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const ComparisonRevealLine: React.FC<{
  text: string;
  kind: string;
  range: [number, number];
  progress: any;
}> = ({ text, kind, range, progress }) => {
  const [start, end] = range;
  const rawOpacity = useTransform(progress, [start, end], [0, 1], { ease: easeInOut });
  const rawY = useTransform(progress, [start, end], [55, 0], { ease: easeInOut });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.4 });

  const words = text.split(/\s+/).filter(Boolean);
  const lineClass =
    kind === 'number'
      ? 'text-[clamp(4rem,14vw,13rem)] leading-[0.86] my-[clamp(0.08rem,0.6vh,0.5rem)]'
      : kind === 'setup'
        ? 'text-[clamp(1.15rem,3vw,2.55rem)] leading-[1.06]'
        : 'text-[clamp(1.75rem,5.2vw,4.2rem)] leading-[1.06]';

  return (
    <motion.div
      style={{ opacity, y }}
      className={`flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.08em] font-black uppercase tracking-normal text-[#fff] ${lineClass}`}
    >
      {words.map((word: string, index: number) => (
        <span
          key={`${word}-${index}`}
          className={kind === 'support' && isComparisonKeyWord(word)
            ? 'inline-block text-[1.18em] text-[#fff]'
            : 'inline-block text-[#fff]'}
        >
          {word}
        </span>
      ))}
    </motion.div>
  );
};

const isComparisonKeyWord = (word: string) => {
  const clean = normalizeWord(word);
  return ['AUTISMO', 'AUTISM', 'DIAGNOSTICADA', 'DIAGNOSED', 'EVALUACIÓN', 'EVALUATION', 'REFERRED'].includes(clean);
};

const TextLine: React.FC<{ 
  line: string; 
  index: number; 
  totalLines: number; 
  progress?: any;
  forceWhite?: boolean;
}> = ({ line, index, totalLines, progress, forceWhite }) => {
  const defaultProgress = useMotionValue(0);
  const activeProgress = progress || defaultProgress;

  // Determine position for progressive reveal
  const startPos = index / totalLines;
  
  // Use hooks at the top level of this component
  const opacity = useTransform(
    activeProgress, 
    [startPos * 0.2 + 0.1, startPos * 0.2 + 0.3], 
    [progress ? 0 : 1, 1]
  );
  
  const y = useTransform(
    activeProgress, 
    [startPos * 0.2 + 0.1, startPos * 0.2 + 0.3], 
    [progress ? 20 : 0, 0]
  );

  if (line.trim() === '') {
    return <div className="h-2 md:h-4" aria-hidden="true" />;
  }

  const style: any = progress ? { opacity, y } : {};
  if (forceWhite) {
    style.color = '#FFFFFF';
    style.opacity = 1;
  }

  if (line.startsWith('###')) {
    const part = line.replace('###', '').replace(/_/g, ' ');
    return (
      <motion.span 
        style={style}
        className={`block display-md large-display-text font-[900] my-2 break-words max-w-full uppercase ${forceWhite ? 'text-white !opacity-100' : ''}`}
      >
        {part}
      </motion.span>
    );
  }

  if (line.startsWith('##')) {
    const part = line.replace('##', '').replace(/_/g, ' ');
    return (
      <motion.span 
        style={style}
        className={`block display-xl large-display-text font-black my-4 break-words max-w-full ${forceWhite ? 'text-white !opacity-100' : ''}`}
      >
        {part}
      </motion.span>
    );
  }

  if (line.startsWith('#')) {
    const part = line.replace('#', '').replace(/_/g, ' ');
    return (
      <motion.span 
        style={style}
        className={`block display-lg large-display-text font-[900] my-4 break-words max-w-full uppercase ${forceWhite ? 'text-white !opacity-100' : ''}`}
      >
        {part}
      </motion.span>
    );
  }

  if (line.startsWith('*')) {
    const part = line.replace('*', '');
    return (
      <motion.span 
        style={style}
        className={`block text-[clamp(0.8rem,1.7vw,1.125rem)] font-extralight opacity-50 mt-10 tracking-[0.25em] uppercase ${forceWhite ? 'text-white !opacity-100' : ''}`}
      >
        {part}
      </motion.span>
    );
  }

  return (
    <motion.span 
      style={style}
      className={`block display-sm font-medium opacity-80 uppercase tracking-normal my-1 ${forceWhite ? 'text-white !opacity-100' : ''}`}
    >
      {line}
    </motion.span>
  );
};

const renderText = (text: string, progress?: any, forceWhite?: boolean) => {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <TextLine 
      key={`${line}-${i}`} 
      line={line} 
      index={i} 
      totalLines={lines.length} 
      progress={progress} 
      forceWhite={forceWhite}
    />
  ));
};

const WordReveal: React.FC<{ text: string; progress: any }> = ({ text, progress }) => {
  const lines = text.split('\n');
  const totalLines = lines.filter((line) => line.trim()).length;
  let visibleLineIndex = 0;
  
  return (
    <div className="word-reveal-stack">
      {lines.map((line, lineIndex) => {
        if (!line.trim()) {
          return <div key={`space-${lineIndex}`} className="word-reveal-break" aria-hidden="true" />;
        }

        const words = line.split(/\s+/).filter(Boolean);
        const currentLineIndex = visibleLineIndex;
        visibleLineIndex += 1;

        return (
          <WordRevealLine
            key={`${line}-${lineIndex}`}
            index={currentLineIndex}
            total={totalLines}
            progress={progress}
          >
            {words.map((word, wordIndex) => (
              <span
                key={`${word}-${lineIndex}-${wordIndex}`}
                className="word-reveal-word"
              >
                {word}
                <span className="word-reveal-space" aria-hidden="true">{" "}</span>
              </span>
            ))}
          </WordRevealLine>
        );
      })}
    </div>
  );
};

const WordRevealLine: React.FC<{
  children: React.ReactNode;
  index: number; 
  total: number; 
  progress: any 
}> = ({ children, index, total, progress }) => {
  const start = 0.015 + (index / Math.max(total, 1)) * 0.13;
  const end = start + 0.1;
  
  const opacity = useTransform(progress, [start, end], [0, 1], { ease: easeInOut });
  const y = useTransform(progress, [start, end], [40, 0], { ease: easeInOut });

  return (
    <motion.div
      style={{ opacity, y }}
      className="word-reveal-line"
    >
      {children}
    </motion.div>
  );
};

const PulsingHeroSection: React.FC<{ screen: any }> = ({ screen }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const lines = screen.text.split('\n');

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-dvh w-full flex items-center justify-center sticky-safe overflow-hidden">
        <div className={`pulse-hero-stack pulse-hero-stack-${screen.id}`}>
          {lines.map((line: string, index: number) => (
            <PulsingHeroLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              total={lines.length}
              screenId={screen.id}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PulsingHeroLine: React.FC<{
  line: string;
  index: number;
  total: number;
  screenId: number;
  progress: any;
}> = ({ line, index, total, screenId, progress }) => {
  const segment = 0.72 / Math.max(total, 1);
  const start = 0.12 + index * segment;
  const peak = start + segment * 0.5;
  const end = start + segment;
  const scale = useTransform(progress, [start, peak, end], [1, 1.16, 1], { ease: easeInOut });
  const cleanLine = normalizeWord(line);
  const isNumber = index === 0;
  const isHero =
    cleanLine === 'MUJERES' ||
    cleanLine === 'AUTISTAS' ||
    cleanLine === 'WOMEN' ||
    cleanLine === 'AUTISTIC';
  const isLarge =
    cleanLine === 'DIAGNÓSTICO' ||
    cleanLine === 'ERRÓNEO' ||
    cleanLine === 'MISDIAGNOSIS' ||
    cleanLine === 'UNDIAGNOSED';

  return (
    <motion.div
      style={{ scale }}
      className={`pulse-hero-line ${
        isNumber ? 'pulse-hero-line-number' : isHero ? 'pulse-hero-line-hero' : isLarge ? 'pulse-hero-line-large' : 'pulse-hero-line-small'
      } ${screenId === 4 ? 'pulse-hero-line-screen-4' : ''}`}
    >
      {line}
    </motion.div>
  );
};

const EightyPercentSection: React.FC<{ screen: any }> = ({ screen }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lines = screen.text.split('\n').map((line: string) => line.replace(/^#+/, ''));
  const stackY = useTransform(scrollYProgress, [0, 0.2], [70, 0], { ease: easeInOut });

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-dvh w-full flex items-center justify-center sticky-safe overflow-visible">
        <motion.div
          style={{ y: stackY, opacity: 1 }}
          className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center uppercase tracking-normal text-[#fff]"
        >
          {lines.map((line: string, index: number) => (
            <EightyPercentLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const EightyPercentLine: React.FC<{
  line: string;
  index: number;
  progress: any;
}> = ({ line, index, progress }) => {
  const isNumber = index === 0;
  const normalized = normalizeWord(line);
  const isAutistas = normalized === 'AUTISTAS' || normalized === 'WOMEN';
  const isUndiagnosed = normalized === 'SIN DIAGNOSTICAR' || normalized === 'DIAGNOSED';

  const numberPulse = useTransform(progress, [0.24, 0.36, 0.48], [1, 1.18, 1], { ease: easeInOut });
  const autistasPulse = useTransform(progress, [0.44, 0.56, 0.68], [1, 1.32, 1], { ease: easeInOut });
  const undiagnosedPulse = useTransform(progress, [0.62, 0.74, 0.86], [1, 1.28, 1], { ease: easeInOut });
  const scale = isNumber ? numberPulse : isAutistas ? autistasPulse : isUndiagnosed ? undiagnosedPulse : 1;

  const className = isNumber
    ? 'text-[clamp(5.6rem,20vw,17rem)] leading-[0.78] font-black'
    : isAutistas || isUndiagnosed
      ? 'text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.96] font-black my-[clamp(0.2rem,0.7vh,0.55rem)]'
      : 'text-[clamp(1.45rem,4.6vw,3.6rem)] leading-[1.05] font-black my-[clamp(0.08rem,0.35vh,0.35rem)]';

  return (
    <motion.div style={{ scale, opacity: 1 }} className={`${className} text-[#fff]`}>
      {line}
    </motion.div>
  );
};

const ScreenThreeSection: React.FC<{ screen: any }> = ({ screen }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const lines = screen.text.split('\n');
  const totalWords = screen.text.split(/\s+/).filter(Boolean).length;
  let wordOffset = 0;

  return (
    <section
      ref={ref}
      className="relative h-[240vh]"
    >
      <div className="sticky top-0 flex h-[100vh] w-full items-center justify-center overflow-hidden px-[clamp(18px,5vw,64px)]">
        <div className="relative z-10 mx-auto w-full max-w-[min(90vw,1100px)] text-center uppercase tracking-normal">
          <div className="word-reveal-stack">
            {lines.map((line: string, index: number) => {
              const words = line.split(/\s+/).filter(Boolean);
              const startIndex = wordOffset;
              wordOffset += words.length;

              return (
                <ScreenThreeLine
                  key={`${line}-${index}`}
                  words={words}
                  startIndex={startIndex}
                  totalWords={totalWords}
                  progress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const ScreenThreeLine: React.FC<{
  words: string[];
  startIndex: number;
  totalWords: number;
  progress: any;
}> = ({ words, startIndex, totalWords, progress }) => {
  return (
    <div className="word-reveal-line">
      {words.map((word, wordIndex) => (
        <ScreenThreeWord
          key={`${word}-${wordIndex}`}
          word={word}
          index={startIndex + wordIndex}
          total={totalWords}
          progress={progress}
        />
      ))}
    </div>
  );
};

const ScreenThreeWord: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: any;
}> = ({ word, index, total, progress }) => {
  const revealStart = 0.08;
  const revealEnd = 0.58;
  const revealDuration = revealEnd - revealStart;
  const wordStart = revealStart + (index / Math.max(total, 1)) * (revealDuration * 0.72);
  const wordEnd = wordStart + revealDuration * 0.26;
  const opacity = useTransform(progress, (latest: number) => {
    if (latest <= wordStart) return 0;
    if (latest >= wordEnd) return 1;
    return easeOutSoft((latest - wordStart) / (wordEnd - wordStart));
  });
  const y = useTransform(progress, (latest: number) => {
    if (latest <= wordStart) return 16;
    if (latest >= wordEnd) return 0;
    return 16 * (1 - easeOutSoft((latest - wordStart) / (wordEnd - wordStart)));
  });

  return (
    <motion.span
      style={{ opacity, y }}
      className="word-reveal-word"
    >
      {word}
      <span className="word-reveal-space" aria-hidden="true">{" "}</span>
    </motion.span>
  );
};

// Standard sequential text reveal section
const SimpleSection: React.FC<{ screen: any; graphic?: any; isLast: boolean }> = ({ screen, graphic, isLast }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.7, 0.9],
    [1, 0],
    { ease: easeInOut }
  );
  const scale = useTransform(
    scrollYProgress,
    [0.7, 0.9],
    [1, 0.98],
    { ease: easeInOut }
  );

  return (
    <section
      ref={ref}
      className="min-h-dvh flex items-center justify-center sticky-safe relative overflow-hidden"
    >
      <div className="contents">
        {graphic && <SectionGraphic type={graphic} />}
        
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl text-center w-full relative z-10"
        >
          <div className="uppercase tracking-normal whitespace-pre-line">
            {renderText(screen.text || "", scrollYProgress)}
          </div>
          
          {screen.cta && (
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]),
                y: useTransform(scrollYProgress, [0.6, 0.7], [20, 0])
              }}
            >
              <a 
                href="https://www.nuevohorizonte.es/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-12 border-2 border-white px-10 py-5 text-xl font-black hover:bg-white hover:text-primary transition-all uppercase"
              >
                {screen.cta}
              </a>
            </motion.div>
          )}
        </motion.div>
        <ScrollHintArrow />
      </div>
    </section>
  );
}

// Section with pinned headline and swapping or accumulating content
const StickyScrollSection: React.FC<{ screen: any; isLast: boolean }> = ({ screen, isLast }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const graphicType = [2].includes(screen.id) ? 'medical' : undefined;

  // Header interaction opacity
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const headerAvoidanceOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 1]);
  
  const wordIndex = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [0, (screen.scrolls?.length || 1) - 1]
  );

  const footerOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.8, 0.9], [20, 0]);

  if (screen.mode === 'karaoke' || screen.mode === 'karaoke_moments') {
    const isMoments = screen.mode === 'karaoke_moments';
    
    if (isMoments) {
      return (
        <section ref={containerRef} className="relative h-[360vh]">
          <div className="sticky top-0 h-dvh w-full flex items-center justify-center overflow-visible sticky-safe">
            {/* Chart Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {graphicType && <SectionGraphic type={graphicType} progress={scrollYProgress} medicalLabels={screen.scrolls.join(' ').toLowerCase().includes('medical research') ? { clear: 'MEN', obscured: 'WOMEN' } : { clear: 'HOMBRE', obscured: 'MUJERES' }} />}
            </div>
            
            {/* Header Layer (z-50) */}
            {screen.sticky && (
              <div className="absolute top-[max(72px,9vh)] md:top-[12vh] w-full text-center z-50 px-4">
                <motion.h2 
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 0.6]) }}
                  className="text-[clamp(0.75rem,1.5vw,1rem)] font-bold uppercase tracking-[0.32em] opacity-60"
                >
                  {screen.sticky}
                </motion.h2>
              </div>
            )}
            
            {/* Animated Text Blocks */}
            <MedicalParagraphReveal text={screen.scrolls.join('\n')} progress={scrollYProgress} />
            <ScrollHintArrow />
          </div>
        </section>
      );
    }

    return (
      <section ref={containerRef} className="relative h-[450vh]">
        <div className="sticky top-0 h-dvh w-full flex flex-col items-center justify-center sticky-safe overflow-hidden">
          {graphicType && (
            <SectionGraphic type={graphicType} progress={scrollYProgress} />
          )}
          
          <div className="max-w-6xl w-full text-center relative z-10 flex flex-col items-center">
            {screen.sticky && (
              <motion.h2 
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 0.6]) }}
                className="text-[clamp(0.75rem,1.5vw,1rem)] font-bold uppercase mb-10 md:mb-16 tracking-[0.32em] opacity-60"
              >
                {screen.sticky}
              </motion.h2>
            )}

            <motion.div 
              style={{ opacity: contentOpacity }}
              className="px-4"
            >
              <KaraokeSentence text={screen.text} progress={scrollYProgress} />
            </motion.div>
          </div>
          <ScrollHintArrow />
        </div>
      </section>
    );
  }
  if (screen.accumulate) {
    if (screen.id === 9) {
      return <ViolenceSection screen={screen} containerRef={containerRef} progress={scrollYProgress} />;
    }

    return (
      <section ref={containerRef} className="relative h-[650vh]">
        <div className="sticky top-0 h-dvh w-full flex flex-col items-center justify-center sticky-safe overflow-hidden">
          <div className="max-w-5xl w-full text-center">
            <div className="flex flex-col items-center justify-center gap-[clamp(0.1rem,0.8vh,0.55rem)]">
              {[...screen.sticky.split('\n'), ...screen.scrolls].map((line: string, i: number, allLines: string[]) => (
                <AccumulateLine
                  key={`${line}-${i}`}
                  line={line}
                  index={i}
                  total={allLines.length}
                  progress={scrollYProgress}
                  isViolence={screen.id === 9}
                />
              ))}
            </div>
          </div>
          <ScrollHintArrow />
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-dvh w-full flex flex-col items-center justify-center sticky-safe overflow-hidden">
        {graphicType && <SectionGraphic type={graphicType} progress={scrollYProgress} />}
        
        <div className="max-w-4xl w-full text-center relative z-10">
          <motion.h2 
            className="text-[clamp(1rem,3vw,2.2rem)] font-bold uppercase mb-8 tracking-[0.24em] opacity-80"
          >
            {screen.sticky}
          </motion.h2>
          
          <div className="h-[min(46vh,430px)] flex items-center justify-center relative">
            {screen.scrolls?.map((word: string, i: number) => (
              <WordItem 
                key={i} 
                word={word} 
                index={i} 
                currentIndex={wordIndex} 
                mode={screen.mode}
              />
            ))}
          </div>

          {screen.footer && (
            <motion.div 
              className="mt-10 md:mt-16 text-[clamp(1.5rem,6vw,3.5rem)] font-black uppercase text-center leading-[1.08] tracking-normal"
              style={{ 
                opacity: footerOpacity,
                y: footerY
              }}
            >
              {renderText(screen.footer)}
            </motion.div>
          )}
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
}

const ViolenceSection: React.FC<{
  screen: any;
  containerRef: React.RefObject<HTMLElement | null>;
  progress: any;
}> = ({ screen, containerRef, progress }) => {
  const lines = [...screen.sticky.split('\n'), ...screen.scrolls];
  const [sectionProgress, setSectionProgress] = useState(0);

  useMotionValueEvent(progress, 'change', (latest: number) => {
    setSectionProgress(latest);
  });

  return (
    <section ref={containerRef} className="relative h-[390vh]">
      <div className="sticky top-0 h-dvh w-full flex items-center justify-center sticky-safe overflow-hidden">
        <div className="violence-stage violence-stage-readable text-center font-black uppercase">
          {lines.map((line: string, index: number) => (
            <ViolenceStackLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              total={lines.length}
              sectionProgress={sectionProgress}
            />
          ))}
        </div>
        <ScrollHintArrow />
      </div>
    </section>
  );
};

const ViolenceStackLine: React.FC<{
  line: string;
  index: number;
  total: number;
  sectionProgress: number;
}> = ({ line, index, total, sectionProgress }) => {
  const start = 0.08 + index * 0.085;
  const end = start + 0.16;
  const revealProgress = Math.min(Math.max((sectionProgress - start) / (end - start), 0), 1);
  const easedProgress = easeInOut(revealProgress);
  const exitProgress = Math.min(Math.max((sectionProgress - 0.9) / 0.08, 0), 1);
  const y = 40 * (1 - easedProgress) - 28 * easeInOut(exitProgress);
  const opacity = easedProgress * (1 - easeInOut(exitProgress));
  const lineClass = index === 0 ? 'violence-line-small' : 'violence-line-main';
  const slotClass = index === 0 ? 'violence-slot-small' : 'violence-slot-main';

  return (
    <span className={`violence-slot ${slotClass}`}>
      <span
        className={`violence-line ${lineClass}`}
        style={{ opacity, transform: `translateY(${y}px)` }}
      >
        {line}
      </span>
    </span>
  );
};

const smoothStep = (t: number) => t * t * (3 - 2 * t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutSoft = (t: number) => 1 - Math.pow(1 - t, 4);

const AccumulateLine: React.FC<{
  line: string;
  index: number;
  total: number;
  progress: any;
  isViolence?: boolean;
}> = ({ line, index, total, progress, isViolence }) => {
  const start = 0.06 + (index / total) * 0.66;
  const end = start + 0.12;
  
  const opacity = useTransform(progress, [start, end, 0.9, 0.98], [0, 1, 1, 0]);
  const y = useTransform(
    progress, 
    [start, end, 0.9, 0.98], 
    [32, 0, 0, -22],
    { ease: (t: number) => t * t * (3 - 2 * t) }
  );

  const cleanLine = line.replace(/^#+/, '').replace(/_/g, ' ');

  return (
    <motion.div 
      style={{ opacity, y }}
      className="w-full flex justify-center"
    >
      {isViolence ? (
        <span className="violence-copy font-black uppercase text-white break-words max-w-full">
          {cleanLine}
        </span>
      ) : (
        renderText(line, undefined, true)
      )}
    </motion.div>
  );
};

const KaraokeSentence: React.FC<{ text: string; progress: any; scrollRange?: [number, number] }> = ({ text, progress, scrollRange = [0.1, 0.85] }) => {
  // Split by space but preserve newlines
  const words = text
    .split(/(\s+)/).filter(w => w.trim().length > 0 || w.includes('\n'));
  
  return (
    <div className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-[clamp(0.6rem,2vw,2rem)] max-w-4xl mx-auto">
      {words.map((word, i) => (
        <KaraokeWord 
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={progress}
          scrollRange={scrollRange}
        />
      ))}
    </div>
  );
};

const KaraokeWord: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: any;
  scrollRange: [number, number];
}> = ({ word, index, total, progress, scrollRange }) => {
  const [rStart, rEnd] = scrollRange;
  const rangeWidth = rEnd - rStart;
  
  // Reveal words across a larger portion of the range for a more deliberate feel
  const revealDuration = rangeWidth * 0.8;
  const wordStart = rStart + (index / total) * revealDuration;
  const wordEnd = wordStart + (revealDuration / total) * 2;
  
  const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
  const y = useTransform(progress, [wordStart, wordEnd], [20, 0]);
  const color = useTransform(progress, [wordStart, wordEnd], ["#FFFFFF", "#FFFFFF"]);
  
  const isNewLine = word.includes('\n');
  const cleanWord = word.replace('\n', ' ').trim();

  if (isNewLine && cleanWord === '') return <div className="w-full h-0" />;

  return (
    <React.Fragment>
      <motion.span
        style={{ opacity, y, color }}
        className="text-[clamp(1.85rem,7vw,5rem)] font-black uppercase leading-[1.05] md:leading-[0.95] tracking-[0.08em] whitespace-nowrap drop-shadow-2xl"
      >
        {cleanWord}
      </motion.span>
      {isNewLine && <div className="w-full h-0" />}
    </React.Fragment>
  );
};

const MedicalParagraphReveal: React.FC<{ text: string; progress: any }> = ({ text, progress }) => {
  const lines = text.split('\n');
  const totalWords = lines.reduce((count, line) => count + line.split(/\s+/).filter(Boolean).length, 0);
  let wordOffset = 0;

  return (
    <div
      className="medical-paragraph-reveal absolute inset-x-0 top-0 z-20 flex h-full items-center justify-center px-5 pointer-events-none"
    >
      <div className="medical-paragraph-copy">
        {lines.map((line, lineIndex) => {
          const words = line.split(/\s+/).filter(Boolean);
          const startIndex = wordOffset;
          wordOffset += words.length;

          return (
            <div key={`${line}-${lineIndex}`} className="medical-paragraph-line">
              {words.map((word, wordIndex) => (
                <MedicalParagraphWord
                  key={`${word}-${lineIndex}-${wordIndex}`}
                  word={word}
                  index={startIndex + wordIndex}
                  total={totalWords}
                  progress={progress}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MedicalParagraphWord: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: any;
}> = ({ word, index, total, progress }) => {
  const start = 0.08 + (index / Math.max(total, 1)) * 0.58;
  const end = start + 0.08;
  const opacity = useTransform(progress, (latest: number) => {
    if (latest <= start) return 0;
    if (latest >= end) return 1;
    return easeInOut((latest - start) / (end - start));
  });
  const y = useTransform(progress, (latest: number) => {
    if (latest <= start) return 22;
    if (latest >= end) return 0;
    return 22 * (1 - easeInOut((latest - start) / (end - start)));
  });

  return (
    <motion.span style={{ opacity, y }} className="medical-paragraph-word">
      {word}
      <span className="medical-paragraph-space" aria-hidden="true">{" "}</span>
    </motion.span>
  );
};

const WordItem: React.FC<{ word: string; index: number; currentIndex: any; mode?: string }> = ({ word, index, currentIndex, mode }) => {
  const opacity = useTransform(
    currentIndex,
    [index - 0.4, index, index + 0.4],
    [0, 1, 0]
  );
  
  const y = useTransform(
    currentIndex,
    [index - 0.4, index, index + 0.4],
    [60, 0, -60]
  );

  const scale = useTransform(
    currentIndex,
    [index - 0.4, index, index + 0.4],
    [0.9, 1, 0.9]
  );

  if (mode === 'moments') {
    return (
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="bg-white/5 backdrop-blur-3xl border border-white/20 p-12 md:p-20 rounded-sm max-w-4xl w-full text-center">
          {renderText(word)}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >
      <span className="text-[clamp(1.35rem,8vw,6.5rem)] font-black leading-[1.05] uppercase text-white drop-shadow-2xl text-center break-words px-4">
        {word}
      </span>
    </motion.div>
  );
}

const MedicalTextBlock: React.FC<{
  text: string;
  progress: any;
  visibleRange: [number, number];
  enterRange: [number, number];
  holdRange: [number, number];
  exitRange: [number, number];
}> = ({ text, progress, visibleRange, enterRange, holdRange, exitRange }) => {
  const [visibleStart, visibleEnd] = visibleRange;
  const [enterStart, enterEnd] = enterRange;
  const [, holdEnd] = holdRange;
  const [exitStart, exitEnd] = exitRange;
  const [sectionProgress, setSectionProgress] = useState(0);
  const words = text.split(/\s+/).filter(Boolean);

  useMotionValueEvent(progress, 'change', (latest: number) => {
    setSectionProgress(latest);
  });

  const isVisible = sectionProgress >= visibleStart && sectionProgress <= visibleEnd;
  const y = useTransform(
    progress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [180, -118, -118, -282],
    { ease: smoothStep }
  );
  const opacity = useTransform(
    progress,
    [exitStart, exitEnd],
    [1, 0]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      style={{ y, opacity }}
      className="medical-text-block absolute inset-x-0 bottom-[clamp(7rem,18vh,12rem)] z-20 mx-auto flex flex-wrap justify-center gap-x-[0.24em] gap-y-[0.15em] text-white text-[clamp(1.45rem,5vw,3.45rem)] leading-[1.16] font-black text-center uppercase tracking-normal py-3 drop-shadow-[0_0_28px_rgba(218,49,94,0.45)]"
    >
      {words.map((word, index) => (
        <MedicalTextWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={progress}
          revealRange={enterRange}
        />
      ))}
    </motion.div>
  );
};

const MedicalTextWord: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: any;
  revealRange: [number, number];
}> = ({ word, index, total, progress, revealRange }) => {
  const [start, end] = revealRange;
  const revealSpan = end - start;
  const wordStart = start + (index / Math.max(total, 1)) * revealSpan * 0.72;
  const wordEnd = wordStart + revealSpan * 0.18;
  const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
  const y = useTransform(progress, [wordStart, wordEnd], [24, 0], { ease: smoothStep });

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
    </motion.span>
  );
};

const FinalSection: React.FC<{ screen: any; onVisibleChange?: (isVisible: boolean) => void }> = ({ screen, onVisibleChange }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    onVisibleChange?.(isInView);
  }, [isInView, onVisibleChange]);

  return (
    <section ref={ref} className="min-h-dvh flex items-center justify-center sticky-safe relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl text-center flex flex-col items-center gap-12"
      >
        <div className="flex flex-col gap-4">
          {screen.text.split('\n').map((line: string, i: number) => (
            <span key={i} className="text-[clamp(1.85rem,6vw,4.6rem)] font-black leading-[1.02] md:leading-[0.95] tracking-normal uppercase text-white">
              {line}
            </span>
          ))}
        </div>

        {screen.cta && (
          <a 
            href={screen.ctaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border-2 border-white px-[clamp(2rem,6vw,3.5rem)] py-[clamp(1rem,3vw,1.5rem)] text-[clamp(1rem,3vw,1.5rem)] font-black hover:bg-white hover:text-black transition-all uppercase tracking-widest bg-white/5 backdrop-blur-xl"
          >
            {screen.cta}
          </a>
        )}

        {screen.subtext && (
          <div className="mt-4 max-w-4xl">
            {screen.subtext.split('\n').map((line: string, i: number) => (
              <p key={i} className="text-[clamp(1.2rem,3.2vw,2.25rem)] font-extrabold text-white/86 leading-[1.22] uppercase tracking-normal">
                {line}
              </p>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};
