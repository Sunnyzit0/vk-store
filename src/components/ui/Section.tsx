import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** Largura padrão do conteúdo. */
export const container = 'mx-auto w-full max-w-[1120px] px-5 md:px-6';

/** Padding que alinha um trilho horizontal com o container, deixando-o sangrar até a borda. */
export const railInset = 'px-[max(1.25rem,calc((100vw-1120px)/2+1.5rem))] scroll-px-[max(1.25rem,calc((100vw-1120px)/2+1.5rem))]';

interface HeadingProps {
  eyebrow: string;
  title: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  children?: ReactNode;
  id?: string;
}

export function SectionHeading({ eyebrow, title, tone = 'light', align = 'left', children, id }: HeadingProps) {
  const center = align === 'center';
  return (
    <div className={center ? 'mx-auto text-center' : ''}>
      <Reveal as="p" className={`text-eyebrow font-semibold ${tone === 'light' ? 'text-vk-deep' : 'text-vk'}`}>
        {eyebrow}
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className={`mt-3 max-w-[16ch] text-headline font-semibold text-balance ${center ? 'mx-auto' : ''} ${tone === 'light' ? 'text-ink' : 'text-snow'}`}>
          {title}
        </h2>
      </Reveal>
      {children}
    </div>
  );
}
