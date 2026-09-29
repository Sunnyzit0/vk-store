import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Categories } from './components/sections/Categories';
import { FinalCta } from './components/sections/FinalCta';
import { FloatingWhatsApp } from './components/sections/FloatingWhatsApp';
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { Nav } from './components/sections/Nav';
import { Service } from './components/sections/Service';
import { Testimonials } from './components/sections/Testimonials';
import { Visit } from './components/sections/Visit';
import { WhyVK } from './components/sections/WhyVK';

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">
          <Hero />
          <Highlights />
          <Service />
          <Categories />
          <WhyVK />
          <Testimonials />
          <Visit />
          <FinalCta />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </MotionConfig>
    </LazyMotion>
  );
}
