# portfolio

Personal portfolio of **Jay Keer**, a software developer in Mumbai who builds Flutter apps for connected things: smart locks, video doorbells and home automation at Godrej & Boyce, plus his own apps Budgetify and Vaulty.

Plain HTML, CSS and a little JavaScript. There's no build step and no framework.

## Pages

| Path | What it is |
|---|---|
| `index.html` | Home: intro, products, work at Godrej & Boyce, patents, experience, education, contact |
| `budgetify/` | Case study: Budgetify, a private offline budget tracker |
| `vaulty/` | Case study: Vaulty, an encrypted offline memory app |
| `archive/` | Earlier design explorations, kept for reference |

Shared styles and scripts live in `assets/` (`bento.css`, `bento.js`).

## Run it locally

Any static file server works. From the repository root:

```bash
python -m http.server 4321
```

Then open <http://localhost:4321/>.
