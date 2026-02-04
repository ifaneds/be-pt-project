
'use client'

import Hero from './components/Hero'
import LoopgroepCard from './components/LoopgroepCard'
import FAQ from './components/FAQ'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const heroStats = [
    { value: '150+', label: 'Clients Transformed' },
    { value: '10+', label: 'Years Experience' },
    { value: '100%', label: 'Personal Approach' },
    { value: '2014', label: 'Founded' },
  ]

  const phrases = ['happy', 'confident', 'strong']

  const loopgroepen = [
    {
      title: '1:1 Coaching',
      description: 'Personalised training programmes tailored to your goals, schedule and abilities.',
      href: '/contact',
    },
    {
      title: 'Online Programming',
      description: 'Structured training plans you can follow independently, with regular check-ins.',
      href: '/contact',
    },
    {
      title: 'Strength Training',
      description: 'Build foundational strength and confidence through progressive overload.',
      href: '/contact',
    },
    {
      title: 'Endurance Prep',
      description: 'Prepare for your next race or adventure event with periodised training.',
      href: '/contact',
    },
  ]

  const faqItems = [
    {
      question: 'What does a typical coaching session look like?',
      answer: 'Sessions are tailored to your goals but typically include movement preparation, main training blocks, and cool-down. We focus on quality over quantity and ensure you leave feeling more capable.',
    },
    {
      question: 'Do I need to be fit before we start?',
      answer: 'Absolutely not. I work with clients at all fitness levels. Every journey starts somewhere, and the best time to begin is when you are ready.',
    },
    {
      question: 'How often will we meet?',
      answer: 'Frequency depends on your goals and preferences. Some clients meet weekly, others fortnightly, and some prefer monthly check-ins with home programmes.',
    },
    {
      question: 'Can you help with nutrition?',
      answer: 'I provide general nutrition guidance as it relates to training and recovery. For specific dietary needs, I work with registered nutritionists who can support your journey.',
    },
  ]

  return (
    <main>
      <section className="hero-with-image">
        <div className="hero-with-image-content">
          <h1 className="hero-title">
            <Image
              src="/be-logo.svg"
              alt="be"
              width={48}
              height={48}
              className="hero-title-logo"
            />
            <span> your better self</span>
          </h1>
          <p className="hero-tagline">
            Personal training and coaching to help you build strength, confidence and sustainable fitness. Based in Wales, serving clients everywhere.
          </p>
          <div className="hero-phrases">
            {phrases.map((word, index) => (
              <motion.div
                key={index}
                className="hero-phrase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Image
                  src="/be-logo.svg"
                  alt="be"
                  width={24}
                  height={24}
                  className="hero-phrase-logo"
                />
                <span className="hero-phrase-text">be {word}</span>
              </motion.div>
            ))}
          </div>
          <div className="hero-cta" style={{ marginTop: '2rem' }}>
            <a href="/contact" className="hero-btn hero-btn-primary">Start Your Journey</a>
            <a href="/about" className="hero-btn hero-btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <Image
            src="/20231003_115122.jpg"
            alt="Training session"
            width={800}
            height={600}
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      <section className="loopgroep-section">
        <div className="loopgroep-container">
          <div className="loopgroep-header">
            <h2 className="loopgroep-title">What I Offer</h2>
          </div>
          <div className="loopgroep-grid">
            {loopgroepen.map((item, index) => (
              <LoopgroepCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="loopgroep-section" style={{ paddingTop: '2rem' }}>
        <div className="loopgroep-container">
          <div className="loopgroep-header">
            <h2 className="loopgroep-title">In action</h2>
          </div>
          <div className="image-gallery">
            <div className="image-gallery-item">
              <Image
                src="/IMG-20240612-WA0000.jpg"
                alt="Training outdoors"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/IMG-20240315-WA0016.jpg"
                alt="Coaching session"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/20250722_142925.jpg"
                alt="Training"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/20250720_145933.jpg"
                alt="Fitness and movement"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ
        title="Questions"
        subtitle="Frequently asked questions"
        cta={{ label: 'Ask a question', href: '/contact' }}
        items={faqItems}
      />
    </main>
  )
}

