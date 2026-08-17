# hello world!

Assignment 2 for the Full Stack Development course, NIT-W. This is my Assignment 1 portfolio
rebuilt in React with react-router-dom.

Design is the same as before -> the 2000s desktop, where every section is a "window" with a title
bar and fake min/max/close buttons, and the nav is the taskbar pinned up top. What changed is
that the 5 desktop shortcuts are routes now instead of anchor links, so clicking one actually
opens a page instead of scrolling you down the document.

New in this one: a dark theme that remembers what you picked, a startup sequence on the home
screen, a detail page for each project, a Start menu on small screens, and a contact form that
actually validates.

## To run

```
npm install
npm run dev       -> http://localhost:5173
npm run build     -> builds into dist/
npm run preview   -> serves the built version
```

Needs Node 18 or newer. Built with Vite, React 19 and react-router-dom 7.

## Files

```
index.html               vite entry, mounts #root
vite.config.js
public/favicon.svg
src/
  main.jsx               createRoot + <BrowserRouter>
  App.jsx                theme state + all the routes
  components/            reusable bits, each with its own .css
    Layout.jsx           Taskbar + <main><Outlet/></main> + Footer
    Taskbar.jsx          nav links, theme toggle, mobile Start menu
    Footer.jsx           nav + contact columns, status bar, clock
    WindowFrame.jsx      the title bar / sunken body chrome
    PageHeader.jsx       the icon + h1 + subtitle block on every page
    Loader.jsx           the boot dialog with the progress bar
    ProjectCard.jsx      one card in the projects grid
    ContactForm.jsx      controlled inputs + validation
    ShortcutIcon.jsx     the 5 pixel art desktop icons
  pages/                 one file per route, each with its own .css
    Home, About, Projects, ProjectDetail, Skills, Beyond, Contact, NotFound
  data/                  projects.js, skills.js, beyond.js, navLinks.js,
                         contactLinks.js
  assets/jaya.jpg
  styles/global.css      variables, both themes, reset, shared bits
docs/assignment-1/       my A1 submission, kept for reference
```

The old `index.html` + `style.css` are in `docs/assignment-1/` now instead of being deleted,
along with the validator screenshots and the responsive views PDF.

## Component tree

```
main.jsx
└── BrowserRouter
    └── App                        <- theme lives here
        └── Layout                 <- isMobile lives here
            ├── Taskbar            (6 NavLinks, theme toggle, Start menu)
            ├── <main>
            │   └── <Outlet/>      <- the routed page goes here
            │       ├── Home           -> Loader, 5x ShortcutIcon
            │       ├── About          -> WindowFrame, PageHeader
            │       ├── Projects       -> WindowFrame, PageHeader, 3x ProjectCard
            │       ├── ProjectDetail  -> WindowFrame, PageHeader
            │       ├── Skills         -> WindowFrame, PageHeader
            │       ├── Beyond         -> WindowFrame, PageHeader
            │       ├── Contact        -> WindowFrame, PageHeader, ContactForm
            │       └── NotFound
            └── Footer              (nav + contact columns, status bar, clock)
```

Layout is a pathless parent route, so the Taskbar and Footer never unmount. Only the `<Outlet/>`
swaps when the URL changes, which is what makes navigation feel instant.

WindowFrame is the main thing I pulled out into its own component. In A1 the title bar + fake
buttons + sunken body was copy pasted into 6 sections of the HTML. Now its written once and every
page is just a `<WindowFrame>` with content inside.

PageHeader is the other one. Every page opens with the same pixel art icon thats on its desktop
shortcut, then the h1 and a one line subtitle, with a groove under it. Reusing the icon is the
whole point -> clicking `about.txt` on the desktop should land you somewhere that obviously
belongs to that shortcut, instead of just a heading sitting on an empty page.

The footer got the same treatment. Its a proper footer now with the route links, the contact
links, and a short blurb, with the Win95 status bar and clock kept underneath it. The contact
links come from `data/contactLinks.js`, which the Contact page reads too, so the two cant drift
apart.

### Where the state lives, and why

Three pieces of state. Each one sits at the lowest component that can serve everything reading it.

**theme -> App.** The Taskbar is what changes it, but every single page gets painted by it. So the
lowest thing that is a parent of both the button and everything reading it is App. It goes down as
`theme` + `onToggleTheme` props through Layout. Applying it as a `data-theme` attribute on `<html>`
means nothing below has to know the theme even exists, the CSS variables handle it.

**isMobile -> Layout.** Two siblings need it: the Taskbar collapses its links behind a Start button,
and the Footer drops its clock. Layout is the closest parent of both. I specifically did not put it
in App, because no page reads it, and putting it higher would re-render every route on window
resize for nothing.

**Form values / errors / touched -> ContactForm.** Nothing outside the form reads a field value, so
lifting it up would just re-render the page on every keystroke and gain nothing. Same logic for
`isLoading` in Home and `menuOpen` in Taskbar -> local, because theyre only used locally.

Basically the rule I went with was: only lift state as far as its actually read.

## useEffect hooks

9 of them. Every one that starts a timer or subscribes to an event returns a cleanup function. The
two that only write to the DOM dont need one.

| # | Where | Deps | Why I needed it | Cleanup |
|---|-------|------|-----------------|---------|
| 1 | App | `[theme]` | Saves the theme to localStorage and puts `data-theme` on `<html>`. Both are side effects on stuff outside React, which is what effects are for, and it has to re-run every time the theme changes. | none needed, it doesnt create anything |
| 2 | Layout | `[]` | The `resize` listener for the responsive nav. Runs once on mount. | `removeEventListener` |
| 3 | Layout | `[pathname]` | Scrolls to top when you navigate. A route change keeps the old scroll position, so leaving the bottom of Projects would drop you into the middle of Contact. | none needed |
| 4 | Layout | `[pathname]` | Sets `document.title` per route, including the project name on the dynamic route. react-router doesnt touch the title itself. | none needed |
| 5 | Taskbar | `[menuOpen]` | `keydown` listener so Escape closes the Start menu. Only subscribed while the menu is actually open, so theres no global key handler sitting there the whole session. | `removeEventListener` |
| 6 | Taskbar | `[pathname, isMobile]` | Closes the menu after you navigate, and when the layout crosses the breakpoint, so it cant get stuck open off screen. | none needed |
| 7 | Footer | `[]` | `setInterval` for the clock in the status bar. | `clearInterval` |
| 8 | ContactForm | `[sent]` | `setTimeout` that hides the confirmation box after 6s. | `clearTimeout`, otherwise submitting twice inside that window lets the old timer hide the new confirmation |
| 9 | Home | `[]` | The startup sequence, a 1s `setTimeout` that turns `isLoading` off. Empty deps so it only runs on mount. No API call, thats a later assignment. | `clearTimeout`, otherwise navigating away in the first second sets state on an unmounted component |

### One thing I did differently

The theme gets *written* in effect 1, but its *read* in a lazy useState initialiser instead of an
effect:

```jsx
const [theme, setTheme] = useState(readStoredTheme);
```

Effects run after the first render. So if I read the saved theme in one, the page paints in light
mode and then flips to dark, and you see the flash every single load. The initialiser runs before
the first paint, so the first frame is already right. Its still reading the stored value on initial
load, just at a better moment. If theres nothing saved it falls back to the OS setting, then light.

## Routes

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | boot sequence, then the 5 shortcuts |
| `/home` | -> `/` | redirect, so that URL still works |
| `/about` | About | |
| `/projects` | Projects | grid of ProjectCards |
| `/projects/:projectId` | ProjectDetail | the dynamic one. `useParams()` grabs the slug and looks it up in `data/projects.js`. Slugs are `jurisnet`, `vulnhgnn`, `drone-autonomy` |
| `/skills` | Skills | |
| `/beyond` | Beyond | |
| `/contact` | Contact | the validated form |
| `*` | NotFound | catch all, styled as a Win95 error dialog with a link back Home |

A project id that doesnt exist (like `/projects/nonsense`) gets handled inside ProjectDetail rather
than falling through to the 404. The route matched fine, it was the id that didnt, so the useful
thing to show is a link back to Projects.

Everything internal uses `<Link>` / `<NavLink>`, no plain `<a>`, so nothing does a full reload.
NavLink also sets `aria-current="page"` on the active route, which is what draws that taskbar
button as pressed in. Plain `<a>` is only used for actual external links (GitHub, LinkedIn,
mailto).

## Form validation

Controlled inputs, so every field value comes from state. `noValidate` is on the form to turn off
the browsers own popups, so my rules are the only ones running.

- Name -> required, min 2 characters
- Email -> required, has to match something@something.tld
- Topic -> required, defaults to "Just saying hi"
- Message -> required, min 10 characters, with a live character count

Fields validate on blur first, then re-validate on every keystroke *after* theyve been blurred. So
the error clears as you fix it, but it never pops up while youre still typing it out the first
time. Hitting submit marks everything touched, shows all the errors at once, and moves focus to the
first bad field.

Errors use `role="alert"` and are wired to their input with `aria-invalid` + `aria-describedby`,
and theyre shown as text plus a red rule, so colour is never the only way you can tell.

## Styling + accessibility

Plain `.css` files, one per component, plus `global.css` for the variables and the few bits more
than one component uses (`.chips`, `.stack`, `.panel`, `.factsheet`, `.button`). No CSS framework,
no UI library, same as A1.

The one real change I had to make to the stylesheet was the bevel. In A1 it borrowed
`--white`/`--light`/`--shadow`/`--dark`, which were also doing duty as surface colours. That only
works in one theme -> in dark mode the highlight has to stay *lighter* than the chrome its sitting
on, while the surface behind the text has to go *darker*, and one variable cant do both. So I split
them into a 4 step bevel ramp (`--bevel-1` to `--bevel-4`) separate from `--face`/`--surface`. Now
the whole site inverts by swapping variables and there isnt a single dark mode rule anywhere in the
component CSS.

- Breakpoints kept from A1 -> tablet 768px, mobile 480px. Under 768 the taskbar links collapse into
  the Start menu, and the shortcut grid goes 6 col -> 2 col -> 1 col.
- Semantic HTML throughout -> `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<dl>`.
- One `<h1>` per page now, going down to h2/h3. Each route is its own document, so the one-h1-for-
  the-whole-site thing from A1 doesnt apply anymore.
- Skip link, visible focus outlines, `aria-current` on the active nav item, `aria-expanded` on the
  Start button, `aria-hidden` on all the decorative icons.
- Both themes clear WCAG AA for body text. Light is black on white/`#D4D0C8`, dark is `#EDEDED` on
  `#1C1C1C`/`#3A3A3A`, which come out around 14.5:1 and 9.5:1.
- `prefers-reduced-motion` kills the shortcut open animation and the loader bar.

## Checks

- `npm run build` finishes with no errors or warnings.
- Ran the built version through headless Edge and checked all 8 routes render the right h1, both
  project slugs resolve, a bad slug and a bad path get handled, Link navigation doesnt reload, the
  theme toggle flips + saves + survives a reload, the loader shows before the 1s timer and is gone
  after, the form rejects empty/short/malformed input and accepts good input, and the Start menu
  opens, closes on Escape, and follows the breakpoint on resize. 41/41 passed, 0 console errors.

## Known limitations

- The contact form still doesnt send anything, its front end only. The confirmation box says so
  instead of pretending it went somewhere.
- Putting this on a static host needs an SPA rewrite rule (everything -> index.html), otherwise
  refreshing on `/projects/jurisnet` 404s. `npm run preview` already handles it locally.
- The chrome "hello world!" still needs background-clip: text, without it the title falls back to a
  flat slate colour.
- Only really tested on chrome + edge.
