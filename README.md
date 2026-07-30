# Jaya's World

Personal portfolio website for **Jayalakshmi Venkatesan**, third year B.Tech Computer
Science & Engineering, NIT Warangal.
Built for **CS1303 Full Stack Development, Assignment 1** — HTML5 and CSS3 only.
No frameworks, no preprocessors, no JavaScript.

Open `index.html` in any browser. There is nothing to install.

---

## Design rationale

The site is built to look like a wall of pasted Indian safety-match labels. Matchbox
label art is a real printing tradition: a heavy display face, one central motif, hard
border rules, and colour plates that rarely landed in register. Each section of the
portfolio is one label, and the hero is the wall — every label is a link into the
section it advertises. The palette (newsprint, vermillion, bottle green, indigo,
turmeric) and the deliberate 4px misregistration on the main heading come from that
tradition rather than from a template. Type reinforces it: Anton for the printed
banner, and Mukta and Rajdhani — both drawn by Indian Type Foundry for Devanagari
alongside Latin — for reading and for small caps labels.

## Layout technique

Both Grid and Flexbox are used, chosen per job rather than by preference. **Grid**
handles anything positioned on two axes: the hero collage is six equal columns with
each label spanning two, so the first row holds three labels and the second is offset
by one column to stagger them. Flexbox cannot place items across rows and columns like
that. The project and interest galleries use `repeat(auto-fit, minmax())`, which
reflows from three columns to one without a media query at all. **Flexbox** handles
one-dimensional content that only needs to wrap: the navigation bar, the skill chips,
the factsheet rows and the tech-stack tags.

## Known limitations

The contact form has no `action` endpoint. No JavaScript or backend is permitted in
this assignment, so it validates client-side through HTML5 `required` and `type`
attributes and does nothing on submit; an Express route replaces it in Assignment 2.
Fonts load from Google Fonts, so offline the page falls back to a local stack and the
display face changes. Content marked TODO is placeholder. The tilted labels are
straightened below 480px, because a rotated card either clips or forces a sideways
scroll on a narrow screen.

*(The three sections above are ~290 words.)*

---

## Files

```
index.html            the whole page
style.css             the whole stylesheet, sectioned and commented
assets/               five matchbox label graphics, a photo frame, a favicon
assets/CREDITS.md     attribution, if any third-party image is added
screenshots/          full-page captures at 1440px, 768px and 390px
responsive-views.pdf  the three captures side by side — deliverable 3
README.md             this file
```

`style.css` opens with a comment block listing every assignment requirement and the
section number where it is met.

## Validation

Checked on 30 July 2026:

- **W3C Nu HTML validator** — 0 errors, 0 warnings
- **W3C CSS validator (CSS3 profile)** — 0 errors. The 31 warnings are all the
  validator's standard "CSS variables are not statically checked" notice, which it
  emits for every `var()` call.
- **Contrast** — every text/background pair computed against WCAG AA; the lowest is
  5.47:1 against a 4.5:1 requirement.

Re-run them at https://validator.w3.org/nu/ and https://jigsaw.w3.org/css-validator/
by uploading the files after you fill in your content.

## Requirements checklist

| Requirement | Met |
|---|---|
| Semantic `header` `nav` `main` `section` `article` `footer` | yes |
| Four or more sections | six — Introduction, About, Projects, Skills, Beyond Code, Contact |
| Three or more projects | three `<article>` entries |
| `label`–input association | every field, explicit `for` / `id` |
| External stylesheet only | no `<style>` tag, no `style=""` attribute |
| `:root` custom properties | colour, type, spacing, print details |
| Flexbox and/or Grid | both, justified above |
| Breakpoints at 768px and 480px | yes |
| `:hover` and `:focus` states | yes |
| Transition and animation | tile straighten transition, staggered `paste-up` animation |
| `alt` on every image | yes, descriptive |
| Single `h1`, logical headings | one `h1`, `h2` per section, `h3` within |
| WCAG AA contrast | all text pairs ≥ 4.5:1, ratios noted in `style.css` |

## Still to fill in

Search the project for `TODO` — every placeholder is marked in the HTML and shown in
rust with a dashed rule on the page, so nothing gets missed.

- [ ] About: two paragraphs, your city, what you are working on
- [ ] Projects: three titles, blurbs, tech stacks, and real links
- [ ] Skills: replace the chips with what you actually use
- [ ] Beyond Code: three interests
- [ ] Contact: email, GitHub, LinkedIn
- [ ] Photo: save yours as `assets/jaya.jpg` and point the `<img>` in About at it
- [ ] Delete the `todo` class from each element once its text is real
