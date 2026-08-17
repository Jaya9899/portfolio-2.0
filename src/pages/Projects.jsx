import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import projects from '../data/projects.js';
import './Projects.css';

export default function Projects() {
  return (
    <WindowFrame path="C:\jaya\projects.exe" labelledBy="projects-heading">
      <PageHeader
        icon="projects"
        id="projects-heading"
        title="Projects"
        subtitle={`${projects.length} things I have built. Open one for the longer version.`}
      />

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </WindowFrame>
  );
}
