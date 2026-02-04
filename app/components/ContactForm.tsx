'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormProps {
  title: string
  description: string
  email?: string
}

export default function ContactForm({ title, description, email }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="contact-form-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3 className="contact-form-success-title">Thank you!</h3>
        <p className="contact-form-success-text">Your message has been sent. I'll get back to you as soon as possible.</p>
      </motion.div>
    )
  }

  return (
    <div className="contact-form-container">
      <div className="contact-form-intro">
        <h2 className="contact-form-title">{title}</h2>
        <p className="contact-form-description">{description}</p>
        {email && (
          <a href={`mailto:${email}`} className="contact-form-email">
            {email}
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form-row">
          <div className="contact-form-group">
            <label htmlFor="firstName" className="contact-form-label">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="lastName" className="contact-form-label">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
        </div>

        <div className="contact-form-group">
          <label htmlFor="email" className="contact-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="contact-form-input"
            required
          />
        </div>

        <div className="contact-form-group">
          <label htmlFor="message" className="contact-form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            className="contact-form-textarea"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="contact-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  )
}
