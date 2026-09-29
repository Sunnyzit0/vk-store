import { m, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { WhatsAppButton } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { container } from '../ui/Section';

const { finalCta } = content;

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1]);
  const glow = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="contato"
      aria-labelledby="contato-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black py-28 text-center text-snow"
    >
      <m.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[140vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(95,224,58,0.22),rgba(95,224,58,0.06)_55%,transparent)]"
      />
      <div className={container}>
        <m.h2 id="contato-title" style={{ scale }} className="text-display font-semibold">
          {finalCta.title.map((line, i) => (
            <span key={line} className={`block ${i === finalCta.title.length - 1 ? 'text-vk' : ''}`}>
              {line}
            </span>
          ))}
        </m.h2>
        <Reveal as="p" delay={0.1} className="mx-auto mt-7 max-w-[30ch] text-lead text-ink-3">
          {finalCta.subtitle}
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <WhatsAppButton size="lg" message={finalCta.whatsappMessage}>
            {finalCta.cta}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
