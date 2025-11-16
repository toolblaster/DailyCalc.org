/*
  DailyCalc.org Global Utilities
  This file is for site-wide JavaScript logic that needs to run on all pages
  but is NOT directly related to injecting the header/footer layout.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Utility: Hide Scrollbar Class ---
    // Injects a small CSS rule to hide scrollbars for elements with the .hide-scrollbar class.
    // This was moved from common-layout.js to be a global utility.
    const addScrollbarHideStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    };

    addScrollbarHideStyle();

    // --- More Global Logic Can Go Here ---
    // e.g., Cookie consent banner logic, accessibility helpers, etc.

});
