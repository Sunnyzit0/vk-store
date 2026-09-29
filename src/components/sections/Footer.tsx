import { content } from '../../data/content';
import { mapsLinks, whatsappLink } from '../../lib/links';
import { Instagram, WhatsApp } from '../ui/icons';
import { container } from '../ui/Section';

const { brand, contact, location, nav, service, footer } = content;

const linkClass = 'inline-block py-1 text-ink-2 transition-colors hover:text-ink hover:underline hover:underline-offset-2';

export function Footer() {
  const columns = [
    {
      title: 'Explore',
      links: nav.map((n) => ({ label: n.label, href: n.href, external: false })),
    },
    {
      title: 'Atendimento',
      links: [
        { label: 'Falar no WhatsApp', href: whatsappLink(), external: true },
        { label: service.cta, href: whatsappLink(service.whatsappMessage), external: true },
        { label: 'Como chegar', href: mapsLinks.directions, external: true },
      ],
    },
    {
      title: 'Redes',
      links: [
        { label: `Instagram ${contact.instagram.handle}`, href: contact.instagram.url, external: true },
        { label: `Threads ${contact.threads.handle}`, href: contact.threads.url, external: true },
      ],
    },
  ];

  return (
    <footer className="on-light bg-mist text-[0.8125rem] leading-relaxed">
      <div className={`${container} py-12 md:py-16`}>
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-96.webp" alt="" width={36} height={36} loading="lazy" className="size-9 rounded-[10px]" />
            <div>
              <p className="text-[0.9375rem] font-semibold text-ink">{brand.name}</p>
              <p className="text-ink-2">{brand.slogan}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da VK Store"
              className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-ink hover:text-white"
            >
              <WhatsApp className="size-[18px]" />
            </a>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da VK Store"
              className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-ink hover:text-white"
            >
              <Instagram className="size-[18px]" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-9 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-semibold text-ink">{col.title}</p>
              <ul className="mt-2 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="font-semibold text-ink">Visite</p>
            <address className="mt-3 not-italic text-ink-2">
              {location.street && (
                <>
                  {location.street}
                  <br />
                </>
              )}
              {location.city} - {location.state}
              <br />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {contact.whatsappDisplay}
              </a>
            </address>
            <ul className="mt-3 space-y-0.5 text-ink-2">
              {location.hours.map((h) => (
                <li key={h.label}>
                  {h.label}: {h.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="border-t border-black/10 pt-6 text-center text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ink-2 select-none">
          {footer.watermark}
        </p>
      </div>
    </footer>
  );
}
