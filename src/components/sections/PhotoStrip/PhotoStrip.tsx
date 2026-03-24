/**
 * @file PhotoStrip.tsx
 * @description Image gallery section with optional heading and summary text.
 * @module src/components/sections/PhotoStrip
 */
import { ImageGallery } from '@/components/ui';

import type { IImageGalleryImage } from '@/components/ui/ImageGallery/ImageGallery';

export interface IPhotoStripProps {
  body?: string;
  images: readonly IImageGalleryImage[];
  title: string;
}

export const PhotoStrip = ({
  body,
  images,
  title,
}: IPhotoStripProps) => (
  <section className="space-y-5">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="font-body text-base text-muted">{body}</p>}
    </div>
    <ImageGallery images={images} />
  </section>
);
