// Fonte única de conteúdo do site. Toda seção lê daqui.
// Regra: nada de preço, número, prazo ou depoimento inventado.
// Onde falta informação real há um `TODO:` — ver lista no README.

import type { ImageName } from './images.gen';

/** Foto real (gerada em public/img) ou placeholder elegante até a foto chegar. */
export type Media =
  | { kind: 'photo'; name: ImageName; alt: string; position?: string }
  | { kind: 'placeholder'; suggestedFile: string; alt: string; tone: 'green' | 'graphite' | 'silver' };

export interface Product {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  media: Media;
  whatsappMessage: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  items: string;
  media: Media;
  whatsappMessage: string;
  size: 'hero' | 'tall' | 'half' | 'square';
}

export interface ServiceStep {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export interface Content {
  flags: { showTestimonials: boolean };
  site: {
    url: string;
    title: string;
    description: string;
    locale: string;
  };
  brand: {
    name: string;
    slogan: string;
    claim: string;
    about: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    defaultMessage: string;
    instagram: { handle: string; url: string };
    threads: { handle: string; url: string };
  };
  location: {
    city: string;
    state: string;
    street: string | null;
    geo: { lat: number; lng: number };
    hours: { label: string; value: string; opens?: string; closes?: string; days?: string[] }[];
  };
  nav: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string[];
    subtitle: string;
    primaryCta: string;
    secondaryCta: { label: string; href: string };
    media: Media;
  };
  highlights: { eyebrow: string; title: string; cta: string; products: Product[] };
  service: {
    eyebrow: string;
    title: string;
    intro: string;
    media: Media;
    steps: ServiceStep[];
    seals: string[];
    cta: string;
    whatsappMessage: string;
  };
  categories: { eyebrow: string; title: string; items: Category[]; also: { title: string; body: string } };
  why: { eyebrow: string; lines: string[]; gallery: { eyebrow: string; photos: { media: Media; caption: string }[] } };
  testimonials: { eyebrow: string; title: string; items: Testimonial[] };
  visit: { eyebrow: string; title: string; media: Media };
  finalCta: { title: string[]; subtitle: string; cta: string; whatsappMessage: string };
  footer: { watermark: string };
}

export const content: Content = {
  flags: {
    // Só ligue depois de ter autorização escrita dos clientes para usar nome/fala.
    showTestimonials: false,
  },

  site: {
    // TODO: confirmar domínio definitivo (usado em canonical, og:url e schema.org).
    url: 'https://vkstorepb.com.br/',
    title: 'VK Store | Celulares, acessórios e assistência técnica em Padre Bernardo - GO',
    description:
      'VK Store em Padre Bernardo - GO: iPhone, Xiaomi, Realme, JBL, Starlink e acessórios, novos e seminovos a pronta entrega. Assistência técnica com orçamento grátis.',
    locale: 'pt_BR',
  },

  brand: {
    name: 'VK Store',
    slogan: 'Vem pra VK, vem pra melhor!',
    claim: 'A melhor da região.',
    about:
      'A VK Store é o ponto de encontro de quem ama tecnologia em Padre Bernardo: aparelhos novos e seminovos, acessórios, som, conectividade e uma assistência técnica que resolve de perto.',
  },

  contact: {
    whatsappNumber: '5561992470685',
    whatsappDisplay: '(61) 99247-0685',
    defaultMessage: 'Olá, vim pelo site e quero falar com a VK Store.',
    instagram: { handle: '@vkstorepb', url: 'https://instagram.com/vkstorepb' },
    threads: { handle: '@vkstorepb', url: 'https://www.threads.net/@vkstorepb' },
  },

  location: {
    city: 'Padre Bernardo',
    state: 'GO',
    // TODO: endereço completo (rua, número, bairro, CEP). Hoje só temos as coordenadas do mapa.
    street: null,
    geo: { lat: -15.167810821137952, lng: -48.285060667970015 },
    hours: [
      {
        label: 'Segunda a sexta',
        value: '8h às 19h',
        opens: '08:00',
        closes: '19:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      },
      { label: 'Sábado', value: '8h às 18h', opens: '08:00', closes: '18:00', days: ['Saturday'] },
      // TODO: confirmar se a loja realmente fecha aos domingos.
      { label: 'Domingo', value: 'Fechado' },
    ],
  },

  nav: [
    { label: 'Destaques', href: '#destaques' },
    { label: 'Assistência', href: '#assistencia' },
    { label: 'Categorias', href: '#categorias' },
    { label: 'A loja', href: '#loja' },
  ],

  hero: {
    eyebrow: 'VK Store · Padre Bernardo',
    headline: ['Vem pra', 'melhor.'],
    subtitle: 'Celulares, acessórios e assistência técnica. Novos e seminovos, a pronta entrega.',
    primaryCta: 'Falar no WhatsApp',
    secondaryCta: { label: 'Ver destaques', href: '#destaques' },
    media: {
      kind: 'photo',
      name: 'hero-phone',
      alt: 'Smartphone iluminado em verde, flutuando sobre fundo escuro',
    },
  },

  highlights: {
    eyebrow: 'Destaques',
    title: 'Os queridinhos da loja.',
    // TODO: preços e condições de pagamento. Até lá, todo card leva ao WhatsApp.
    cta: 'Consultar',
    products: [
      {
        id: 'iphone-17-pro-max',
        name: 'iPhone 17 Pro Max',
        brand: 'Apple',
        tagline: 'O lançamento. Embalado para presente.',
        media: {
          kind: 'photo',
          name: 'iphone-17-pro-max',
          alt: 'Caixa do iPhone 17 Pro Max com laço verde da VK Store',
          position: '50% 40%',
        },
        whatsappMessage: 'Olá! Quero saber do iPhone 17 Pro Max.',
      },
      {
        id: 'redmi-note-15',
        name: 'Redmi Note 15 Pro+',
        brand: 'Xiaomi',
        tagline: 'O mais pedido da vitrine.',
        media: { kind: 'photo', name: 'redmi-note-15', alt: 'Redmi Note 15 Pro Plus com a caixa original' },
        whatsappMessage: 'Olá! Quero saber do Redmi Note 15 Pro+.',
      },
      {
        id: 'boombox-4',
        name: 'JBL Boombox 4',
        brand: 'JBL',
        tagline: 'Som de respeito, em várias cores.',
        media: {
          kind: 'photo',
          name: 'boombox-4-cores',
          alt: 'JBL Boombox 4 laranja e marrom com as caixas, na frente da VK Store',
          position: '50% 70%',
        },
        whatsappMessage: 'Olá! Quero saber da JBL Boombox 4.',
      },
      {
        id: 'poco-x8-pro',
        name: 'POCO X8 Pro',
        brand: 'POCO',
        tagline: 'Desempenho para quem não espera.',
        media: { kind: 'photo', name: 'poco-x8-pro', alt: 'POCO X8 Pro na mão, na VK Store' },
        whatsappMessage: 'Olá! Quero saber do POCO X8 Pro.',
      },
      {
        id: 'jbl-tune-flex-2',
        // TODO: confirmar que o JBL Tune Flex 2 está no catálogo (nome tirado do arquivo da foto).
        name: 'JBL Tune Flex 2',
        brand: 'JBL',
        tagline: 'Fone sem fio para o dia inteiro.',
        media: { kind: 'photo', name: 'jbl-tune-flex-2', alt: 'Fones JBL Tune Flex 2 brancos com o estojo aberto' },
        whatsappMessage: 'Olá! Quero saber do fone JBL Tune Flex 2.',
      },
    ],
  },

  service: {
    eyebrow: 'Assistência técnica',
    title: 'Seu celular, de volta à vida.',
    intro: 'Bancada própria, com quem entende do assunto.',
    media: {
      kind: 'photo',
      name: 'service-bench',
      alt: 'Bancada de assistência técnica com smartphone aberto e ferramentas',
    },
    steps: [
      {
        id: 'orcamento',
        eyebrow: 'Orçamento',
        title: 'Orçamento grátis.',
        body: 'Traga o aparelho ou chame no WhatsApp. Você sabe quanto custa antes de decidir.',
      },
      {
        id: 'diagnostico',
        eyebrow: 'Diagnóstico',
        title: 'O problema, com precisão.',
        body: 'A gente identifica o defeito e explica tudo antes de começar.',
      },
      {
        id: 'tela',
        eyebrow: 'Troca de tela',
        title: 'Tela nova, acabamento cuidadoso.',
        body: 'Peças de qualidade e montagem feita com calma.',
      },
      {
        id: 'placa',
        eyebrow: 'Reparo de placa',
        title: 'Até o que parecia perdido.',
        body: 'Diagnóstico técnico para os problemas mais complexos.',
      },
      {
        id: 'na-hora',
        eyebrow: 'Conserto na hora',
        title: 'Você não fica sem celular.',
        // TODO: listar quais reparos saem na hora (hoje o texto diz "reparos selecionados").
        body: 'Em reparos selecionados, o aparelho fica pronto na hora.',
      },
    ],
    // TODO: detalhar prazo/condições da garantia de serviço.
    seals: ['Serviço com garantia', 'Equipe especializada', 'Peças de qualidade', 'Agilidade no atendimento'],
    cta: 'Pedir orçamento grátis',
    whatsappMessage: 'Olá! Quero um orçamento para o meu celular.',
  },

  categories: {
    eyebrow: 'Categorias',
    title: 'Tudo para o seu celular. E um pouco mais.',
    items: [
      {
        id: 'apple',
        title: 'Apple',
        subtitle: 'iPhone, iPad, Watch e AirPods',
        items: 'iPhone, iPad, Apple Watch e AirPods',
        media: { kind: 'photo', name: 'apple-hands', alt: 'iPhone 17 Pro Max nas mãos de uma cliente', position: '50% 45%' },
        whatsappMessage: 'Olá! Quero ver os modelos Apple disponíveis.',
        size: 'hero',
      },
      {
        id: 'xiaomi',
        title: 'Xiaomi e Realme',
        subtitle: 'Redmi, POCO e Realme',
        items: 'Redmi, POCO e Realme',
        media: {
          kind: 'photo',
          name: 'redmi-note-15-pro',
          alt: 'Caixa do Redmi Note 15 Pro+ na mão de um atendente da VK Store',
          position: '40% 40%',
        },
        whatsappMessage: 'Olá! Quero ver os modelos Xiaomi e Realme disponíveis.',
        size: 'tall',
      },
      {
        id: 'som',
        title: 'Som',
        subtitle: 'JBL e FAM',
        items: 'Boombox 4, Storm 120W e fones',
        media: { kind: 'photo', name: 'fam-storm', alt: 'Casal apresentando a caixa de som FAM Storm' },
        whatsappMessage: 'Olá! Quero ver as caixas de som JBL e FAM disponíveis.',
        size: 'square',
      },
      {
        id: 'starlink',
        title: 'Starlink',
        subtitle: 'Internet onde precisar',
        items: 'Kits Starlink',
        media: { kind: 'photo', name: 'starlink', alt: 'Entrega de kit Starlink para cliente da VK Store', position: '50% 55%' },
        whatsappMessage: 'Olá! Quero saber mais sobre os kits Starlink.',
        size: 'square',
      },
      {
        id: 'acessorios',
        title: 'Acessórios',
        subtitle: 'Do fone à capinha',
        items: 'Capinhas, películas, power banks, carregadores, fones e mais',
        media: {
          kind: 'photo',
          name: 'capinhas',
          alt: 'Cliente mostrando o celular com capinha em frente à parede de capinhas da VK Store',
          position: '50% 30%',
        },
        whatsappMessage: 'Olá! Quero ver os acessórios disponíveis.',
        size: 'half',
      },
      {
        id: 'copos',
        title: 'Copos e garrafas',
        subtitle: 'Térmicos, para o dia todo',
        items: 'Copos e garrafas térmicas',
        media: {
          kind: 'photo',
          name: 'copos-termicos',
          alt: 'Cliente com copos térmicos Stanley na VK Store',
          position: '50% 40%',
        },
        whatsappMessage: 'Olá! Quero ver os copos e garrafas térmicas disponíveis.',
        size: 'half',
      },
    ],
    also: {
      title: 'Também tem Motorola e Samsung.',
      body: 'E ainda: baterias, estabilizador com LED, mini câmera, espelho camarim e projetor sem fio.',
    },
  },

  why: {
    eyebrow: 'Por que a VK',
    lines: [
      'Novos e seminovos.',
      'Pronta entrega.',
      'Seu usado entra no pagamento.',
      'Orçamento grátis na assistência.',
      'Conserto na hora.',
      'Gente de perto, aqui em Padre Bernardo.',
    ],
    // Fotos reais de clientes na loja (as mesmas já publicadas no site anterior).
    gallery: {
      eyebrow: 'Clientes VK',
      photos: [
        {
          caption: 'iPhone 17 Pro',
          media: { kind: 'photo', name: 'cliente-iphone', alt: 'Cliente sorrindo com caixas de iPhone 17 Pro na loja da VK Store' },
        },
        {
          caption: 'JBL Boombox 4',
          media: { kind: 'photo', name: 'boombox-reinaldo', alt: 'Cliente fazendo joinha ao lado de uma JBL Boombox 4 na VK Store' },
        },
        {
          caption: 'Fone sem fio',
          media: { kind: 'photo', name: 'kaidi', alt: 'Cliente mostrando fone sem fio em frente ao espelho iluminado', position: '50% 60%' },
        },
        {
          caption: 'JBL Boombox 4',
          media: { kind: 'photo', name: 'boombox-aline', alt: 'Atendente e cliente com a caixa da JBL Boombox 4 na VK Store', position: '50% 35%' },
        },
        {
          caption: 'Celular novo',
          media: { kind: 'photo', name: 'cliente-celular', alt: 'Cliente com o celular novo ao lado de um atendente da VK Store', position: '50% 40%' },
        },
        {
          caption: 'JBL Boombox 4',
          media: { kind: 'photo', name: 'boombox-4', alt: 'Cliente abraçada a uma JBL Boombox 4 entre as caixas na VK Store', position: '55% 55%' },
        },
        {
          caption: 'Caixa de som FAM',
          media: { kind: 'photo', name: 'cliente-fam', alt: 'Cliente segurando a caixa de som FAM na VK Store', position: '50% 35%' },
        },
        {
          caption: 'iPhone novo',
          media: { kind: 'photo', name: 'cliente-iphone-2', alt: 'Cliente com o iPhone novo e a sacola da VK Store ao lado de um atendente' },
        },
      ],
    },
  },

  testimonials: {
    eyebrow: 'Quem já veio',
    title: 'Cliente satisfeito volta sempre.',
    // TODO: preencher com depoimentos reais autorizados (destaques "Feedbacks" e "Clientes" do Instagram)
    // e depois mudar flags.showTestimonials para true.
    items: [],
  },

  visit: {
    eyebrow: 'Onde estamos',
    title: 'Passa aqui na loja.',
    media: { kind: 'photo', name: 'loja-clientes', alt: 'Clientes na loja da VK Store com o letreiro VK ao fundo', position: '50% 40%' },
  },

  finalCta: {
    title: ['Vem pra VK.', 'Vem pra melhor.'],
    subtitle: 'Compra, troca ou conserto: é só chamar.',
    cta: 'Chamar no WhatsApp',
    whatsappMessage: 'Olá, vim pelo site da VK Store e quero atendimento.',
  },

  footer: {
    watermark: 'By Arthur',
  },
};
