import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import navLinks from '../data/navLinks.js';
import contactLinks from '../data/contactLinks.js';
import './Footer.css';

function formatClock(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Footer({ isMobile }) {
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClock(formatClock(new Date()));
    }, 30_000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <nav className="site-footer__nav" aria-label="Footer">
          <ul className="site-footer__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="site-footer__links site-footer__links--elsewhere">
          {contactLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.short}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer__status">
        {/* `<` has to be escaped in JSX text, otherwise it starts a tag. */}
        <p className="site-footer__note">
          Jayalakshmi Venkatesan. Third Year NITW CSE, made this website with love &lt;3
        </p>

        {/* Dropped on narrow screens, where the note needs the whole strip.
            This is why isMobile is lifted to Layout. */}
        {!isMobile && (
          <p className="site-footer__clock">
            <time>{clock}</time>
          </p>
        )}
      </div>
    </footer>
  );
}
