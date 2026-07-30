# Jaya's World

Personal portfolio website for **Jayalakshmi Venkatesan**, third year B.Tech Computer
Science & Engineering, NIT Warangal.
Built for **CS1303 Full Stack Development, Assignment 1** — HTML5 and CSS3 only.
No frameworks, no preprocessors, no JavaScript.

Open `index.html` in any browser. There is nothing to install, and the page makes no
external network requests at all.

---

## Design rationale

The site is a Windows 2000 desktop. The homepage *is* the desktop: five shortcuts on
the teal wallpaper, each drawn as a small window, each opening a section. Every section
below is a window with a title bar showing its file path. The whole visual language
comes from two custom properties — `--bevel-out` and `--bevel-in` — each a stack of
four inset shadows that draw the two-tone moulded edge every Windows control had.
Nothing on the page is an illustration; it is all plain boxes and bevels. The palette is
the system palette: `#D4D0C8` button grey, `#008080` desktop teal, and the navy title
bar gradient. Type is Tahoma, which shipped with Windows 2000 and is still on most
machines, so no font has to be downloaded.

## Layout technique

Both Grid and Flexbox are used, chosen per job rather than by preference. **Grid**
handles anything positioned on two axes: the desktop is six equal columns with each
shortcut spanning two, so the first row holds three and the second starts one column in,
which centres it. Flexbox cannot place items across rows and columns like that. The
project and interest galleries use `repeat(auto-fit, minmax())`, which reflows from
three columns to one with no media query at all. **Flexbox** handles one-dimensional
content that only needs to sit in a row: the taskbar, every window title bar (path left,
buttons right), the skill chips, and the factsheet rows.

## Known limitations

The contact form has no `action` endpoint. No JavaScript or backend is permitted in this
assignment, so it validates client-side through HTML5 `required` and `type` attributes
and does nothing on submit; an Express route replaces it in Assignment 2. The window
buttons and the taskbar clock are decorative — without JavaScript they cannot minimise,
close, or tell the time, so they carry `aria-hidden` and are skipped by screen readers.
Tahoma is absent on some Linux machines, where the page falls back to Verdana. Content
marked TODO is placeholder.

*(The three sections above are ~295 words.)*

---

## Files

```
index.html            the whole page
style.css             the whole stylesheet, sectioned and commented
assets/               photo placeholder and favicon
assets/CREDITS.md     attribution, if any third-party image is added
screenshots/          full-page captures at 1440px, 768px and 390px
responsive-views.pdf  the three captures side by side — deliverable 3
README.md             this file
```

`style.css` opens with a comment block listing every assignment requirement and the
section number where it is met.

## Requirements checklist

| Requirement | Met |
|---|---|
| Semantic `header` `nav` `main` `section` `article` `footer` | yes |
| Four or more sections | six — Introduction, About, Projects, Skills, Beyond Code, Contact |
| Three or more projects | three `<article>` entries |
| `label`–input association | every field, explicit `for` / `id` |
| External stylesheet only | no `<style>` tag, no `style=""` attribute |
| `:root` custom properties | palette, type, spacing, and both bevels |
| Flexbox and/or Grid | both, justified above |
| Breakpoints at 768px and 480px | yes |
| `:hover` and `:focus` states | shortcut title bar activates; button presses in |
| Transition and animation | title bar fade and lift; staggered `window-open` |
| `alt` on every image | yes, descriptive |
| Single `h1`, logical headings | one `h1`, `h2` per section, `h3` within |
| WCAG AA contrast | all text pairs ≥ 4.5:1, ratios noted in `style.css` |

## Validation

Checked on 30 July 2026:

- **W3C Nu HTML validator** — 0 errors, 0 warnings
- **W3C CSS validator (CSS3 profile)** — 0 errors. The warnings are all the validator's
  standard "CSS variables are not statically checked" notice, which it emits for every
  `var()` call.
- **Contrast** — every text/background pair computed against WCAG AA; the lowest is
  4.77:1 (white on the desktop teal) against a 4.5:1 requirement.

Re-run them at https://validator.w3.org/nu/ and https://jigsaw.w3.org/css-validator/
by uploading the files after you fill in your content.

## Still to fill in

Search the project for `TODO` — every placeholder is marked in the HTML and shown in
dark red on the page, so nothing gets missed.

- [ ] About: two paragraphs, your city, what you are working on
- [ ] Projects: three titles, blurbs, tech stacks, and real links
- [ ] Skills: replace the chips with what you actually use
- [ ] Beyond Code: three interests
- [ ] Contact: email, GitHub, LinkedIn
- [ ] Photo: save yours as `assets/jaya.jpg` and point the `<img>` in About at it
- [ ] Delete the `todo` class from each element once its text is real
