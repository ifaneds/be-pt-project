import ContactForm from '../components/ContactForm'
import Image from 'next/image'

export default function Contact() {
  return (
    <main>
      <section className="contact-section">
        <div className="contact-container">
          <div className="image-gallery" style={{ marginBottom: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div className="image-gallery-item">
              <Image
                src="/20251226_115307.jpg"
                alt="Training environment"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
            <div className="image-gallery-item">
              <Image
                src="/IMG-20250408-WA0014.jpg"
                alt="Coaching"
                width={800}
                height={600}
                className="image-gallery-image"
              />
            </div>
          </div>
          <ContactForm
            title="Contact"
            description="Have questions or want to learn more about my coaching? Feel free to reach out via the form or email below. I'm happy to help."
            email="bleddyn@be-training.co.uk"
          />
        </div>
      </section>
    </main>
  )
}
