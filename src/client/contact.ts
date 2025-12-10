// Client-side TypeScript for the contact page
console.log('Contact page loaded!');

interface FormData {
  name: string;
  email: string;
  message: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm') as HTMLFormElement;
  
  if (form) {
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      
      const formData: FormData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLTextAreaElement).value,
      };
      
      console.log('Form submitted:', formData);
      alert(`Thank you, ${formData.name}! Your message has been received.`);
      form.reset();
    });
  }
});

