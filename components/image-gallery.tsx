'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export function ImageGallery({ images, alt = 'Product image' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No images</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[selectedIndex]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                selectedIndex === index ? 'border-primary' : 'border-muted hover:border-muted-foreground'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
