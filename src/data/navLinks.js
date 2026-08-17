/* Single source of truth for navigation. The Taskbar renders these as
   <NavLink>s and Layout uses `title` to set document.title on route change,
   so a new route only has to be added in one place. */

const navLinks = [
  { to: '/',         label: 'Home',      title: 'hello world!',      end: true },
  { to: '/about',    label: 'About',     title: 'About' },
  { to: '/projects', label: 'Projects',  title: 'Projects' },
  { to: '/skills',   label: 'Skills',    title: 'Skills' },
  { to: '/beyond',   label: 'Others',    title: 'Extra Curriculars' },
  { to: '/contact',  label: 'Contact',   title: 'Contact' },
];

export default navLinks;
