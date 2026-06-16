DailyCalc.org - Developer & AI Guide

DailyCalc.org is a lightweight, mobile-first suite of online calculators. It is built with a "Zero-Build" philosophy, using vanilla JavaScript and Tailwind CSS (via CDN) to ensure instant deployment, lightning-fast edge delivery, and easy editing.

🏗️ Architecture Overview

The site does not use heavy modern compilation frameworks like React or Vue. Instead, it relies on a custom Layout Engine (js/common-layout.js) to inject common UI elements (Header, Sidebar, Footer) at runtime, preserving user privacy by running all calculations strictly client-side.

Core Files (The "Brain")

js/common-layout.js:

Responsibility: Contains the CalculatorLayout.render() engine. Wipes the placeholder of a calculator page and dynamically rebuilds it with the standard Header, Breadcrumbs, Grid Layout, Sticky Sidebar (with Related Tools), and Footer.

js/global.js:

Responsibility: Contains the master CALCULATOR_REGISTRY (list of all tools). Initializes the Wishlist Toggle Sidebar Widget and handles the state-preserving Auto-Save (Drafts) system.

js/tailwind-config.js:

Responsibility: Centralized design system configuration. Defines theme colors (brand-red, brand-green, brand-dark), custom font families (Poppins & Inter), and registers unified reusable UI components (like .compact-input and .calc-card-compact).

js/global.css:

Responsibility: Contains core viewport overflow guards, custom mobile menu layouts, and standard centralized print stylesheets (@media print) loaded synchronously.

🚀 How to Create a New Calculator

Do not copy old files. We use a strict semantic template that leverages the runtime Layout Engine.

Choosing a Layout: Automatic vs. Manual

Choose the implementation workflow that fits your specific tool's interface requirements:

The Automatic Way (Recommended)

Use for: 90% of tools (BMI, Age, Unit Converters).

Method: CalculatorLayout.render(...)

How it works: Create two hidden divs (tool-slot and seo-slot). The engine automatically builds the breadcrumbs, title, responsive column grids, sticky sidebar, and footer wrapper for you.

The Manual Way (Advanced)

Use for: Highly complex dashboards or dynamic full-width layouts.

Method: loadCommonLayout()

How it works: Write the entire HTML grid yourself and call loadCommonLayout() only to inject the global Header and Footer placeholders.

Step 1: Create the HTML File (Standard Template)

Create a new file (e.g., finance/auto-loan.html) and paste this Standard Semantic Template:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Title | DailyCalc.org</title>
    <meta name="description" content="SEO-friendly description here (max 160 characters)...">

    <!-- Standard Imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">
    
    <!-- Link to global stylesheet (Moved to js/ folder) -->
    <link rel="stylesheet" href="../js/global.css">
    
    <!-- Tailwind CDN & Config -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../js/tailwind-config.js"></script>
    
    <!-- Core Scripts -->
    <script src="../js/global.js" defer></script>
    <script src="../js/common-layout.js" defer></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">

    <!-- The Layout Engine will inject contents here -->
    <main id="calculator-layout"></main>

    <!-- SLOT 1: The Calculator Interface -->
    <div id="tool-slot" class="hidden">
        <div class="calc-tool-header">
            <i class="fa-solid fa-calculator" aria-hidden="true"></i>
            <span class="text-xs font-semibold">Tool Tagline Description</span>
        </div>
        
        <div class="calc-body-wrapper">
            <!-- Inputs Column (280px on desktop) -->
            <div class="calc-input-section">
                 <div class="input-row">
                    <label for="uniqueInputId" class="input-label">Input Label</label>
                    <input type="number" id="uniqueInputId" class="compact-input" placeholder="0">
                 </div>
                 <button id="calcButton" class="widget-btn active w-full mt-4 font-bold">Calculate</button>
            </div>
            
            <!-- Results Column -->
            <div class="calc-output-section">
                 <div class="result-header rounded-t-md">
                     <span class="result-label">Output Result</span>
                     <span class="calc-action-group">
                         <!-- Layout Engine auto-injects Print Button here if empty -->
                     </span>
                 </div>
                 <div class="border border-t-0 border-slate-400 bg-white p-6 rounded-b-md text-center">
                     <span class="text-xs uppercase font-semibold text-slate-500">Calculated Value</span>
                     <div class="result-value text-slate-800" id="resultDisplay">-</div>
                 </div>
            </div>
        </div>
    </div>

    <!-- SLOT 2: SEO Content -->
    <div id="seo-slot" class="hidden">
        <div class="content-section">
            <div class="bg-gradient-to-r from-brand-dark to-brand-red px-4 py-2.5">
                <h2 class="font-bold text-white text-sm">How to Use This Tool</h2>
            </div>
            <div class="calc-seo-content">
                <p>Add rich educational and contextual copy here to maximize search engine authority and user trust...</p>
            </div>
        </div>
    </div>

    <!-- Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Render Layout Shell
            CalculatorLayout.render({
                title: "Tool Title",
                category: "Finance", // Must strictly match a key in CALCULATOR_REGISTRY
                toolId: "tool-slot",
                seoId: "seo-slot"
            });

            // 2. Local Calculator Execution Logic
            const inputEl = document.getElementById('uniqueInputId');
            const calcBtn = document.getElementById('calcButton');
            const displayEl = document.getElementById('resultDisplay');

            calcBtn.addEventListener('click', () => {
                const val = parseFloat(inputEl.value) || 0;
                const finalResult = val * 2; // Sample math operation
                displayEl.textContent = finalResult.toLocaleString();

                // Save to Recent History
                if (window.HistoryManager) {
                    window.HistoryManager.save("Tool Title", `Input: ${val}`, finalResult.toLocaleString());
                }
            });
        });
    </script>
</body>
</html>


Step 2: Register the Tool

Open js/global.js and append your new calculator's metadata object to the matching category array inside CALCULATOR_REGISTRY so it automatically populates contextual sidebars:

const CALCULATOR_REGISTRY = {
    'Finance': [
        // ... existing tools ...
        { name: "Auto Loan Calculator", url: "/finance/auto-loan.html", icon: "fa-car" }
    ]
}


🧠 System Features (Automated)

Auto-Save (Drafts)

How it works: js/global.js automatically scans and tracks DOM inputs (<input>, <select>, <textarea>) containing an explicit id attribute.

Behavior: Saves entered parameters into sessionStorage on changes, and automatically restores values back on page reloads to prevent layout configuration loss.

Dynamic Sidebar

How it works: CalculatorLayout configures and renders a sticky side-column automatically.

Components: Inserts a unified Wishlist (Save Tool) widget module which syncs favorite indicators across headers and user dashboards via custom events, alongside a localized "Related Tools" list based on the taxonomy category passed to the renderer.

🎨 Design System Components

Use these standard component classes defined in js/tailwind-config.js to ensure perfect UI consistency:

.compact-input: Standard numeric/text inputs (small text, right-aligned, grey borders, with transition focus ring).

.calc-body-wrapper: Flexible flex container that structures input columns next to results.

.calc-input-section: Styled sidebar input panel (fixed 280px width on desktop monitors).

.calc-output-section: Expanded visual container for results, charts, and schedule tables.

.calc-tool-header: Gradient red-to-dark header bar placed above the active tool container.

.result-header: Standard green gradient outcomes header bar.

.result-value: Unified size styling for outputs (Responsive 20px on mobile, 24px on desktop viewports).

.content-section: High-contrast content card containers with border bounds and soft shadow styling.
