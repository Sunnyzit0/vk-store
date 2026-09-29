import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { content } from './data/content';
import { imageManifest } from './data/images.gen';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

/** Dados estruturados (schema.org) a partir do content.ts. */
export function structuredData() {
  const { brand, site, contact, location } = content;
  return {
    '@context': 'https://schema.org',
    '@type': 'MobilePhoneStore',
    name: brand.name,
    description: site.description,
    url: site.url,
    image: new URL('/og-image.jpg', site.url).href,
    logo: new URL('/apple-touch-icon.png', site.url).href,
    telephone: `+${contact.whatsappNumber}`,
    address: {
      '@type': 'PostalAddress',
      ...(location.street ? { streetAddress: location.street } : {}),
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.geo.lat, longitude: location.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${location.geo.lat},${location.geo.lng}`,
    openingHoursSpecification: location.hours
      .filter((h) => h.opens && h.closes && h.days)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    sameAs: [contact.instagram.url, contact.threads.url],
    areaServed: `${location.city} - ${location.state}`,
  };
}

export const meta = content.site;
export const heroWidths = content.hero.media.kind === 'photo' ? imageManifest[content.hero.media.name].widths : [];
