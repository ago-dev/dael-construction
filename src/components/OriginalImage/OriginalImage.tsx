import React from 'react';
import { urlForOriginal, urlForHighQuality } from '@/lib/sanity.client';

interface OriginalImageProps {
  source: any;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  useOriginalSize?: boolean; // If true, doesn't resize the image at all
}

const OriginalImage: React.FC<OriginalImageProps> = ({
  source,
  alt,
  width,
  height,
  className,
  style,
  priority,
  useOriginalSize = false
}) => {
  // Generate the URL without Next.js optimization
  const getImageUrl = () => {
    if (useOriginalSize) {
      // Get the original image without any resizing
      return urlForOriginal(source).url();
    } else if (width && height) {
      // Resize but maintain maximum quality
      return urlForHighQuality(source).width(width).height(height).url();
    } else if (width) {
      // Only width specified
      return urlForHighQuality(source).width(width).url();
    } else {
      // No dimensions specified, use original
      return urlForOriginal(source).url();
    }
  };

  return (
    <img
      src={getImageUrl()}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default OriginalImage; 