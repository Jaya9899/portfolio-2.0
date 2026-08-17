import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Taskbar from './Taskbar.jsx';
import Footer from './Footer.jsx';
import navLinks from '../data/navLinks.js';
import { getProjectById } from '../data/projects.js';
import './Layout.css';

/* Matches the tablet breakpoint in the stylesheets. Kept in one place so the
   JS and the CSS cannot drift apart. */
const TABLET_BREAKPOINT = 768;

/* Works out the document title for a path, including the dynamic project
   route. Lives here rather than inside ProjectDetail because child effects run
   before parent effects, so if the page set its own title, this component's
   effect would immediately overwrite it. */
function titleForPath(pathname) {
  const match = navLinks.find((link) => link.to === pathname);
  if (match) {
    return match.title;
  }

  if (pathname.startsWith('/projects/')) {
    const project = getProjectById(pathname.split('/')[2]);
    return project ? project.title : 'File not found';
  }

  return 'File not found';
}

export default function Layout({ theme, onToggleTheme }) {
  const { pathname } = useLocation();

  /* isMobile is lifted to Layout because two siblings need it: the Taskbar
     collapses its links behind a Start-menu button, and the Footer drops its
     clock. It deliberately does not live in App, because no page reads it. */
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= TABLET_BREAKPOINT,
  );

  /* Effect 2: responsive navigation.
     Subscribes to window resize so the nav can switch between the full
     taskbar and the collapsed Start menu. CLEANUP: removes the listener on
     unmount, otherwise every mount would leave a dead handler holding a
     reference to this component's state setter. */
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= TABLET_BREAKPOINT);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // sync once in case the window changed before we mounted

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* Effect 3: reset scroll on navigation.
     A client-side route change keeps the scroll position, so moving from the
     bottom of Projects to Contact would otherwise land mid-page. */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* Effect 4: keep the browser tab label in step with the route, since
     react-router never touches document.title itself. */
  useEffect(() => {
    document.title = `${titleForPath(pathname)} | Jayalakshmi Venkatesan`;
  }, [pathname]);

  return (
    <div className="layout">
      <a className="skip-link" href="#main">Skip to main content</a>

      <Taskbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        isMobile={isMobile}
      />

      <main id="main" className="layout__main">
        {/* The routed page renders here; Taskbar and Footer never unmount. */}
        <Outlet />
      </main>

      <Footer isMobile={isMobile} />
    </div>
  );
}
