import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { Reveal } from '../ui/Reveal';
import { container } from '../ui/Section';

const { why } = content;
const lines = why.lines.map((line) => line.split(' '));
const total = lines.flat().length;

export function WhyVK() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] });

  // O scroll só conta quantas palavras já acenderam; o "acender" é transição CSS (GPU),
  // então não há trabalho por frame no celular.
  useMotionValueEvent(scrollYProgress, 'change', (p) => setLit(Math.round(p * total)));

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
                // Opacidade mínima 0.38: ainda passa 3:1 (AA para texto grande) sobre #1d1d1f.
                const on = reduce || index < lit;
                return (
                  <span key={index} className={`transition-opacity duration-500 ease-out ${on ? 'opacity-100' : 'opacity-[0.38]'}`}>
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
