import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { content, type Product } from '../../data/content';
import { whatsappLink } from '../../lib/links';
import { ChevronLeft, ChevronRight } from '../ui/icons';
import { MediaView } from '../ui/Media';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container, railInset } from '../ui/Section';

const { highlights } = content;

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="relative w-[80vw] max-w-[372px] shrink-0 snap-start sm:w-[360px]">
      <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-card bg-night-2 shadow-soft">
        <div className="absolute inset-0 -z-10 transition-transform duration-[1200ms] ease-[var(--ease-vk)] group-hover:scale-[1.04]">
          <MediaView media={product.media} sizes="(max-width: 640px) 80vw, 372px" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 via-45% to-transparent" />
        <div className="flex h-full flex-col justify-end p-6 text-white sm:p-7">
          <p className="text-[0.8125rem] font-semibold text-white/70">{product.brand}</p>
          <h3 className="mt-1 text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.03em]">{product.name}</h3>
          <p className="mt-2 text-[0.9375rem] leading-snug text-white/80">{product.tagline}</p>
          <a
            href={whatsappLink(product.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-9 w-fit items-center rounded-full bg-white/15 px-4 text-[0.875rem] font-medium ring-1 ring-inset ring-white/25 backdrop-blur-md transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-white/25"
            draggable={false}
          >
            {highlights.cta}
            <span className="sr-only"> {product.name} no WhatsApp</span>
          </a>
        </div>
      </article>
    </li>
  );
}

export function Highlights() {
  const railRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: 'smooth' });
  };

  // Arrastar com o mouse (no toque o scroll nativo já resolve).
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || !railRef.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: railRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const el = railRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 5) {
      drag.current.moved = true;
      el.style.scrollSnapType = 'none';
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    const el = railRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    if (drag.current.moved) {
      // Reativa o snap a partir da posição atual para assentar suavemente no card mais próximo.
      const left = el.scrollLeft;
      el.style.scrollSnapType = '';
      el.scrollLeft = left;
    }
  };
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="destaques" aria-labelledby="destaques-title" className="on-light overflow-hidden bg-canvas py-24 md:py-36">
      <div className={container}>
        <SectionHeading id="destaques-title" eyebrow={highlights.eyebrow} title={highlights.title} />
      </div>

      <Reveal delay={0.1} y={40}>
        <ul
          ref={railRef}
          onScroll={updateEdges}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          aria-label="Produtos em destaque"
          className={`no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-10 md:mt-16 md:cursor-grab md:gap-5 md:active:cursor-grabbing ${railInset}`}
        >
          {highlights.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
      </Reveal>

      <div className={`${container} hidden justify-end gap-3 md:flex`}>
        {([
          [-1, edges.start, 'Anterior', ChevronLeft],
          [1, edges.end, 'Próximo', ChevronRight],
        ] as const).map(([dir, disabled, label, Icon]) => (
          <button
            key={label}
            type="button"
            onClick={() => step(dir)}
            disabled={disabled}
            aria-label={`${label} produto`}
            className="grid size-11 place-items-center rounded-full bg-[#e8e8ed] text-ink transition-[background-color,opacity] hover:bg-[#dcdce1] disabled:cursor-default disabled:opacity-40"
          >
            <Icon className="size-5" />
          </button>
        ))}
      </div>
    </section>
  );
}
