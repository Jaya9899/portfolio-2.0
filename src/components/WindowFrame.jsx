import './WindowFrame.css';

/* In Assignment 1 the title bar + fake _ □ × buttons + sunken body were
   copy-pasted into six sections of index.html. As a component it is written
   once and every page becomes a <WindowFrame> with its content inside.

   `labelledBy` should be the id of the heading inside, so the section is
   named for screen readers. */
export default function WindowFrame({ path, labelledBy, className = '', children }) {
  const classes = className ? `window ${className}` : 'window';

  return (
    <section className={classes} aria-labelledby={labelledBy}>
      <p className="window__bar">
        <span className="window__path">{path}</span>
        <span className="window__buttons" aria-hidden="true">_ &#9633; &times;</span>
      </p>

      <div className="window__body">
        {children}
      </div>
    </section>
  );
}
