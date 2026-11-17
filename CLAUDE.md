# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Leonardo Avoni (aerospace / PhD research), served by GitHub Pages at the custom domain `leonardoavoni.com` (see `CNAME`). It is plain static HTML built on the HTML5 UP "Massively" template. There is no build step, package manager, linter, or test suite: edit files and push to `main` to deploy.

Preview locally with any static server, e.g. `python3 -m http.server 8000`, then open http://localhost:8000.

## Architecture

- **No templating, so shared markup is duplicated in every page.** Each `.html` file has its own copy of the `<head>` (SEO/OpenGraph meta, fonts, CSS), the header, the `#nav` menu, the footer contact form (formsubmit.co), the copyright and the script tags. A change to the nav, footer or head boilerplate has to be made in **every** page (about 18 live pages). The `*_old.html` files are leftover template pages; they are blocked in `robots.txt` and do not need updating.
- **Page types:**
  - `index.html`: bio / landing page (it alone has a `rel="canonical"` tag).
  - `skills.html`: skills & certifications.
  - `projects-aero.html`, `projects-uav.html`, `projects-other.html`: category listing pages. They use the `#intro` hero plus a `section.posts` grid of `<article>` cards linking to project pages.
  - `project-*.html` and `project_uav_N_*.html`: individual project write-ups. Each is a single `section.post` with a `header.major` (date line, h1, subtitle), image rows built with the template grid (`box alt` > `row gtr-50 gtr-uniform` > `col-6 col-12-small`), italic inline-styled captions, and "Back to …" buttons.
- **Navigation:** `#nav` holds the top-level links. `li.has-dropdown` holds a `ul.dropdown` of project pages, and `class="active"` is set on the current section's `<li>` on each page. When you add a project you need to: create the page, add a card to its category listing, add it to the dropdown in **every** page's nav, and add it to `sitemap.xml`.
- **CSS/JS layering:**
  - `assets/css/main.css` is the compiled template stylesheet. `assets/sass/` is its source, but no Sass toolchain is configured in the repo, so site-specific styling goes in `assets/css/custom.css` (loaded after `main.css` on every page).
  - `custom.css` overrides the template's `overflow:hidden` on the nav so the dropdowns can show. It also styles the mobile `#navPanel` drill-down and adjusts heading sizes.
  - `assets/js/main.js` (template) clones `#nav` into the mobile `#navPanel`. `assets/js/nav-dropdown.js` adds click-to-toggle dropdowns on desktop and a drill-down submenu (with Back and "Overview" links) in the mobile panel. jQuery is loaded from cdnjs.
- **Images:** they live under `images/<category>/<project>/`. Pages reference compressed `*_c.webp` copies (sometimes `.avif`), with the original `.png`/`.jpg` kept alongside. Follow this convention for new images. PDFs (reports, the ASWING manual, the CV) also sit under `images/`.
- **SEO:** each page sets its own `<title>`, `description`, `keywords` and `og:*` meta. `sitemap.xml` lists the canonical URLs and deliberately leaves out `/index.html` to avoid duplicate-page errors. `robots.txt` blocks the private HR documents under `images/other_projects/Synova/` and `images/aero/LIS_Elythor/`, so do not link those publicly.
