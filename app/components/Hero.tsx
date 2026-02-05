'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroProps {
  title: string
  tagline: string
  stats: {
    value: string
    label: string
  }[]
  ctaPrimary: {
    label: string
    href: string
  }
  ctaSecondary: {
    label: string
    href: string
  }
}

export default function Hero({ title, tagline, stats, ctaPrimary, ctaSecondary }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="hero-title">{title}</h1>
          <p className="hero-tagline">{tagline}</p>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <Link href={ctaPrimary.href} className="hero-btn hero-btn-primary">
            {ctaPrimary.label}
          </Link>
          <Link href={ctaSecondary.href} className="hero-btn hero-btn-secondary">
            {ctaSecondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
