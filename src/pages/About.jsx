import { Link } from 'react-router-dom';

import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import portrait from '../assets/jaya.jpg';
import './About.css';

const facts = [
  { term: 'Studying',  detail: 'B.Tech Computer Science & Engineering' },
  { term: 'Minor',     detail: 'Management' },
  { term: 'Institute', detail: 'National Institute of Technology, Warangal' },
  { term: 'Year',      detail: 'Third, CGPA 9.31' },
  { term: 'Based in',  detail: 'Chennai, TN' },
  { term: 'Currently', detail: "Building drone software for SAE India's Aerothon challenge!" },
];

export default function About() {
  return (
    <WindowFrame path="C:\jaya\about.txt" labelledBy="about-heading">
      <PageHeader
        icon="about"
        id="about-heading"
        title="About Me"
        subtitle="Who I am, and the detour that landed me in computer science."
      />

      <div className="about">
        <figure className="about__photo">
          <img src={portrait} width="300" height="380" alt="Jayalakshmi Venkatesan" />
          <figcaption>Jayalakshmi Venkatesan</figcaption>
        </figure>

        <div className="about__text">
          <p>
            I&apos;m a third-year CSE student at NIT-W, pursuing a minor in Management.
            I grew up in Chennai, TN and had no idea I&apos;d end up studying CS. My interests
            were mostly in the sciences, I loved math, and figuring out the &lsquo;unknown&rsquo;. Thus
            began my obsession for SPACE. And since then, after a couple weird choices, I ended
            up choosing CS, and through that found my love for Machine Learning, Autonomous
            Systems, and anything but making websites (I didn&apos;t particularly enjoy making this
            website as well, sorry!)
          </p>
          <p>
            I&apos;m excited to continue my journey in ML, DL, and other domains, and hopefully make
            use of my skills to contribute to society in a meaningful way. I also have a huge
            passion for the arts (music and dance) and I try to focus my efforts on that as well.
          </p>

          <h2 className="about__subhead">The factsheet</h2>
          <dl className="factsheet">
            {facts.map((fact) => (
              <div className="factsheet__row" key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="about__next">
            Next up: <Link to="/projects">what I&apos;ve built</Link> or{' '}
            <Link to="/skills">what I use</Link>.
          </p>
        </div>
      </div>
    </WindowFrame>
  );
}
