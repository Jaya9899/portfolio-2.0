/* Shared by the Contact page and the site footer, so the two can never drift
   apart. `external` decides whether the link opens in a new tab. */

const contactLinks = [
  {
    key: 'Email',
    label: 'jlux1223@gmail.com',
    short: 'Email',
    href: 'mailto:jlux1223@gmail.com',
    external: false,
  },
  {
    key: 'GitHub',
    label: 'github.com/Jaya9899',
    short: 'GitHub',
    href: 'https://github.com/Jaya9899',
    external: true,
  },
  {
    key: 'LinkedIn',
    label: 'linkedin.com/in/jayalakshmi-venkatesan',
    short: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jayalakshmi-venkatesan/',
    external: true,
  },
];

export default contactLinks;
