import ContactForm from '../components/ContactForm'
import ImageGallery from '../components/ImageGallery'
import { publicPath } from '../lib/public'

export default function Contact() {
  return (
    <main>
      <section className="contact-section">
        <div className="contact-container">
          <div style={{ marginBottom: '2.5rem' }}>
            <ImageGallery
              images={[
                { src: publicPath('/20251226_115307.jpg'), alt: 'Training environment' },
                { src: publicPath('/IMG-20250408-WA0014.jpg'), alt: 'Coaching' },
              ]}
            />
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
