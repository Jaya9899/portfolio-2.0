import WindowFrame from '../components/WindowFrame.jsx';
import PageHeader from '../components/PageHeader.jsx';
import activities from '../data/beyond.js';
import './Beyond.css';

export default function Beyond() {
  return (
    <WindowFrame path="C:\jaya\beyond.mp3" labelledBy="beyond-heading">
      <PageHeader
        icon="beyond"
        id="beyond-heading"
        title="Extra Curriculars"
        subtitle="The half of college that isn't on a transcript."
      />

      <div className="beyond-grid">
        {activities.map((activity) => (
          <article className="panel" key={activity.id}>
            <h2>{activity.title}</h2>
            <p>{activity.body}</p>
          </article>
        ))}
      </div>
    </WindowFrame>
  );
}
