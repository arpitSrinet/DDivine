/**
 * @file ImageGallery.tsx
 * @description Horizontally scrollable image strip for gallery and photo-preview layouts.
 * @module src/components/ui/ImageGallery/ImageGallery
 */
export interface IImageGalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface IImageGalleryProps {
  images: readonly IImageGalleryImage[];
}

export const ImageGallery = ({ images }: IImageGalleryProps) => (
  <div
    aria-label="Image gallery"
    className="flex snap-x gap-4 overflow-x-auto pb-2"
    role="region"
  >
    {images.map((image) => (
      <img
        alt={image.alt}
        className="h-44 min-w-[16rem] snap-start rounded-2xl object-cover shadow-md"
        height={image.height}
        key={image.id}
        loading="lazy"
        src={image.src}
        width={image.width}
      />
    ))}
  </div>
);
