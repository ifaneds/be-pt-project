'use client'

import { motion } from 'framer-motion'

interface LoopgroepCardProps {
  title: string
  description: string
  href?: string
  index: number
}

export default function LoopgroepCard({ title, description, index }: LoopgroepCardProps) {
  return (
    <motion.div
      className="loopgroep-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <h3 className="loopgroep-card-title">{title}</h3>
      <p className="loopgroep-card-description">{description}</p>
    </motion.div>
  )
}
