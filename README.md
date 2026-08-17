# hello world!

Assignment 2 for Full Stack Development, NIT-W. My Assignment 1 portfolio rebuilt in React with
react-router-dom.

Design is the same 2000s desktop as before -> every page is a "window" with a title bar and fake
min/max/close buttons, and the nav is the taskbar pinned up top. The difference is the 5 desktop
shortcuts are routes now instead of anchor links. New in this one: a dark theme that remembers
what you picked, a startup sequence on the home screen, a detail page per project, a Start menu on
small screens, and a contact form that validates.

## To run

```
npm install
npm run dev       -> http://localhost:5173
npm run build     -> builds into dist/
npm run preview   -> serves the built version
```

Needs Node 18+. Built with Vite, React 19 and react-router-dom 7.

## Screen recording

[Watch the demo](https://drive.google.com/file/d/13Z8jJkTqX6LA3AmHWf6tdzal5COtyqWS/view?usp=sharing)
-> theme toggle, navigating routes, the dynamic project route, and form validation.

## Folder structure

```
src/
  components/   Layout, Taskbar, Footer, WindowFrame, PageHeader,
                Loader, ProjectCard, ContactForm, ShortcutIcon
  pages/        Home, About, Projects, ProjectDetail, Skills, Beyond,
                Contact, NotFound
  data/         projects.js, skills.js, beyond.js, navLinks.js, contactLinks.js
  assets/       jaya.jpg
  styles/       global.css (variables, both themes, reset, shared bits)
```

Each component and page has its own `.css` file next to it.

## Component tree

```
main.jsx
└── BrowserRouter
    └── App                        <- theme lives here
        └── Layout                 <- isMobile lives here
            ├── Taskbar            (6 NavLinks, theme toggle, Start menu)
            ├── <main>
            │   └── <Outlet/>      <- the routed page goes here
            └── Footer             (nav + contact links, status bar, clock)
```

Layout is a pathless parent route, so the Taskbar and Footer never unmount. Only the `<Outlet/>`
swaps when the URL changes.

WindowFrame and PageHeader are the two things I pulled out. In A1 the title bar + fake buttons +
sunken body was copy pasted into 6 sections of the HTML; now its one component. PageHeader gives
every page the same pixel art icon thats on its desktop shortcut, so clicking `about.txt` lands
you somewhere that obviously belongs to that shortcut.

### Where the state lives, and why

The rule I went with: only lift state as far as its actually read.

- **theme -> App.** The Taskbar changes it but every page gets painted by it, so App is the lowest
  parent of both. Goes down as `theme` + `onToggleTheme` props. Applied as `data-theme` on `<html>`,
  so nothing below has to know the theme exists, the CSS variables handle it.
- **isMobile -> Layout.** Two siblings need it: the Taskbar collapses its links, the Footer drops
  its clock. Not in App, because no page reads it and that would re-render every route on resize.
- **Form values / errors / touched -> ContactForm.** Nothing outside the form reads a field value,
  so lifting it would re-render the page every keystroke for nothing. Same for `isLoading` in Home
  and `menuOpen` in Taskbar.

## useEffect hooks

9 of them. Every one that starts a timer or subscribes to an event returns a cleanup function.

| # | Where | Deps | Why I needed it | Cleanup |
|---|-------|------|-----------------|---------|
| 1 | App | `[theme]` | Saves the theme to localStorage and puts `data-theme` on `<html>`. Side effects outside React, re-run whenever the theme changes. | none, it creates nothing |
| 2 | Layout | `[]` | `resize` listener for the responsive nav. | `removeEventListener` |
| 3 | Layout | `[pathname]` | Scrolls to top on navigation, otherwise a route change keeps the old scroll position. | none |
| 4 | Layout | `[pathname]` | Sets `document.title` per route. react-router doesnt touch it. | none |
| 5 | Taskbar | `[menuOpen]` | `keydown` listener so Escape closes the Start menu. Only subscribed while its open. | `removeEventListener` |
| 6 | Taskbar | `[pathname, isMobile]` | Closes the menu after navigating and when the breakpoint flips, so it cant get stuck open. | none |
| 7 | Footer | `[]` | `setInterval` for the status bar clock. | `clearInterval` |
| 8 | ContactForm | `[sent]` | `setTimeout` hiding the confirmation box after 6s. | `clearTimeout`, or a second submit lets the old timer hide the new box |
| 9 | Home | `[]` | The startup sequence, a 1s `setTimeout` that turns `isLoading` off. Runs once on mount. | `clearTimeout`, or navigating away in the first second sets state on an unmounted component |

**One thing I did differently.** The theme is *written* in effect 1 but *read* in a lazy
`useState(readStoredTheme)` initialiser, not an effect. Effects run after the first render, so
reading it there paints light and then flips to dark, and you see the flash on every load. The
initialiser runs before the first paint instead. Falls back to the OS setting, then light.

## Routes

| Path | Page |
|------|------|
| `/` | Home, boot sequence then the 5 shortcuts |
| `/home` | redirect to `/` |
| `/about` `/skills` `/beyond` | About, Skills, Beyond |
| `/projects` | grid of ProjectCards |
| `/projects/:projectId` | the dynamic one. `useParams()` grabs the slug and looks it up in `data/projects.js` (`jurisnet`, `vulnhgnn`, `drone-autonomy`) |
| `/contact` | the validated form |
| `*` | 404, styled as a Win95 error dialog with a link back Home |

A slug that doesnt exist (`/projects/nonsense`) is handled inside ProjectDetail rather than falling
through to the 404 -> the route matched fine, it was the id that didnt, so the useful thing to show
is a link back to Projects.

Everything internal uses `<Link>` / `<NavLink>`, so nothing does a full reload. NavLink also sets
`aria-current="page"`, which is what draws that taskbar button as pressed in. Plain `<a>` is only
for external links.

## Form validation

Controlled inputs, `noValidate` on the form so the browsers own popups stay out of the way.

- Name -> required, min 2 characters
- Email -> required, has to match something@something.tld
- Message -> required, min 10 characters, with a live character count

Fields validate on blur, then re-validate on every keystroke *after* theyve been blurred, so the
error clears as you fix it but never pops up mid-typing. Submit marks everything touched, shows all
errors, and focuses the first bad field. Errors use `role="alert"` with `aria-invalid` +
`aria-describedby`, and show as text plus a red rule so colour isnt the only signal.

## Styling + accessibility

Plain `.css` per component plus `global.css` for the variables. No CSS framework, no UI library,
same as A1.

The one real change was the bevel. In A1 it borrowed `--white`/`--light`/`--shadow`/`--dark`, which
were also doing duty as surface colours, and that only works in one theme -> in dark mode the
highlight has to stay lighter than the chrome its on while the surface behind text goes darker, and
one variable cant do both. Splitting them into a 4 step ramp (`--bevel-1` to `--bevel-4`) means the
whole site inverts by swapping variables, with no dark mode rules in any component CSS.

- Breakpoints kept from A1 -> tablet 768px, mobile 480px. Under 768 the taskbar collapses into the
  Start menu and the shortcut grid goes 6 col -> 2 col -> 1 col.
- Semantic HTML -> `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<dl>`.
- One `<h1>` per page going down to h2/h3, since each route is its own document now.
- Skip link, visible focus outlines, `aria-current` on the active link, `aria-expanded` on the Start
  button, `aria-hidden` on decorative icons.
- Both themes clear WCAG AA for body text (about 14.5:1 light, 9.5:1 dark).
- `prefers-reduced-motion` kills the shortcut animation and the loader bar.

## Known limitations

- The contact form doesnt send anything, its front end only. The confirmation box says so.
- Static hosting needs an SPA rewrite rule (everything -> index.html), or refreshing on
  `/projects/jurisnet` 404s. `npm run preview` handles it locally.
- The chrome "hello world!" needs `background-clip: text`, otherwise it falls back to flat slate.
- Only really tested on chrome + edge.
