import type { Media as MediaData } from '../../data/content';
import { imageManifest, type ImageName } from '../../data/images.gen';

interface PictureProps {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
}

const srcSet = (name: ImageName, format: 'avif' | 'webp') =>
  imageManifest[name].widths.map((w) => `/img/${name}-${w}.${format} ${w}w`).join(', ');

export function Picture({ name, alt, sizes, className = '', position, priority }: PictureProps) {
  const { width, height, widths } = imageManifest[name];
  const fallback = widths.find((w) => w >= 828) ?? widths[widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, 'webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${className}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}

const tones = {
  green: 'from-[#0b2a10] via-[#0f3d16] to-[#051207]',
  graphite: 'from-[#2a2a2d] via-[#1d1d1f] to-[#0c0c0d]',
  silver: 'from-[#e8e8ed] via-[#f5f5f7] to-[#d2d2d7]',
};

/** Foto real ou placeholder (gradiente + forma de aparelho) com o nome de arquivo sugerido. */
export function MediaView({ media, sizes, className = '', priority }: { media: MediaData; sizes: string; className?: string; priority?: boolean }) {
  if (media.kind === 'photo') {
    return <Picture name={media.name} alt={media.alt} sizes={sizes} position={media.position} className={className} priority={priority} />;
  }
  const dark = media.tone !== 'silver';
  return (
    <div role="img" aria-label={media.alt} className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${tones[media.tone]} ${className}`}>
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 aspect-[9/19] w-[34%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[22%/10%] border ${
          dark ? 'border-white/15 bg-white/[0.04] shadow-[0_0_80px_-10px_rgba(95,224,58,0.35)]' : 'border-black/10 bg-white/60'
        }`}
      />
      <span
        aria-hidden
        className={`absolute bottom-6 left-5 whitespace-nowrap md:left-7 md:bottom-8 font-mono text-[10px] tracking-normal ${dark ? 'text-white/35' : 'text-black/35'}`}
      >
        {media.suggestedFile.split('/').pop()}
      </span>
    </div>
  );
}
