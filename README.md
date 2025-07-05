# Portfolio React App

A modern, responsive portfolio web application built with React. Showcases personal information, education, projects, and skills, with a custom design system for consistent style and accessibility.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design & Style Guidelines](#design--style-guidelines)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [License](#license)
- [Deployment](#deployment)

## Features

- Responsive, mobile-first layout
- Dark mode toggle
- Animated preloader
- Sidebar navigation with hamburger menu
- Sections for About, Education, Projects, and Skills
- Social/contact links (LinkedIn, GitHub, Instagram, Email copy)
- Project and skill tags
- Accessibility best practices (focus outlines, color contrast)
- Custom design system via `cursor.rules` and `theme.css`

## Demo

[Live Demo](https://albaraa-prog.github.io/portifolio)

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/albaraa-prog/portifolio.git
   cd portifolio/my-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
my-app/
  public/           # Static assets (index.html, icons, manifest)
  src/
    App.css         # App-level styles
    App.test.js     # App tests
    index.css       # Global styles
    index.js        # App entry point
    logo.svg        # Logo asset
    pages/
      Home.jsx      # Main portfolio page
      Style.css     # Component/page styles
    reportWebVitals.js
    setupTests.js
    theme.css       # Custom theme (from cursor.rules)
  package.json      # Project metadata and scripts
  README.md         # Project documentation
```

## Design & Style Guidelines

This project uses a custom design system defined in `cursor.rules` and implemented in `src/theme.css`.

### How to Use the Theme

1. **Import the theme CSS**
   In your `src/index.js` or `src/App.js`, add:
   ```js
   import "./theme.css";
   ```
2. **Use the provided classes and variables**
   - Use the `.button` class for buttons.
   - Use the `.navbar` class for navigation bars.
   - The theme supports dark mode, responsive layouts, and accessibility best practices.
   - All colors, spacing, and typography are based on the `cursor.rules` file.
3. **Responsive & Accessibility**
   - The theme includes mobile-first breakpoints and focus outlines for accessibility.
   - Images and icons are styled for consistency.

### Customization

You can adjust the design by editing `cursor.rules` and updating `src/theme.css` accordingly.

---

## Available Scripts

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
- `npm test` — Launches the test runner.
- `npm run deploy` — Deploys to GitHub Pages (see `homepage` in package.json).

## License

This project is licensed under the MIT License.

## Deployment

This project is deployed to [https://albaraa-prog.github.io/portifolio/](https://albaraa-prog.github.io/portifolio/).

### How to Deploy

1. **Commit your changes**

   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```

   (Replace `main` with your branch name if different.)

2. **Build and deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```
   This will build the app and publish the `build/` directory to the `gh-pages` branch, making your changes live at the URL above.

> **Note:** The deployment uses the `gh-pages` package and the `homepage` field in `package.json` is set to the correct URL.

For more details, see the [GitHub Pages documentation](https://create-react-app.dev/docs/deployment/#github-pages).
