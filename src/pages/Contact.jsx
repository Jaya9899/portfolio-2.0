import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import contactLinks from '../data/contactLinks.js';
import './Contact.css';

export default function Contact() {
  return (
    <WindowFrame path="C:\jaya\contact.hlp" labelledBy="contact-heading">
      <PageHeader
        icon="contact"
        id="contact-heading"
        title="Contact"
        subtitle="Leave a message, or reach me wherever is easiest."
      />

      <div className="contact">
        <ContactForm />

        <div className="contact__direct">
          <h2>Or reach me directly</h2>
          <ul className="contact__list">
            {contactLinks.map((link) => (
              <li key={link.key}>
                <span className="contact__key">{link.key}</span>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
