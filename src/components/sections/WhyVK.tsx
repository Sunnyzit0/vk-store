import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { Reveal } from '../ui/Reveal';
import { MediaView } from '../ui/Media';
import { container, railInset } from '../ui/Section';

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

      {/* Fotos reais de clientes: trilho arrastável no celular, grade no desktop. */}
      <div className={`${container} mt-20 md:mt-28`}>
        <Reveal as="p" className="text-eyebrow font-semibold text-vk">
          {why.gallery.eyebrow}
        </Reveal>
      </div>
      <Reveal delay={0.08}>
        <ul
          aria-label={why.gallery.eyebrow}
          className={`no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain ${railInset} md:mx-auto md:grid md:max-w-[1120px] md:grid-cols-4 md:gap-4 md:overflow-visible md:px-6`}
        >
          {why.gallery.photos.map((photo, i) => (
            <li key={i} className="w-[68vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
              <figure>
                <div className="aspect-[4/5] overflow-hidden rounded-card bg-night-3">
                  <MediaView media={photo.media} sizes="(max-width: 768px) 68vw, 270px" />
                </div>
                <figcaption className="mt-3 text-[0.9375rem] text-ink-3">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
