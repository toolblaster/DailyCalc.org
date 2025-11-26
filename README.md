DailyCalc.org - Developer & AI Guide

DailyCalc.org is a lightweight, mobile-first suite of online calculators. It is built with a "Zero-Build" philosophy, using vanilla JavaScript and Tailwind CSS (via CDN) to ensure instant deployment and easy editing.

🏗️ Architecture Overview

The site does not use a framework like React or Vue. Instead, it uses a custom Layout Engine to inject common UI elements (Header, Sidebar, Footer) at runtime.

Core Files (The "Brain")

js/common-layout.js:

Contains the CalculatorLayout.render() engine.

Responsibility: Wipes the <body> of a calculator page and dynamically rebuilds it with the standard Header, Breadcrumbs, Grid Layout, Sidebar (with Widgets/Ads), and Footer.

js/global.js:

Contains the CALCULATOR_REGISTRY (list of all tools).

Responsibility: Handles Global Search, Auto-Save (Drafts), and Sidebar Widgets (Voting/Share).

js/tailwind-config.js:

Responsibility: Centralized design system. Defines colors (brand-red), font sizes, and UI components (like .compact-input and .calc-card-compact).

🚀 How to Create a New Calculator

Do not copy old files. We now use a strict template that leverages the Layout Engine.

Step 1: Create the HTML File

Create a new file (e.g., finance/auto-loan.html) and paste this Standard Template:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Title | DailyCalc.org</title>
    <meta name="description" content="SEO description here...">
    
    <!-- Standard Imports -->
    <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
    <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
    <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600&display=swap)" rel="stylesheet">
    <link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css](https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css)">
    <link rel="stylesheet" href="../css/global.css">
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    <script src="../js/tailwind-config.js"></script>
    <script src="../js/global.js" defer></script>
    <script src="../js/common-layout.js" defer></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
    
    <!-- The Engine will fill this container -->
    <main id="calculator-layout"></main>

    <!-- SLOT 1: The Calculator Interface -->
    <div id="tool-slot" class="hidden">
        <div class="calc-tool-header">
            <i class="fa-solid fa-calculator"></i>
            <span class="text-xs font-medium">Tool Tagline</span>
        </div>
        <div class="flex flex-col gap-4 border-x border-b border-slate-400 bg-white p-3 shadow-sm rounded-b-md md:flex-row md:items-start">
            <!-- Inputs -->
            <div class="w-full bg-[#EEEEEE] p-4 rounded border border-slate-400">
                 <div class="input-row mb-3">
                    <label class="input-label w-[40%]">Input Label</label>
                    <input type="number" id="uniqueInputId" class="compact-input w-[60%]">
                 </div>
                 <button id="calcButton" class="w-full bg-[#518428] text-white font-bold py-2 rounded mt-2">Calculate</button>
            </div>
            <!-- Results -->
            <div class="flex-1">
                 <div class="result-header rounded-t-md">
                     <span class="font-bold">Result</span>
                     <span class="text-xl font-bold" id="resultDisplay">-</span>
                 </div>
            </div>
        </div>
    </div>

    <!-- SLOT 2: SEO Content -->
    <div id="seo-slot" class="hidden">
        <div class="content-section">
            <div class="bg-gradient-to-r from-brand-dark to-brand-red px-4 py-3">
                <h2 class="font-bold text-white">Guide</h2>
            </div>
            <div class="p-5 text-xs text-slate-600 leading-relaxed">
                <p>Educational content goes here...</p>
            </div>
        </div>
    </div>

    <!-- Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Render Layout
            CalculatorLayout.render({
                title: "Tool Title",
                category: "Finance", // Must match key in CALCULATOR_REGISTRY
                toolId: "tool-slot",
                seoId: "seo-slot"
            });

            // 2. Calculator Logic
            // ... your JS here ...
        });
    </script>
</body>
</html>


Step 2: Register the Tool

Open js/global.js and add your new tool to the CALCULATOR_REGISTRY object so it appears in search and sidebars.

const CALCULATOR_REGISTRY = {
    'Finance': [
        // ... existing tools ...
        { name: "New Tool Name", url: "/finance/new-tool.html", icon: "fa-solid-icon-name" }
    ]
}


🧠 System Features (Automated)

1. Auto-Save (Drafts)

How it works: js/global.js automatically scans for any <input> or <select> with an id.

Requirement: Always give your inputs a unique id.

Behavior: Saves value to sessionStorage on change. Restores on reload.

2. Global Search

How it works: The search bar (in Header) indexes the CALCULATOR_REGISTRY on page load.

Requirement: Ensure your tool is registered in js/global.js.

3. Dynamic Sidebar

How it works: CalculatorLayout automatically injects the sidebar.

Widgets: It includes the "Vote/Feedback" widget and a list of "Related Tools" based on the category you pass to .render().

🎨 Design System (Tailwind Config)

Use these custom classes defined in js/tailwind-config.js to maintain consistency:

.compact-input: The standard input field (right-aligned, small text).

.calc-tool-header: The gradient header bar above the tool.

.result-header: The green header for results.

.content-section: A white card container with border and shadow.

.calc-card-compact: The subcategory buttons found on Category pages.
