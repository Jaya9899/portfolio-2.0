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

      <div className="ini">
        {skillGroups.map((group) => (
          <section className="ini__section" key={group.id} aria-labelledby={`${group.id}-heading`}>
            {/* The brackets are punctuation, not part of the section's name, so
                they are hidden rather than read out as "left bracket". */}
            <h2 className="ini__key" id={`${group.id}-heading`}>
              <span className="ini__bracket" aria-hidden="true">[</span>
              {group.title}
              <span className="ini__bracket" aria-hidden="true">]</span>
            </h2>

            <ul className="ini__values">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </WindowFrame>
  );
}
