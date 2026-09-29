import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { content } from '../../data/content';
import { whatsappLink } from '../../lib/links';
import { ease } from '../../lib/motion';
import { WhatsApp } from '../ui/icons';

const { nav, brand } = content;

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label={`${brand.name}, voltar ao início`}>
      <img src="/logo-96.webp" alt="" width={28} height={28} className="size-7 rounded-[8px]" />
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-white">{brand.name}</span>
    </a>
  );
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);
  const { scrollY } = useScroll();

  // Some ao descer, volta ao subir.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < 80) setHidden(false);
    else if (Math.abs(y - prev) > 4) setHidden(y > prev);
  });

  useEffect(() => {
    if (!open) return;
    // Trava a rolagem de um jeito que também funciona no Safari do iPhone
    // (overflow: hidden no <html> sozinho não segura o scroll por toque).
    const { body } = document;
    const y = window.scrollY;
    Object.assign(body.style, { position: 'fixed', top: `-${y}px`, left: '0', right: '0' });
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      Object.assign(body.style, { position: '', top: '', left: '', right: '' });
      window.scrollTo({ top: y, behavior: 'instant' });
      // Se o menu fechou por um link, rola até a seção depois de destravar.
      const target = pendingHash.current;
      pendingHash.current = null;
      if (target) {
        document.querySelector(target)?.scrollIntoView();
        history.pushState(null, '', target);
      }
      window.removeEventListener('keydown', onKey);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="border-b border-white/[0.08] bg-black/70 backdrop-blur-xl backdrop-saturate-150">
          <nav aria-label="Principal" className="mx-auto flex h-14 max-w-[1120px] items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:h-12 md:pl-[max(1.5rem,env(safe-area-inset-left))] md:pr-[max(1.5rem,env(safe-area-inset-right))]">
            <Logo />
            <ul className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.8125rem] text-white/75 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-8 items-center gap-1.5 rounded-full bg-vk px-3.5 text-[0.8125rem] font-medium text-black transition-colors hover:bg-[#74ea52] sm:inline-flex"
              >
                <WhatsApp className="size-3.5" />
                Falar no WhatsApp
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                className="relative -mr-2 grid size-11 place-items-center md:hidden"
              >
                <span className={`absolute h-[1.5px] w-[18px] bg-white transition-transform duration-500 ease-[var(--ease-vk)] ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[1.5px] w-[18px] bg-white transition-transform duration-500 ease-[var(--ease-vk)] ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-black px-8 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
            transition={{ duration: 0.4, ease }}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease, delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      pendingHash.current = item.href;
                      setOpen(false);
                    }}
                    className="block py-2 text-[2.25rem] font-semibold tracking-[-0.035em] text-snow transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <m.div
              className="mt-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-vk text-[1.0625rem] font-medium text-black"
              >
                <WhatsApp className="size-5" />
                Falar no WhatsApp
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
