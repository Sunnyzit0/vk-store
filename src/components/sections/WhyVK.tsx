import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { Reveal } from '../ui/Reveal';
import { container } from '../ui/Section';

const { why } = content;
const lines = why.lines.map((line) => line.split(' '));
const total = lines.flat().length;

// Opacidade mínima da palavra "apagada": 0.38 ainda passa 3:1 (AA para texto grande) sobre #1d1d1f.
const DIM = 0.38;

/** Palavra que "acende" quando o scroll passa pela sua fatia. */
function Word({ word, k, progress }: { word: string; k: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [k / total, (k + 1) / total], [DIM, 1]);
  return <m.span style={{ opacity }}>{word} </m.span>;
}

export function WhyVK() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] });

  let k = 0;
  return (
    <section aria-labelledby="porque-title" className="bg-night-2 py-28 text-snow md:py-44">
      <div className={container}>
        <Reveal as="p" className="text-eyebrow font-semibold text-vk">
          <span id="porque-title">{why.eyebrow}</span>
        </Reveal>
        <div ref={ref} className="mt-8 text-headline font-semibold md:mt-12">
          {lines.map((words, li) => (
            <p key={li} className="mb-[0.18em] text-balance">
              {words.map((word) => {
                const index = k++;
                return reduce ? (
                  <span key={index}>{word} </span>
                ) : (
                  <Word key={index} word={word} k={index} progress={scrollYProgress} />
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
