# hello world!

Built a personal portfolio as a part of Full Stack Development Course, NIT-W using only HTML and CSS.
The design approach was to have a 2000s desktop feel, with old windows and task bar boxes for a nostalgic feel :D

To run -> click index.html


## Files
```
index.html            webpage
style.css             stylesheet
assets/               my photo, favicon + the validator screenshots
responsive-views.pdf  the page at tablet + mobile sizes
README.md             this file!
```

## Design rationale

I was inspired by a nostalgic 2000s desktop. So every section is a "window" (title bar + fake min/max/close buttons), the nav is the taskbar pinned up top, and the home screen has 5 shortcut boxes you click to open each section.
The "hello world!" title is beveled + chrome as thats the first thing any of us ever code :)

## Layout

- Grid -> for 2D items that sits in rows and columns. The 5 desktop shortcuts (3 up top, 2 centered below), projects gallery, about (photo + text), contact (form + links).
- Flexbox -> for single rows / one direction. The taskbar, each window title bar, the skill chips that wrap, the factsheet rows (label + value).

## Known limitations

- The contact form doesnt send anything yet, its just html/css (no backend).
- The chrome title needs webkit background-clip, on super old browsers it just falls back to a plain slate color.
- Only really tested on chrome + edge.


## Validation

- W3C Nu HTML validator - 0 error
- W3C CSS validator - 0 error


![W3C Nu HTML Checker](assets/image.png)

![W3C CSS Validator](assets/image-1.png)

## Usage of AI

Used AI tools for styling aspects:
1. "hello world" bevel, and gradient effect (learn about webkits)
2. Responsiveness for multi-media purpose (in mobile, tablet, laptop etc)
3. Generated a butterfly favicon for the title
