import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import navLinks from '../data/navLinks.js';
import './Taskbar.css';

export default function Taskbar({ theme, onToggleTheme, isMobile }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  /* Effect 5: Escape closes the Start menu.
     Only subscribed while the menu is actually open, so there is no global
     key handler running for the whole session. CLEANUP: removes the listener
     when the menu closes or the component unmounts; without it every open
     would stack another handler. */
  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  /* Effect 6: close the menu after navigating, and whenever the layout
     crosses the tablet breakpoint, so it can never be left open off-screen. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, isMobile]);

  // Label the toggle by what it will do, and show that same word, so the
  // accessible name contains the visible text.
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="taskbar">
      {isMobile ? (
        <button
          type="button"
          className="taskbar__start"
          aria-expanded={menuOpen}
          aria-controls="taskbar-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="taskbar__start-glyph" aria-hidden="true">▤</span>
          Start
        </button>
      ) : (
        <Link className="taskbar__start" to="/">Jaya</Link>
      )}

      <nav
        className={isMobile ? 'taskbar__nav taskbar__nav--menu' : 'taskbar__nav'}
        aria-label="Main"
        hidden={isMobile && !menuOpen}
      >
        <ul id="taskbar-menu" className="taskbar__list">
          {navLinks.map((link) => (
            <li key={link.to}>
              {/* NavLink adds aria-current="page" on the active route and
                  navigates without a full page reload. */}
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'taskbar__link taskbar__link--active' : 'taskbar__link'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="taskbar__theme"
        onClick={onToggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
      >
        <span className="taskbar__theme-glyph" aria-hidden="true">
          {theme === 'dark' ? '☀' : '☾'}
        </span>
        <span className="taskbar__theme-label">
          {nextTheme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </button>
    </header>
  );
}
