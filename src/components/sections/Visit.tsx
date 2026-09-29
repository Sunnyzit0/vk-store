import { content } from '../../data/content';
import { mapsLinks, whatsappLink } from '../../lib/links';
import { Button, TextLink } from '../ui/Button';
import { MapPin } from '../ui/icons';
import { MediaView } from '../ui/Media';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, container } from '../ui/Section';

const { visit, location, contact, brand } = content;

export function Visit() {
  return (
    <section id="loja" aria-labelledby="loja-title" className="on-light bg-canvas py-24 md:py-36">
      <div className={container}>
        <SectionHeading id="loja-title" eyebrow={visit.eyebrow} title={visit.title} />

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
          <Reveal className="overflow-hidden rounded-card md:col-span-7 md:row-span-2">
            <div className="aspect-[4/3] h-full md:aspect-auto">
              <MediaView media={visit.media} sizes="(max-width: 768px) 100vw, 640px" />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-card bg-white p-7 shadow-soft md:col-span-5 md:p-9">
            <p className="text-[0.8125rem] font-semibold text-ink-2">Endereço</p>
            <p className="mt-1.5 text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {location.street ?? brand.name}
              <br />
              <span className="text-ink-2">
                {location.city} - {location.state}
              </span>
            </p>

            <p className="mt-7 text-[0.8125rem] font-semibold text-ink-2">Horário</p>
            <dl className="mt-2 divide-y divide-black/[0.06]">
              {location.hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 py-2.5 text-[0.9375rem]">
                  <dt className="text-ink-2">{h.label}</dt>
                  <dd className="font-medium tabular-nums text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={mapsLinks.directions} external variant="dark" icon={<MapPin className="size-4" />}>
                Como chegar
              </Button>
              <TextLink href={whatsappLink()} external className="text-[0.9375rem] text-vk-deep">
                {contact.whatsappDisplay}
              </TextLink>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-5">
            <a
              href={mapsLinks.open}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir a localização da VK Store no Google Maps"
              className="group relative block aspect-[4/3] overflow-hidden rounded-card bg-[#e8e8ed] md:aspect-auto md:h-full md:min-h-[240px]"
            >
              <iframe
                src={mapsLinks.embed}
                title="Mapa com a localização da VK Store"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[0.9] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
              />
              <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full bg-vk/60 motion-reduce:animate-none" />
                <span className="relative block size-4 rounded-full border-[3px] border-white bg-vk-deep shadow-lg" />
              </span>
              <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink shadow-sm">
                Abrir no Google Maps
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
