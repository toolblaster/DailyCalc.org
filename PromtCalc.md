"Create a new HTML page for [Insert Calculator Name] using the DailyCalc architecture."

Requirements:

No Header/Footer/Sidebar: Do not generate these. Use <main id="calculator-layout"> and let common-layout.js handle the injection.

Tool Slot: Put the calculator interface inside <div id="tool-slot" class="hidden">.

SEO Slot: Put the guide/text content inside <div id="seo-slot" class="hidden">.

Styling: Use the custom Tailwind classes defined in tailwind-config.js:

Inputs: class="compact-input"

Tool Header: class="calc-tool-header"

Result Header: class="result-header"

Accessibility (MANDATORY):

Explicit Labels: Every input must have a <label for="id">. Do not rely on visual proximity.

ARIA Labels: For inputs without visible text labels (like unit dropdowns or split date fields), use aria-label="Description".

Contrast: The .compact-input class handles contrast automatically. Do not override text colors with lighter shades.

Initialisation: At the bottom, call CalculatorLayout.render() with the correct title and category.

Imports: Include the standard DailyCalc JS/CSS imports (Tailwind CDN, FontAwesome, global.css, global.js, common-layout.js).
