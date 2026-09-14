import { useState } from 'react';
import { Camera, Compass } from 'lucide-react';

interface PhotoProps {
  src: string | null;
  alt: string;
  caption: string;
  variant: 'uniform' | 'civilian';
}

export function Photo({ src, alt, caption, variant }: PhotoProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const available = src && failedSource !== src;
  return (
    <figure className={`photo photo--${variant}`}>
      <div className="photo__tape" aria-hidden="true" />
      {available ? (
        <img src={src.startsWith('/') ? src : `${import.meta.env.BASE_URL}${src}`} alt={alt}
          loading={variant === 'uniform' ? 'eager' : 'lazy'} onError={() => setFailedSource(src)} />
      ) : (
        <div className="photo__placeholder" role="img" aria-label={`${alt} — התמונה טרם נוספה`}>
          <Compass className="photo__compass" size={92} strokeWidth={0.8} aria-hidden="true" />
          <Camera size={25} strokeWidth={1.4} aria-hidden="true" />
          <span>כאן תופיע התמונה שלך</span>
          <small>{variant === 'uniform' ? 'עוד רגע במדים' : 'בקרוב, על אזרחי'}</small>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
