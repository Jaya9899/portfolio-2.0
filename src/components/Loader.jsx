import './Loader.css';

/* The boot dialog shown while Home's start-up timer runs.
   role="status" so assistive tech announces it without stealing focus. */
export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <p className="loader__bar">
        <span className="loader__path">C:\jaya\startup.exe</span>
        <span className="loader__buttons" aria-hidden="true">_ &#9633; &times;</span>
      </p>

      <div className="loader__body">
        <p className="loader__label">{label}</p>

        {/* Decorative: the real state is announced by loader__label above. */}
        <span className="loader__track" aria-hidden="true">
          <span className="loader__fill" />
        </span>
      </div>
    </div>
  );
}
