DailyCalc.org

DailyCalc.org is an evergreen, SEO-first platform designed to host daily-use calculators across major life categories. It prioritizes speed, lightweight code, and a centralized design system using Tailwind CSS.

🎯 Project Goals

Speed & Performance: Deliver a lightweight, fast-loading experience optimized for all devices.

Trust & Clarity: Maintain a clean, neutral, and professional aesthetic.

Scalability: A modular architecture that allows for easy addition of new calculators and categories.

Maintainability: Centralized configuration for styles and layout to minimize repetitive code.

🧱 Architecture & Technology

Core Stack

HTML5: Semantic structure for accessibility and SEO.

Tailwind CSS (CDN): Utility-first CSS framework.

Vanilla JavaScript: Lightweight interactivity without heavy frameworks.

Font Awesome (CDN): Consistent iconography.

Google Fonts: Inter and Poppins.

File Structure & Key Components

The project uses a specific file structure to separate concerns and ensure maintainability.

1. Configuration & Styles

js/tailwind-config.js: CRITICAL. This is the single source of truth for the website's design system. It defines:

Brand colors (brand-red, brand-dark)

Font families (sans, heading)

Custom shadows (soft, soft-glow)

Usage: Must be loaded after the Tailwind CDN script in every HTML file.

css/global.css: Contains custom CSS rules that cannot be easily handled by Tailwind utilities alone (e.g., specific scrollbar hiding, custom animations).

2. JavaScript Modules

js/common-layout.js:

Responsibility: Injects the global Header (navigation, search) and Footer into placeholder <div> elements (#header-placeholder, #footer-placeholder).

Features: Handles the mobile menu toggle, the global search modal logic, and the "Suggest a Tool" clipboard functionality.

js/global.js:

Responsibility: Site-wide utilities that run on every page (e.g., scrollbar hiding logic).

js/homepage.js:

Responsibility: Logic specific to the homepage (index.html), such as the category filter/search functionality.

js/dashboard.js:

Responsibility: Manages the localStorage logic for the user dashboard (saving/loading history and presets).

3. HTML Pages & Directories

/ (Root): index.html (Homepage), dashboard.html (User Dashboard).

Categories: organized into folders (e.g., finance/, health/, everyday-life/).

Each folder contains an index.html acting as the category landing page.

Note: Links usually point to the folder (e.g., /finance/) which resolves to the index.html.

🎨 Design System (Centralized)

Do not hardcode colors or fonts in individual HTML files. Always use the tokens defined in js/tailwind-config.js.

Token

Value / Description

Usage Class

Primary Color

#F1203D (Red)

text-brand-red, bg-brand-red

Dark Color

#050505 (Black)

text-brand-dark, bg-brand-dark

Body Font

Inter

font-sans

Heading Font

Poppins

font-heading

Shadow (Default)

Soft gray/blue

shadow-soft

Shadow (Glow)

Red-tinted glow

shadow-soft-glow

🌐 Navigation & Categories

The site navigation is centrally managed in js/common-layout.js.

Current Active Categories:

Finance: Mortgage, loans, budgeting.

Health: BMI, nutrition, body metrics.

Everyday Life: Time, scheduling, countdowns (formerly "Date & Time").

Converters: Units, measurements, digital formats.

Removed/Hidden Categories:

Math & Numbers

Study & Education

General Tools

AI-Based Calculators

🛠️ Development Workflow

New Page Creation:

Copy an existing category page (e.g., finance/index.html) to maintain structure.

Ensure <script src="../js/tailwind-config.js"></script> points to the correct relative path.

Ensure <div id="header-placeholder"></div> and <div id="footer-placeholder"></div> exist.

Load global.js and common-layout.js with defer.

Updating Navigation:

Edit js/common-layout.js. Update the headerHTML string to add/remove links in both the Desktop buttons area and the Mobile Menu section.

Global Style Changes:

Edit js/tailwind-config.js to change fonts, colors, or shadows site-wide.

📊 Data Storage

Local Storage: The dashboard.html uses the browser's localStorage to save calculation history and user presets. No server-side database is currently connected.

🚀 Deployment

The site is static HTML/JS/CSS. It can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

📬 Contact

For requests, partnerships, or feedback, reach out via hello@dailycalc.org.
