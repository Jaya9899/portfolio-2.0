import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import skillGroups from '../data/skills.js';
import './Skills.css';

export default function Skills() {
  return (
    <WindowFrame path="C:\jaya\skills.ini" labelledBy="skills-heading">
      <PageHeader
        icon="skills"
        id="skills-heading"
        title="Skills"
        subtitle="Everything I reach for often enough to remember the syntax."
      />

      {skillGroups.map((group) => (
        <section className="skills__group" key={group.id} aria-labelledby={`${group.id}-heading`}>
          <h2 id={`${group.id}-heading`}>{group.title}</h2>
          <ul className="chips">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </WindowFrame>
  );
}
