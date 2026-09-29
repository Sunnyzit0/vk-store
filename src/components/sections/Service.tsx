import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { content, type ServiceStep } from '../../data/content';
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe';
import { WhatsAppButton } from '../ui/Button';
import { MediaView } from '../ui/Media';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container } from '../ui/Section';

const { service } = content;
const n = service.steps.length;
const pad = (i: number) => String(i + 1).padStart(2, '0');
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t ** 3;

/** Uma etapa: entra, fica e sai conforme a fatia do scroll que lhe pertence. */
function Step({ step, i, progress }: { step: ServiceStep; i: number; progress: MotionValue<number> }) {
  // A etapa anterior termina de sair exatamente na fronteira e a próxima só começa a entrar depois dela,
  // então os textos nunca se sobrepõem. A primeira já nasce visível; a última não sai.
  const start = i / n;
  const end = (i + 1) / n;
  const fade = 0.4 / n;
  const enter = (p: number) => (i === 0 ? 1 : easeOut(clamp01((p - start) / fade)));
  const leave = (p: number) => (i === n - 1 ? 0 : easeIn(clamp01((p - (end - fade)) / fade)));

  const opacity = useTransform(progress, (p) => enter(p) * (1 - leave(p)));
  const y = useTransform(progress, (p) => (1 - enter(p)) * 48 - leave(p) * 48);

  return (
    <m.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
      <p className="text-eyebrow font-semibold text-vk">
        <span className="tabular-nums text-white/50">{pad(i)}</span>
        <span className="mx-2 text-white/25">/</span>
        {step.eyebrow}
      </p>
      <h3 className="mt-4 max-w-[13ch] text-headline font-semibold text-balance text-snow">{step.title}</h3>
      <p className="mt-5 max-w-[32ch] text-lead text-ink-3">{step.body}</p>
    </m.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div aria-hidden className="absolute right-6 top-1/2 hidden h-48 w-px -translate-y-1/2 bg-white/15 md:block lg:right-10">
      <m.div style={{ scaleY }} className="h-full w-full origin-top bg-vk" />
    </div>
  );
}

function MobileSegments({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden className="absolute inset-x-5 top-20 flex gap-1.5 md:hidden">
      {service.steps.map((s, i) => (
        <Segment key={s.id} i={i} progress={progress} />
      ))}
    </div>
  );
}

function Segment({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [i / n, (i + 1) / n], [0, 1]);
  return (
    <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
      <m.div style={{ scaleX }} className="h-full origin-left bg-vk" />
    </div>
  );
}

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const imageX = useTransform(scrollYProgress, [0, 1], ['6%', '-4%']);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.45]);

  return (
    <div ref={ref} style={{ height: `${n * 90}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <m.div style={{ scale: imageScale, x: imageX }} className="absolute inset-0 will-change-transform">
          <MediaView media={service.media} sizes="(orientation: portrait) 240vh, 130vw" className="object-[60%_50%]" />
        </m.div>
        <m.div style={{ opacity: glow }} aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,rgba(95,224,58,0.18),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/75 via-40% to-black/30 md:bg-gradient-to-r md:from-black md:via-black/70 md:via-45% md:to-black/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

        <MobileSegments progress={scrollYProgress} />
        <ProgressRail progress={scrollYProgress} />

        <div className={`${container} relative h-full`}>
          {/* Área das etapas: no mobile fica acima do botão flutuante de WhatsApp. */}
          <div className="absolute inset-x-5 bottom-[max(7rem,14svh)] top-32 md:inset-x-6 md:inset-y-0">
            {service.steps.map((step, i) => (
              <Step key={step.id} step={step} i={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
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

      {reduce ? <StaticStory /> : <PinnedStory />}

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
