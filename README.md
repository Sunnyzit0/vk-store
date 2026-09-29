# VK Store — site 2.0

Site da VK Store (celulares, acessórios e assistência técnica em Padre Bernardo - GO).

**Stack:** Vite + React + TypeScript, Tailwind CSS v4, Motion (Framer Motion). O HTML é pré-renderizado no build (SEO e carregamento rápido) e hidratado no navegador.

## Rodar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera dist/ (pré-renderizado)
npm run preview   # serve o dist/ em http://localhost:4173
```

## Onde mexer

| O quê | Onde |
| --- | --- |
| **Todo texto, produto, contato, horário** | `src/data/content.ts` (único arquivo de conteúdo) |
| Mostrar depoimentos | `content.flags.showTestimonials` + preencher `content.testimonials.items` |
| Seções da página | `src/components/sections/` |
| Cores, tipografia, raios | tokens em `src/styles/index.css` (`@theme`) |
| Fotos | ver abaixo |

## Fotos

1. Coloque o original (JPG/PNG, quanto maior melhor) em `media-src/` com nome em minúsculas e hífens, ex.: `xiaomi-realme.jpg`.
2. Rode `npm run images` — gera AVIF/WebP em vários tamanhos em `public/img/` e atualiza `src/data/images.gen.ts`.
3. No `content.ts`, troque o `media` do item para `{ kind: 'photo', name: 'xiaomi-realme', alt: '...' }`.

Onde ainda não há foto, o site mostra um placeholder (gradiente + silhueta de aparelho) com o nome de arquivo sugerido.

## Pendências de conteúdo

Estão marcadas com `TODO:` em `src/data/content.ts` (endereço, domingo, preços, garantia, reparos na hora, depoimentos, CNPJ, domínio).
