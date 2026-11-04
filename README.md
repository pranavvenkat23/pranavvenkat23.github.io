# pranavvenkat23.github.io

Source for [pranavvenkat23.github.io](https://pranavvenkat23.github.io/), the personal
research and engineering site of Pranav Venkateswaran.

A Jekyll site based on [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io)
(MIT, © 2022 Yi Ren), substantially restyled and restructured. Deployed by GitHub Pages
from `main`.

## Editing content

Content lives in YAML under `_data/`, so the page templates rarely need to change:

| File | What it holds |
| --- | --- |
| `_data/research.yml` | Selected research entries. |
| `_data/projects.yml` | Engineering projects. `featured: true` renders the expanded layout. |
| `_data/experience.yml` | Research and clinical experience. |
| `_data/awards.yml` | Honors and awards, in display order. |
| `_data/leadership.yml` | Leadership and service. |
| `_data/timeline.yml` | Timeline (newest first), shown under About. |
| `_data/skills.yml` | Technical skills. |
| `_data/interests.yml` | Research interest areas. |
| `_data/navigation.yml` | Section links in the top navigation. |

Profile details, contact links, and site metadata are in `_config.yml` under `author`.

## Running locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

The site builds to `_site/` and serves at <http://127.0.0.1:4000>.

## Layout

```
_data/        content (edit this)
_includes/    head, masthead, sidebar profile
_layouts/     page shell
_pages/       home.html (the single-page site) and detail pages
_sass/        styles
assets/       compiled CSS entry point and JS
files/        CV
images/       portrait, icons, project figures
```

## License

Site content and text © Pranav Venkateswaran. The underlying AcadHomepage template is
MIT licensed; see [LICENSE](LICENSE).
