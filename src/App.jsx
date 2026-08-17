import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Skills from './pages/Skills.jsx';
import Beyond from './pages/Beyond.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

const THEME_KEY = 'jaya-portfolio-theme';

/* Read the saved theme once, before the first paint.
   This runs as a lazy useState initialiser rather than inside an effect on
   purpose: an effect runs *after* the first render, so the page would paint in
   light mode and then flip to dark, which is a visible flash. Restoring the
   value during initialisation means the very first paint is already correct.
   Falls back to the OS preference, then to light. */
function readStoredTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // localStorage can throw in private-browsing modes; the OS default is fine.
  }

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
}

export default function App() {
  /* Theme lives here, at the top of the tree. The Taskbar is what toggles it
     but every routed page is painted by it, so this is the lowest component
     that is a common ancestor of both. It travels down to the Taskbar as
     props through Layout. */
  const [theme, setTheme] = useState(readStoredTheme);

  /* Effect 1: persist the theme and apply it to the document.
     Runs whenever `theme` changes: writes to localStorage so the choice
     survives a reload, and stamps data-theme on <html> so global.css can swap
     its token block. Nothing to clean up, since no listener or timer is created. */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage unavailable, but the toggle still works for this session.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  return (
    <Routes>
      {/* Shared layout: Taskbar + Footer stay mounted, only the Outlet swaps. */}
      <Route element={<Layout theme={theme} onToggleTheme={toggleTheme} />}>
        <Route index element={<Home />} />
        {/* /home is accepted as an alias so the URL in the brief resolves. */}
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="beyond" element={<Beyond />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
