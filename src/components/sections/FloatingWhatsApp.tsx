import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { whatsappLink } from '../../lib/links';
import { ease } from '../../lib/motion';
import { WhatsApp } from '../ui/icons';

/** Botão flutuante só no mobile: aparece depois do hero e some perto do CTA final/rodapé. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const vh = window.innerHeight;
    const nearEnd = y + vh > document.documentElement.scrollHeight - vh * 1.6;
    setVisible(y > vh * 0.9 && !nearEnd);
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a VK Store no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.5, ease }}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 grid size-13 place-items-center rounded-full bg-vk text-black shadow-[0_8px_30px_-6px_rgba(0,0,0,0.45)] md:hidden"
        >
          <WhatsApp className="size-6" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
