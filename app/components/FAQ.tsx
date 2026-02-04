'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowDownSLine } from 'react-icons/ri'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  subtitle: string
  cta: {
    label: string
    href: string
  }
  items: FAQItem[]
}

export default function FAQ({ title, subtitle, cta, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">{title}</h2>
          <p className="faq-subtitle">{subtitle}</p>
        </div>

        <div className="faq-list">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={false}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-question-text">{item.question}</span>
                <RiArrowDownSLine
                  className={`faq-icon ${openIndex === index ? 'open' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="faq-cta">
          <a href={cta.href} className="faq-cta-link">
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
