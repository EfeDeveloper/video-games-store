import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc,
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setError(true);
      setIsLoading(false);
      return;
    }

    let observer: IntersectionObserver;
    const currentImg = imgRef.current;

    if (currentImg && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;

              img.onload = () => {
                setImageSrc(src);
                setIsLoading(false);
              };

              img.onerror = () => {
                setError(true);
                setIsLoading(false);
              };

              observer.unobserve(currentImg);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(currentImg);
    } else {
      setImageSrc(src);
      setIsLoading(false);
    }

    return () => {
      if (observer && currentImg) {
        observer.unobserve(currentImg);
      }
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={
          imageSrc ||
          placeholderSrc ||
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%2327272A"/%3E%3C/svg%3E'
        }
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading || error ? 'opacity-50' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 animate-pulse">
          <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 text-gray-500">
          <svg
            className="mb-2 w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};
