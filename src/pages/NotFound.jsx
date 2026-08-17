import { Link, useLocation } from 'react-router-dom';

import './NotFound.css';

/* The path="*" catch-all. Styled as a Win95 modal error rather than a page,
   because that is what the rest of the site would do about a bad filename. */
export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="notfound" aria-labelledby="notfound-heading">
      <p className="notfound__bar">
        <span className="notfound__title">Error</span>
        <span className="notfound__buttons" aria-hidden="true">&times;</span>
      </p>

      <div className="notfound__body">
        <span className="notfound__icon" aria-hidden="true">&times;</span>

        <div className="notfound__text">
          <h1 id="notfound-heading">404: file not found</h1>
          <p>
            Cannot find <code className="notfound__path">{pathname}</code>. Check the
            spelling, or head back to the desktop.
          </p>

          <p className="notfound__actions">
            <Link className="button" to="/">Back to Home</Link>
            <Link className="button" to="/projects">See Projects</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
