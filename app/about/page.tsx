import Link from 'next/link'
import TeamMemberCard from '../components/TeamMemberCard'
import Image from 'next/image'

export default function About() {
  const teamMembers = [
    { name: 'Bleddyn Edwards', role: 'Founder & Personal Trainer', email: 'bleddyn@be-training.co.uk' },
  ]

  return (
    <main>
      <section className="hero-with-image">
        <div className="hero-with-image-content">
          <h1 className="hero-title">About me</h1>
          <p className="hero-tagline">
            Personal training and coaching to help you build strength, confidence and sustainable fitness.
          </p>
          <div className="hero-cta" style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="hero-btn hero-btn-primary">Get in Touch</Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <Image
            src="/portrait.jpeg"
            alt="Bleddyn Edwards - Founder & Personal Trainer"
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
            <h2 className="loopgroep-title">My Story</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--accent-color-3)' }}>
              I'm Bleddyn Edwards, founder of be — training and coaching, based in Wales, UK. I work as a personal trainer and coach, supporting people to build strength, confidence and sustainable fitness through clear, personalised coaching. My aim is to help people feel more capable in their bodies and better equipped to meet both everyday demands and more ambitious physical goals.
            </p>
          </div>
          <div className="image-gallery" style={{ marginTop: '2.5rem', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="image-gallery-item">
              <Image
                src="/IMG-20230821-WA0036.jpg"
                alt="Training"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/IMG-20250407-WA0005.jpg"
                alt="Coaching"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/20230607_110729.jpg"
                alt="Outdoor session"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Contact</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
