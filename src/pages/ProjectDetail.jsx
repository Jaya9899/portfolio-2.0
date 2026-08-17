import { Link, useParams } from 'react-router-dom';

import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import projects, { getProjectById } from '../data/projects.js';
import './ProjectDetail.css';

export default function ProjectDetail() {
  /* The dynamic segment of /projects/:projectId. Whatever is in the URL
     arrives here as a string; everything below is driven by it. */
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  /* A URL can name a project that does not exist: someone mistypes it, or an
     old link rots. That is not a 404 for the whole app, so it is handled here
     rather than falling through to the catch-all route. */
  if (!project) {
    return (
      <WindowFrame path={`C:\\jaya\\projects\\${projectId}`} labelledBy="missing-heading">
        <PageHeader
          icon="projects"
          id="missing-heading"
          title="Cannot find that project"
          eyebrow={<Link to="/projects">Projects</Link>}
        />
        <p>
          There is no project with the id <code className="detail__code">{projectId}</code>.
        </p>
        <p className="detail__links">
          <Link className="button" to="/projects">Back to Projects</Link>
        </p>
      </WindowFrame>
    );
  }

  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <WindowFrame path={`C:\\jaya\\projects\\${project.file}`} labelledBy="detail-heading">
      <PageHeader
        icon="projects"
        id="detail-heading"
        title={project.title}
        subtitle={project.tagline}
        eyebrow={
          <>
            <Link to="/projects">Projects</Link> <span aria-hidden="true">›</span> {project.title}
          </>
        }
      />

      <dl className="factsheet detail__meta">
        <div className="factsheet__row">
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="factsheet__row">
          <dt>Timeline</dt>
          <dd>{project.timeline}</dd>
        </div>
        <div className="factsheet__row">
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
      </dl>

      <section className="detail__section" aria-labelledby="detail-what">
        <h2 id="detail-what">What it does</h2>
        {project.detail.map((paragraph) => (
          <p className="detail__para" key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </section>

      <section className="detail__section" aria-labelledby="detail-highlights">
        <h2 id="detail-highlights">Highlights</h2>
        <ul className="detail__highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="detail__section" aria-labelledby="detail-stack">
        <h2 id="detail-stack">Built with</h2>
        <ul className="stack detail__stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>

      <p className="detail__links">
        {project.links.map((link) => (
          // External destination, so a plain <a> is correct here. <Link> is
          // only for routes inside this app.
          <a className="button" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </p>

      <nav className="detail__pager" aria-label="Other projects">
        {previous ? (
          <Link className="detail__pager-link" to={`/projects/${previous.id}`}>
            <span aria-hidden="true">←</span> {previous.title}
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link className="detail__pager-link detail__pager-link--next" to={`/projects/${next.id}`}>
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </WindowFrame>
  );
}
