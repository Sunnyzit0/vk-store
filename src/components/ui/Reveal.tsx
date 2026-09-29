import { m } from 'motion/react';
import type { ReactNode } from 'react';
import { ease } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'p' | 'h2' | 'li' | 'span';
}

/** Fade + subida, dispara uma vez ao entrar na viewport. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}
