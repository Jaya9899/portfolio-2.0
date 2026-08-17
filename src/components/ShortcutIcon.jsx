/* The five pixel-art desktop icons, carried over from Assignment 1's inline
   SVG. They are decorative (the shortcut's own text is the accessible label),
   so every one is aria-hidden.

   Only the music notes use a themed colour: pure black notes vanish against
   the dark surface. Everything else is light-on-dark either way, the way real
   Win95 icons stayed the same in every colour scheme. */

const icons = {
  about: (
    <>
      <path d="M7 3h13l6 6v20H7z" fill="#ffffff" stroke="#000000" />
      <path d="M20 3v6h6" fill="#c9d4de" stroke="#000000" />
      <rect x="10" y="14" width="13" height="2" fill="#0A246A" />
      <rect x="10" y="18" width="13" height="2" fill="#808080" />
      <rect x="10" y="22" width="9" height="2" fill="#808080" />
    </>
  ),

  projects: (
    <>
      <rect x="3" y="5" width="26" height="18" fill="#c9d4c1" stroke="#000000" />
      <rect x="5" y="7" width="22" height="12" fill="#0A246A" />
      <rect x="7" y="9" width="14" height="2" fill="#22D3EE" />
      <rect x="7" y="12" width="9" height="5" fill="#ffffff" />
      <rect x="13" y="23" width="6" height="3" fill="#808080" />
      <rect x="8" y="26" width="16" height="3" fill="#c9d4c1" stroke="#000000" />
    </>
  ),

  skills: (
    <>
      <g fill="#8894a0" stroke="#000000">
        <rect x="13" y="2" width="6" height="28" />
        <rect x="2" y="13" width="28" height="6" />
        <g transform="rotate(45 16 16)">
          <rect x="13" y="2" width="6" height="28" />
          <rect x="2" y="13" width="28" height="6" />
        </g>
      </g>
      <circle cx="16" cy="16" r="9" fill="#c3ccd6" stroke="#000000" />
      <circle cx="16" cy="16" r="3.5" fill="#0A246A" />
    </>
  ),

  beyond: (
    <>
      <rect x="11" y="7" width="3" height="15" fill="var(--icon-ink)" />
      <rect x="23" y="5" width="3" height="14" fill="var(--icon-ink)" />
      <path d="M11 5 L26 3 L26 8 L11 10 Z" fill="var(--icon-ink)" />
      <ellipse cx="9" cy="22" rx="4.6" ry="3.6" fill="#22D3EE" stroke="#000000" />
      <ellipse cx="21" cy="19" rx="4.6" ry="3.6" fill="#C9B6F2" stroke="#000000" />
    </>
  ),

  contact: (
    <>
      <rect x="7" y="4" width="18" height="24" fill="#9D5BD2" stroke="#000000" />
      <rect x="7" y="4" width="4" height="24" fill="#5A2E86" />
      <text
        x="17"
        y="22"
        textAnchor="middle"
        fontFamily="Tahoma, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#FFD400"
      >
        ?
      </text>
    </>
  ),
};

export default function ShortcutIcon({ name, className = 'shortcut__icon' }) {
  const paths = icons[name];
  if (!paths) {
    return null;
  }

  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      shapeRendering={name === 'about' || name === 'projects' ? 'crispEdges' : undefined}
    >
      {paths}
    </svg>
  );
}
