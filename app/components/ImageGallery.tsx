'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <motion.div
          key={image.src}
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
      ))}
    </div>
  )
}
