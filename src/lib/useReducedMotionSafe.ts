import { useEffect, useState } from 'react';

/**
 * prefers-reduced-motion que começa `false` para casar com o HTML pré-renderizado
 * e só troca depois da hidratação (evita mismatch de SSR).
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduce;
}
