import { Link } from 'react-router-dom';

import './ProjectCard.css';

/* One card in the /projects grid. Presentational only, it takes a project
   object and renders it, so /projects owns no per-card state. */
export default function ProjectCard({ project }) {
  return (
    <article className="project panel">
      <h3 className="project__title">
        {/* Link, not <a>: navigating to the detail route must not reload. */}
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </h3>

      <p className="project__tagline">{project.tagline}</p>
      <p className="project__summary">{project.summary}</p>

      <ul className="stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <p className="project__links">
        <Link className="button project__more" to={`/projects/${project.id}`}>
          Open
        </Link>
      </p>
    </article>
  );
}
