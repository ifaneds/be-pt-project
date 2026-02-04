'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface TeamMember {
  name: string
  role: string
  email?: string
}

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      className="team-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <h3 className="team-card-name">{member.name}</h3>
      <p className="team-card-role">{member.role}</p>
      {member.email && (
        <Link href={`mailto:${member.email}`} className="team-card-email">
          {member.email}
        </Link>
      )}
    </motion.div>
  )
}
