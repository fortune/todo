# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A dependency-free TODO app built with plain HTML, CSS, and JavaScript. No build step or package manager required — open `index.html` directly in a browser.

## File Structure

- `index.html` — HTML structure only; references `style.css` and `app.js`
- `style.css` — All styles
- `app.js` — All application logic

## Architecture

State is held in two module-level variables in `app.js`:

- `todos` — array of `{ id, text, completed }` objects, persisted to `localStorage`
- `filter` — current view: `'all'` | `'active'` | `'completed'`

The app uses a simple render loop: every mutation (add, toggle, delete, filter change) calls `save()` then `render()`. There is no virtual DOM — `render()` replaces the `innerHTML` of `#todo-list` on every call.

User input rendered into HTML is sanitized via `escapeHtml()` to prevent XSS.
