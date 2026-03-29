# 🎨 Color Palette Generator

A lightweight, browser-based tool for generating random color palettes. Built with vanilla HTML, CSS, and JavaScript — no dependencies or build tools required.

---

## 📸 Overview

The Color Palette Generator displays five color swatches at a time. With a single click, you can generate a brand-new set of random colors and copy any hex code to your clipboard instantly.

---

## ✨ Features

- **Random Palette Generation** — Generates five unique hex colors on every click.
- **One-Click Copy** — Copy a hex code to your clipboard by clicking the copy icon or the color swatch itself.
- **Visual Feedback** — The copy icon briefly turns into a checkmark to confirm the copy action.
- **Responsive Layout** — The palette grid adapts gracefully to smaller screen sizes.
- **Hover Animations** — Subtle lift effects on color cards and the generate button for a polished feel.

---

## 🗂️ Project Structure

```
color-palette-generator/
├── index.html    # App markup and color box structure
├── style.css     # Layout, theming, and animations
└── script.js     # Palette generation and clipboard logic
```

---

## 🚀 Getting Started

No installation or build step needed.

1. Clone or download the repository.
2. Open `index.html` in any modern browser.

```bash
git clone https://github.com/your-username/color-palette-generator.git
cd color-palette-generator
open index.html
```

---

## 🛠️ How It Works

### Generating a Palette

Clicking **Generate Palette** triggers `generatePalette()` in `script.js`. This function calls `generateRandomColor()` five times, each of which builds a hex string by randomly sampling from `0–9` and `A–F`, then passes the resulting array to `updatePaletteDisplay()` to update the DOM.

```js
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
```

### Copying a Hex Code

The palette container uses a single delegated `click` listener. When a copy icon (`.copy-btn`) is clicked, the hex value from the sibling `<span>` is written to the clipboard via the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). On success, `showCopySuccess()` temporarily swaps the icon for a green checkmark.

---

## 🐛 Known Bugs

The following issues exist in the current codebase and should be addressed:

| Location | Bug | Fix |
|---|---|---|
| `index.html` | Extra `<` in `<!doctype html>` | Change `<<!doctype html>` → `<!doctype html>` |
| `index.html` | Color box 1 hex label `#E1F5DE` doesn't match its inline style `#e1f5fe` | Align both values |
| `script.js` | Color swatch click handler uses `'hex-value'` (missing `.`) | Change to `'.hex-value'` |
| `style.css` | `box-shadow` on `.container` uses commas instead of spaces | Change `0, 10px, 25px` → `0 10px 25px` |
| `style.css` | `box-shadow` on `#generate-btn:hover` has `0,3` instead of `0.3` | Change `rgba(102, 126, 234, 0,3)` → `rgba(102, 126, 234, 0.3)` |
| `style.css` | `grid-template-columns` in the media query has a stray `)` after `auto-fit` | Change `repeat(auto-fit),` → `repeat(auto-fit,` |

---

## 🌐 Browser Support

Works in all modern browsers that support the Clipboard API (Chrome 66+, Firefox 63+, Edge 79+, Safari 13.1+). On older browsers, the copy feature will fall back to an `alert` with the error.

---

## 📦 External Libraries

| Library | Purpose |
|---|---|
| [Poppins (Google Fonts)](https://fonts.google.com/specimen/Poppins) | UI typography |
| [Font Awesome 7](https://fontawesome.com/) | Sync and copy icons |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).