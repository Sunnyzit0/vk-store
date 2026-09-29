import { content } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container } from '../ui/Section';

const { testimonials, flags } = content;

/** Pronto, mas só aparece com flags.showTestimonials = true e depoimentos autorizados. */
export function Testimonials() {
  if (!flags.showTestimonials || testimonials.items.length === 0) return null;

  return (
    <section aria-labelledby="clientes-title" className="on-light bg-canvas py-24 md:py-36">
      <div className={container}>
        <SectionHeading id="clientes-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={t.author + i} delay={i * 0.08} className="flex flex-col rounded-card bg-white p-8 shadow-soft">
              <blockquote className="text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-ink">“{t.quote}”</blockquote>
              <p className="mt-auto pt-8 text-[0.9375rem] font-semibold text-ink">{t.author}</p>
              <p className="text-[0.875rem] text-ink-2">{t.context}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
