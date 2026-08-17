import ShortcutIcon from './ShortcutIcon.jsx';
import './PageHeader.css';

/* The masthead at the top of every routed page: the same pixel-art icon that
   is on the desktop shortcut, the page's <h1>, and a one-line subtitle.

   Reusing the icon is the point: clicking `about.txt` on the desktop should
   land somewhere that visibly belongs to that shortcut, instead of a bare
   heading on an empty field.

   `eyebrow` is an optional line above the title; the project detail page puts
   its breadcrumb there. */
export default function PageHeader({ icon, title, subtitle, id, eyebrow }) {
  return (
    <header className="page-header">
      <ShortcutIcon name={icon} className="page-header__icon" />

      <div className="page-header__text">
        {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
        <h1 id={id}>{title}</h1>
        {subtitle && <p className="page-header__sub">{subtitle}</p>}
      </div>
    </header>
  );
}
