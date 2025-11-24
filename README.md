DailyCalc.org - Your Essential Daily Calculator Suite

DailyCalc.org is a comprehensive, user-friendly suite of online calculators designed for everyday needs. Built with a "mobile-first" philosophy, it offers a clean, distraction-free interface for finance, health, everyday life, and unit conversions.

🚀 Key Features

Universal Design: Consistent, high-quality UI across all tools using a centralized Tailwind configuration.

Mobile-First: Fully responsive layouts that look great on phones, tablets, and desktops.

Smart Functionality: Tools remember your inputs (via local storage) and offer advanced features like sharing and printing.

Zero Clutter: Ad placements are strategic and non-intrusive, prioritizing user experience.

SEO Optimized: Each page includes rich, educational content and semantic HTML.

📂 Directory Structure

dailycalc.org/
├── index.html              # Homepage (Dashboard & Categories)
├── dashboard.html          # User Dashboard (Saved Calculations & History)
├── css/
│   └── global.css          # Global styles & Tailwind directives
├── js/
│   ├── tailwind-config.js  # Centralized Tailwind config & custom components
│   ├── common-layout.js    # Shared Header/Footer injection
│   ├── global.js           # Utility functions (theme, storage)
│   ├── homepage.js         # Homepage specific logic
│   └── dashboard.js        # Dashboard logic (presets, history)
│
├── finance/                # Financial Calculators
│   ├── index.html          # Finance Category Page
│   └── mortgage-calculator.html  # Advanced Mortgage Calculator 🆕
│
├── health/                 # Health Calculators
│   └── index.html          # Health Category Page
│
├── everyday-life/          # Lifestyle Calculators
│   └── index.html          # Everyday Life Category Page
│
└── converters/             # Unit Converters
    └── index.html          # Converters Category Page


🛠️ Calculator Modules

1. Finance 💰

Mortgage Calculator (New!): * Features: Ultra-compact layout, monthly PITI breakdown, interactive donut chart, amortization schedule, and advanced options for extra payments & annual cost increases.

Tools: Save to dashboard, shareable links with pre-filled data, and optimized print reports.

2. Health ❤️

(Coming Soon) BMI Calculator, Calorie Counter, Water Intake.

3. Everyday Life 📅

(Coming Soon) Age Calculator, Date Difference, Discount Calculator.

4. Converters 🔄

(Coming Soon) Length, Weight, Temperature, Currency.

🎨 Design System

The project uses a centralized design system defined in js/tailwind-config.js. This ensures consistency across all pages.

Brand Colors: * Red: #F1203D (Primary Action)

Dark: #050505 (Text & Headers)

Green: #166534 (Financial Success/Results)

Typography: Poppins for headings, Inter for body text.

Components:

.compact-input: Standardized, high-density input fields.

.calc-tool-header: Unified header bar for all calculator tools.

.chart-segment: Interactive SVG chart elements.

💻 How to Run

Clone the repository.

Open index.html in your browser (or serve via a local server like Live Server for best results).

No Build Step Required: The project uses the Tailwind CSS CDN script with a custom config file for rapid development and easy deployment.

📝 To-Do List

[ ] Add Auto Loan Calculator

[ ] Add BMI Calculator

[ ] Implement "Dark Mode" toggle

[ ] Add Currency Converter with API integration

Built for simplicity and utility.
