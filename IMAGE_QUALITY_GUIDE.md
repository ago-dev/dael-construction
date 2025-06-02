# Sanity Image Quality Guide

## Problem
When uploading PNG images to Sanity, they were being automatically converted to WebP format and losing resolution due to Sanity's default optimization settings.

## Solution
We've implemented several utility functions in `src/lib/sanity.client.ts` to preserve image quality and format:

### Available Functions

#### 1. `urlForHighQuality(source)`
- **Purpose**: Preserves PNG format with maximum quality (100%)
- **Best for**: Featured images, gallery images where quality is critical
- **Usage**:
```tsx
import { urlForHighQuality } from '@/lib/sanity.client';

// In your component
<Image 
  src={urlForHighQuality(project.featuredImage).width(800).height(600).url()}
  alt="High quality image"
  width={800}
  height={600}
/>
```

#### 2. `urlForOriginal(source)`
- **Purpose**: Preserves original format with maximum quality
- **Best for**: When you want to keep the exact format uploaded
- **Usage**:
```tsx
import { urlForOriginal } from '@/lib/sanity.client';

const imageUrl = urlForOriginal(source).width(1200).url();
```

#### 3. `urlForCustom(source, format, quality)`
- **Purpose**: Full control over format and quality
- **Parameters**:
  - `format`: 'png' | 'jpg' | 'webp' (default: 'png')
  - `quality`: 1-100 (default: 100)
- **Usage**:
```tsx
import { urlForCustom } from '@/lib/sanity.client';

// PNG with 90% quality
const pngUrl = urlForCustom(source, 'png', 90).width(800).url();

// High-quality JPEG
const jpgUrl = urlForCustom(source, 'jpg', 95).width(800).url();
```

#### 4. `urlForResponsive(source, width, height?)`
- **Purpose**: High-quality responsive images
- **Best for**: Responsive layouts with automatic format optimization
- **Usage**:
```tsx
import { urlForResponsive } from '@/lib/sanity.client';

const responsiveUrl = urlForResponsive(source, 800, 600).url();
```

### Image Configuration
Use the predefined sizes from `src/lib/image-config.ts`:

```tsx
import { IMAGE_CONFIG, getImageSize } from '@/lib/image-config';

// Get predefined sizes
const featuredSize = getImageSize('featured', 'desktop'); // {width: 800, height: 600}
const gallerySize = getImageSize('gallery', 'thumbnail'); // {width: 312, height: 384}
```

### Current Implementation

The following files have been updated to use high-quality PNG images:

1. **Project Gallery** (`src/app/projects/[slug]/page.tsx`)
   - Gallery images: 1200x800 PNG at 100% quality
   - Featured images: 1200x800 PNG at 100% quality

2. **Projects Listing** (`src/app/projects/page.tsx`)
   - Featured images: 528x384 PNG at 100% quality

3. **Projects Section** (`src/components/ProjectsSection/ProjectsSection.tsx`)
   - Thumbnail images: 528x384 PNG at 100% quality

### Best Practices

#### For Different Use Cases:

1. **Hero Images / Featured Images**:
   ```tsx
   urlForHighQuality(image).width(1200).height(800).url()
   ```

2. **Thumbnails**:
   ```tsx
   urlForHighQuality(image).width(400).height(300).url()
   ```

3. **Full Gallery Images**:
   ```tsx
   urlForOriginal(image).width(1920).height(1080).url()
   ```

4. **When File Size Matters**:
   ```tsx
   urlForCustom(image, 'png', 85).width(800).url()
   ```

### Performance Considerations

- **PNG files are larger** than WebP, so use them strategically
- For images where quality is critical (architecture photos, detailed project images), use PNG
- For decorative images or icons, WebP might be acceptable
- Always specify dimensions to enable proper optimization

### Testing
To verify your images are now using PNG format:
1. Open browser developer tools
2. Go to Network tab
3. Reload the page
4. Check the image requests - URLs should include `&fm=png&q=100`

### Troubleshooting

If images still appear as WebP:
1. Clear browser cache
2. Check that you're using the updated functions
3. Verify the image URL includes `fm=png` parameter
4. Ensure you're importing from the correct path

### Migration Checklist

- [x] Updated `src/lib/sanity.client.ts` with new functions
- [x] Updated `src/app/projects/[slug]/page.tsx`
- [x] Updated `src/app/projects/page.tsx`
- [x] Updated `src/components/ProjectsSection/ProjectsSection.tsx`
- [x] Created `src/lib/image-config.ts` for centralized configuration
- [x] Updated `sanity.config.ts` for better upload handling

### Next Steps

Consider updating other components that use Sanity images:
- Header components
- About page images
- Any other image galleries

Remember: Always balance image quality with performance based on your specific use case. 