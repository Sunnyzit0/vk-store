import { content, type Category } from '../../data/content';
import { whatsappLink } from '../../lib/links';
import { ArrowUpRight } from '../ui/icons';
import { MediaView } from '../ui/Media';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container } from '../ui/Section';

const { categories } = content;

const layout: Record<Category['size'], { cell: string; sizes: string }> = {
  hero: { cell: 'col-span-2 row-span-2', sizes: '(max-width: 768px) 100vw, 560px' },
  tall: { cell: 'col-span-1 row-span-2', sizes: '(max-width: 768px) 50vw, 280px' },
  square: { cell: 'col-span-1 row-span-1', sizes: '(max-width: 768px) 50vw, 280px' },
  // Mobile: dois cards altos lado a lado. Desktop: dois cards largos dividindo a última linha.
  half: { cell: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1', sizes: '(max-width: 768px) 50vw, 560px' },
};

function CategoryCard({ item, index }: { item: Category; index: number }) {
  const { cell, sizes } = layout[item.size];
  const big = item.size === 'hero';
  return (
    <Reveal delay={(index % 3) * 0.08} className={cell}>
      <a
        href={whatsappLink(item.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative isolate flex h-full flex-col overflow-hidden rounded-card bg-night-2 p-5 text-white md:p-7"
      >
        <div className="absolute inset-0 -z-10 transition-transform duration-[1200ms] ease-[var(--ease-vk)] group-hover:scale-[1.05]">
          <MediaView media={item.media} sizes={sizes} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/25 via-45% to-black/40" />
        <h3 className={`font-semibold tracking-[-0.03em] ${big ? 'text-[1.75rem] leading-[1.05] md:text-[2.5rem]' : 'text-[1.25rem] leading-tight md:text-[1.5rem]'}`}>
          {item.title}
        </h3>
        <p className={`mt-1.5 max-w-[28ch] leading-snug text-white/80 ${big ? 'text-[0.9375rem] md:text-[1.0625rem]' : 'text-[0.8125rem] md:text-[0.9375rem]'}`}>
          {big ? item.items : item.subtitle}
        </p>
        <span
          aria-hidden
          className="mt-auto grid size-9 place-self-end place-items-center rounded-full bg-black/35 ring-1 ring-inset ring-white/30 transition-colors duration-300 group-hover:bg-vk group-hover:text-black group-hover:ring-transparent"
        >
          <ArrowUpRight className="size-4" />
        </span>
        <span className="sr-only">Ver {item.title} no WhatsApp</span>
      </a>
    </Reveal>
  );
}

export function Categories() {
  return (
    <section id="categorias" aria-labelledby="categorias-title" className="on-light bg-mist py-24 md:py-36">
      <div className={container}>
        <SectionHeading id="categorias-title" eyebrow={categories.eyebrow} title={categories.title} />

        <div className="mt-12 grid auto-rows-[164px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:mt-16 md:auto-rows-[280px] md:grid-cols-4 md:gap-4">
          {categories.items.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal className="mx-auto mt-14 max-w-[46ch] text-center md:mt-20">
          <p className="text-subtitle font-semibold text-ink">{categories.also.title}</p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{categories.also.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
