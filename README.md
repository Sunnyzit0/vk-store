# VK Store

Protótipo de landing page premium para a VK Store, loja de celulares e assistência técnica em Padre Bernardo-GO.

## Executar

Abra `index.html` no navegador. O projeto é estático, mobile-first e não exige build ou dependências locais.

## Antes da publicação (pendências que dependem do cliente)

- Confirmar o endereço da loja e inserir o iframe/link real do Google Maps (estrutura já comentada em `index.html`, seção `#sobre`).
- Confirmar o horário de funcionamento aos domingos.
- Inserir preços, condições e formas de pagamento aceitas.
- Confirmar a campanha ativa do mês (seção `#promocoes`).
- Substituir os depoimentos e as duas fotos placeholder de clientes em `#clientes` por conteúdo real autorizado pelo cliente (Instagram tem material nos destaques "Feedbacks" e "Clientes").
- Confirmar se a nota 5.0 exibida no hero e em `#clientes` reflete uma avaliação real (Google/Instagram) antes de publicar.
- Trocar as fotos duplicadas: iPhone 17 Pro Max (hero + card de produto), Redmi Note 15 (card de categoria + card de produto), Starlink (card de categoria + depoimento) — os pontos estão marcados com `<!-- TODO -->` em `index.html`.
- Adicionar CNPJ e razão social no rodapé.
- Confirmar o domínio definitivo do site e atualizar as tags `og:url` / `og:image` em `index.html` para a URL absoluta publicada.

## Notas técnicas

- Todas as imagens usadas no site foram convertidas para WebP (ver `assets/img/`); os arquivos JPG/PNG originais foram mantidos fora do HTML/CSS apenas como fonte em alta resolução.
- Ícones via Lucide, carregado de CDN com versão fixa (não `@latest`), com fallback SVG inline no botão de menu caso o CDN falhe.
