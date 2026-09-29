import type { CSSProperties } from 'react';

export const ease = [0.22, 1, 0.36, 1] as const;

/** Índice de escalonamento para as animações CSS do hero (.line-in / .fade-up). */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
