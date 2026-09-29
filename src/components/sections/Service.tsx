import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState, type CSSProperties } from 'react';
import { content } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { WhatsAppButton } from '../ui/Button';
import { MediaView } from '../ui/Media';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container } from '../ui/Section';

const { service } = content;
const n = service.steps.length;
const pad = (i: number) => String(i + 1).padStart(2, '0');

// Enquadramento da foto em cada etapa. A troca é uma transição CSS (roda na GPU),
// não uma animação amarrada frame a frame ao scroll — por isso fica lisa no celular.
const frames = [
  'scale(1.28) translate3d(4%, 2%, 0)',
  'scale(1.2) translate3d(1%, -1%, 0)',
  'scale(1.14) translate3d(-2%, 1%, 0)',
  'scale(1.08) translate3d(-4%, -1%, 0)',
  'scale(1) translate3d(-3%, 0, 0)',
];

const transition = 'duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // O scroll só decide QUAL etapa está ativa (muda 5 vezes, não 60 por segundo).
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  return (
    <div ref={ref} className="relative h-[calc(var(--steps)*65svh)] md:h-[calc(var(--steps)*85svh)]" style={{ '--steps': n } as CSSProperties}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 transition-transform ${transition}`} style={{ transform: frames[active % frames.length] }}>
          <MediaView media={service.media} sizes="(orientation: portrait) 240vh, 130vw" className="object-[60%_50%]" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,rgba(95,224,58,0.14),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/75 via-40% to-black/30 md:bg-gradient-to-r md:from-black md:via-black/70 md:via-45% md:to-black/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

        {/* Progresso: segmentos no mobile, trilho vertical no desktop */}
        <div aria-hidden className="absolute inset-x-5 top-20 flex gap-1.5 md:hidden">
          {service.steps.map((s, i) => (
            <div key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
              <div className={`h-full origin-left bg-vk transition-transform ${transition}`} style={{ transform: `scaleX(${i <= active ? 1 : 0})` }} />
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute right-6 top-1/2 hidden h-48 w-px -translate-y-1/2 bg-white/15 md:block lg:right-10">
          <div className={`h-full w-full origin-top bg-vk transition-transform ${transition}`} style={{ transform: `scaleY(${(active + 1) / n})` }} />
        </div>

        <div className={`${container} relative h-full`}>
          {/* Área das etapas: no mobile fica acima do botão flutuante de WhatsApp. */}
          <div className="absolute inset-x-5 bottom-[max(7rem,14svh)] top-32 md:inset-x-6 md:inset-y-0">
            {service.steps.map((step, i) => {
              // A que sai some primeiro; a que entra começa logo depois (delay), sem sobrepor.
              const state =
                i === active ? 'opacity-100 translate-y-0 delay-150' : i < active ? 'opacity-0 -translate-y-10' : 'opacity-0 translate-y-10';
              return (
                <div key={step.id} className="absolute inset-x-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
                  <div className={`transition-[opacity,translate] ${transition} ${state}`}>
                    <p className="text-eyebrow font-semibold text-vk">
                      <span className="tabular-nums text-white/50">{pad(i)}</span>
                      <span className="mx-2 text-white/25">/</span>
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-4 max-w-[13ch] text-headline font-semibold text-balance text-snow">{step.title}</h3>
                    <p className="mt-5 max-w-[32ch] text-lead text-ink-3">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enquadramento da foto da bancada em cada card do mobile: mesma imagem (baixada uma vez),
// zoom e ponto focal diferentes. Transform estático — nada anima durante a rolagem.
const crops = [
  { scale: 1, origin: '50% 50%' }, // bancada inteira
  { scale: 2.1, origin: '47% 58%' }, // aparelho aberto
  { scale: 2.2, origin: '28% 72%' }, // tela
  { scale: 2.4, origin: '63% 49%' }, // placa
  { scale: 1.9, origin: '60% 12%' }, // lupa iluminada
];

/**
 * Mobile: cards que empilham conforme a rolagem. É só `position: sticky` (CSS puro, sem JavaScript
 * no scroll), então acompanha o dedo com a fluidez da rolagem nativa do celular.
 */
function StackedStory() {
  return (
    <ol className={`${container} mt-12`}>
      {service.steps.map((step, i) => (
        <li
          key={step.id}
          className="sticky mb-5 last:mb-0"
          style={{ top: `calc(4.5rem + ${i * 0.75}rem)` }}
        >
          <article className="overflow-hidden rounded-card bg-night-3 shadow-[0_-16px_40px_-8px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/10">
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0" style={{ transform: `scale(${crops[i % crops.length].scale})`, transformOrigin: crops[i % crops.length].origin }}>
                <MediaView media={service.media} sizes="(max-width: 768px) 200vw, 100vw" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-3 via-night-3/20 to-transparent" />
              <span aria-hidden className="absolute right-5 top-4 text-[3.5rem] font-semibold leading-none tracking-[-0.05em] text-white/15 tabular-nums">
                {pad(i)}
              </span>
            </div>
            <div className="px-6 pb-7 pt-1">
              <p className="text-eyebrow font-semibold text-vk">{step.eyebrow}</p>
              <h3 className="mt-2 text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-snow">{step.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-3">{step.body}</p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

/** Versão estática para quem prefere menos movimento. */
function StaticStory() {
  return (
    <div className={`${container} mt-14`}>
      <div className="aspect-[16/9] overflow-hidden rounded-card">
        <MediaView media={service.media} sizes="(max-width: 1120px) 100vw, 1120px" />
      </div>
      <ol className="mt-14 grid gap-12 md:grid-cols-2">
        {service.steps.map((step, i) => (
          <li key={step.id}>
            <p className="text-eyebrow font-semibold text-vk">
              <span className="text-white/50">{pad(i)}</span> / {step.eyebrow}
            </p>
            <h3 className="mt-3 text-title font-semibold text-snow">{step.title}</h3>
            <p className="mt-3 text-lead text-ink-3">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Service() {
  const reduce = useReducedMotionSafe();

  return (
    <section id="assistencia" aria-labelledby="assistencia-title" className="bg-black text-snow">
      <div className={`${container} pt-24 md:pt-40`}>
        <SectionHeading id="assistencia-title" eyebrow={service.eyebrow} title={service.title} tone="dark" align="center">
          <Reveal as="p" delay={0.12} className="mx-auto mt-6 max-w-[30ch] text-lead text-ink-3">
            {service.intro}
          </Reveal>
        </SectionHeading>
      </div>

      {reduce ? (
        <StaticStory />
      ) : (
        <>
          <div className="md:hidden">
            <StackedStory />
          </div>
          <div className="hidden md:block">
            <PinnedStory />
          </div>
        </>
      )}

      <div className={`${container} pb-24 pt-16 md:pb-40 md:pt-24`}>
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {service.seals.map((seal) => (
              <li key={seal} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-white/80">
                <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-vk" />
                {seal}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <WhatsAppButton size="lg" message={service.whatsappMessage}>
            {service.cta}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
