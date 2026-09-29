import type { ReactNode } from 'react';
import { whatsappLink } from '../../lib/links';
import { ChevronRight, WhatsApp } from './icons';

type Variant = 'vk' | 'dark' | 'light' | 'glass';

const variants: Record<Variant, string> = {
  vk: 'bg-vk text-black hover:bg-[#74ea52]',
  dark: 'bg-ink text-white hover:bg-black',
  light: 'bg-white text-ink hover:bg-snow',
  glass: 'bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur-md hover:bg-white/15',
};

const sizes = {
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
  lg: 'h-14 px-7 text-[1.0625rem] gap-2.5',
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
}

export function Button({ href, children, variant = 'vk', size = 'md', icon, className = '', external }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[background-color,transform] duration-300 ease-[var(--ease-vk)] active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}

export function WhatsAppButton({ message, children, ...rest }: Omit<ButtonProps, 'href' | 'icon' | 'external'> & { message?: string }) {
  return (
    <Button href={whatsappLink(message)} external icon={<WhatsApp className="size-[1.15em]" />} {...rest}>
      {children}
    </Button>
  );
}

/** Link de texto estilo "Saiba mais >" */
export function TextLink({ href, children, className = '', external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center gap-1 font-medium hover:underline hover:underline-offset-4 ${className}`}
    >
      {children}
      <ChevronRight className="size-[0.9em] transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}
