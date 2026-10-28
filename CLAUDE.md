# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Small shopping/ingredients list web app backed by Firebase Realtime Database. Plain HTML/CSS/JS — no build step, no package.json, no tests, no linter.

- `index.html` — single page: logo, input, "Agregar al carrito" button, `<ul id="ingredients-list">`.
- `js/index.js` — all logic, loaded as an ES module (`type="module"`).
- `styles/index.css` — all styling (fonts: Ubuntu / Roboto Slab from Google Fonts).

## Running

Because `index.js` is an ES module, it must be served over HTTP (opening `index.html` via `file://` fails). Any static server works, e.g. VS Code Live Server or `npx serve .`.

## Architecture

- Firebase SDK v9 (modular) is imported directly from the `gstatic.com` CDN — no npm.
- Data lives under the `ingredients` node; each item is a `push()` key → string value.
- `onValue(ingredientsInDB, ...)` is the single source of truth for the UI: on every DB change it clears the `<ul>` and re-renders all items from the snapshot. Clicking an `<li>` calls `remove()` on `ingredients/<id>`, which in turn re-triggers `onValue`.

## Conventions / gotchas

- Firebase config (`appSettings`) lives in `js/config.js`, which is gitignored; `js/config.example.js` is the committed template. Never put a real `databaseURL` in a tracked file.
- UI strings and console messages are in Spanish; README is bilingual (ES/EN).

## How to work with the owner

The owner is getting back into coding after a break. Act as a **tutor**, not as the one who writes the code:

- Do not edit source files and never commit/push — the owner writes and commits everything.
- Review their changes, explain the *why*, point to best practices, and give hints or small illustrative snippets instead of finished solutions.
- Explain in Spanish.
