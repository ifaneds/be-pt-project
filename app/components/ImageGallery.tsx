'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type GalleryImage = {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  // Pad to even count so we always have a 2x2-style grid (2 cols)
  const placeholder: GalleryImage & { placeholder: true } = {
    src: '',
    alt: '',
    placeholder: true,
  }
  const padded: (GalleryImage & { placeholder?: true })[] =
    images.length === 0
      ? []
      : images.length % 2 === 0
        ? images
        : [...images, placeholder]

  return (
    <div className="image-gallery">
      {padded.map((image, index) =>
        'placeholder' in image && image.placeholder ? (
          <div key={`placeholder-${index}`} className="image-gallery-item" aria-hidden />
        ) : (
          <motion.div
            key={image.src || index}
            className="image-gallery-item"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="image-gallery-image"
            />
            {image.caption && (
              <p className="image-gallery-caption">{image.caption}</p>
            )}
          </motion.div>
        )
      )}
    </div>
  )
}
