import { m, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { stagger } from '../../lib/motion';
import { TextLink, WhatsAppButton } from '../ui/Button';
import { MediaView } from '../ui/Media';

const { hero } = content;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-snow">
      <m.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 mx-auto w-full max-w-[1120px] px-5 pt-28 text-center md:px-6 md:pt-32">
        <p className="fade-up text-eyebrow font-medium text-ink-3" style={stagger(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 text-display font-semibold">
          {hero.headline.map((line, i) => (
            <span key={line} className="line-mask">
              <span className={`line-in ${i === hero.headline.length - 1 ? 'text-vk' : ''}`} style={stagger(i + 1)}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="fade-up mx-auto mt-6 max-w-[34ch] text-lead text-ink-3" style={stagger(3)}>
          {hero.subtitle}
        </p>
        <div className="fade-up mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7" style={stagger(4)}>
          <WhatsAppButton size="lg">{hero.primaryCta}</WhatsAppButton>
          <TextLink href={hero.secondaryCta.href} className="text-[1.0625rem] text-vk">
            {hero.secondaryCta.label}
          </TextLink>
        </div>
      </m.div>

      <div className="relative -mt-6 flex flex-1 items-end justify-center md:-mt-10">
        <m.div style={{ y: imageY, scale: imageScale }} className="relative will-change-transformw-[210%] max-w-none sm:w-[150%] md:w-full md:max-w-[1200px]">
          <div className="hero-media-in edge-fade">
            <div className="aspect-[1672/940]">
              <MediaView media={hero.media} sizes="(max-width: 640px) 210vw, (max-width: 768px) 150vw, 100vw" priority />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
