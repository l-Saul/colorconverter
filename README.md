# Color Converter

Online tool to convert colors between **HEX** and **RGB** formats.  
Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, and deployed automatically to **GitHub Pages**.

---

## Status

[![Deploy Next.js to GitHub Pages](https://github.com/l-saul/colorconverter/actions/workflows/deploy.yml/badge.svg)](https://github.com/l-saul/colorconverter/actions/workflows/deploy.yml)

---

## Live Demo

https://l-saul.github.io/colorconverter/

---

## Features

- HEX → RGB conversion
- RGB → HEX conversion
- Input validation
- Automatic text contrast (black/white) based on background color
- Responsive layout
- Static export (no backend)

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- GitHub Pages
- GitHub Actions (CI/CD)

---

## Local Development

```bash
npm install
npm run dev
npm run build

---

## Notes

This project is exported as a static site using `output: 'export'` to support GitHub Pages.
Server-side features are not used.