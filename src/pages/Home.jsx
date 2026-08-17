import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader.jsx';
import ShortcutIcon from '../components/ShortcutIcon.jsx';
import './Home.css';

/* The five desktop shortcuts. Each one now points at a route rather than an
   in-page anchor, which is the whole difference between Assignment 1's single
   scrolling document and this one. */
const shortcuts = [
  { to: '/about',    file: 'about.txt',    icon: 'about',    label: 'Who I am' },
  { to: '/projects', file: 'projects.exe', icon: 'projects', label: "What I've built" },
  { to: '/skills',   file: 'skills.ini',   icon: 'skills',   label: 'What I use' },
  { to: '/beyond',   file: 'beyond.mp3',   icon: 'beyond',   label: 'Extra Curriculars' },
  { to: '/contact',  file: 'contact.hlp',  icon: 'contact',  label: 'Say hii' },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  /* Effect 9: the start-up sequence.
     Empty dependency array, so it runs once when Home mounts. There is no
     data to fetch here; the delay stands in for the boot the desktop metaphor
     implies. CLEANUP: clearTimeout, so navigating away inside the first
     second cannot fire setIsLoading on an unmounted component. */
  useEffect(() => {
    const timerId = window.setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  if (isLoading) {
    return <Loader label="Starting C:\jaya, please wait…" />;
  }

  return (
    <section className="desktop" aria-labelledby="intro-heading">
      <p className="desktop__eyebrow">Computer Science, NIT Warangal</p>
      <h1 id="intro-heading" className="desktop__title">hello world!</h1>
      <p className="desktop__name">Jayalakshmi Venkatesan</p>

      <nav className="desktop__nav" aria-label="Open a section">
        <ul className="desktop__grid">
          {shortcuts.map((shortcut, index) => (
            <li
              key={shortcut.to}
              className={`shortcut shortcut--${index + 1}`}
            >
              <Link to={shortcut.to}>
                <span className="shortcut__bar">
                  <span className="shortcut__file">{shortcut.file}</span>
                  <span className="shortcut__buttons" aria-hidden="true">_ &#9633; &times;</span>
                </span>
                <span className="shortcut__body">
                  <ShortcutIcon name={shortcut.icon} />
                  <span className="shortcut__label">{shortcut.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
