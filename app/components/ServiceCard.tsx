'use client'

import { motion } from 'framer-motion'
import { RiTimeLine, RiUserLine, RiMapPinLine, RiBookLine } from 'react-icons/ri'

interface ServiceDetail {
  icon: 'time' | 'trainer' | 'location' | 'lesson'
  label: string
  value: string
}

interface ServiceCardProps {
  title: string
  subtitle?: string
  details: ServiceDetail[]
  description: string
  href: string
  index: number
}

export default function ServiceCard({ title, subtitle, details, description, href, index }: ServiceCardProps) {
  const iconMap = {
    time: RiTimeLine,
    trainer: RiUserLine,
    location: RiMapPinLine,
    lesson: RiBookLine,
  }

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="service-card-header">
        <h3 className="service-card-title">{title}</h3>
        {subtitle && <p className="service-card-subtitle">{subtitle}</p>}
      </div>

      <div className="service-card-details">
        {details.map((detail, i) => {
          const Icon = iconMap[detail.icon]
          return (
            <div key={i} className="service-detail">
              <Icon className="service-detail-icon" />
              <div className="service-detail-content">
                <span className="service-detail-label">{detail.label}</span>
                <span className="service-detail-value">{detail.value}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="service-card-description">
        <p>{description}</p>
      </div>

      <a href={href} className="service-card-link">
        Learn more
      </a>
    </motion.div>
  )
}
