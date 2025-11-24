/*
  DailyCalc.org Global Utilities
  This file is for site-wide JavaScript logic that needs to run on all pages.
  It now includes the central registry for calculator links and the logic to populate dynamic widgets.
*/

// --- CENTRAL DATA: Calculator Registry ---
// Edit this list to update links in the sidebar across the entire site.
const CALCULATOR_REGISTRY = {
    'Finance': [
        { name: "Mortgage Calculator", url: "/finance/mortgage-calculator.html", icon: "fa-house-chimney" },
        { name: "Loan Calculator", url: "/finance/loan-calculator.html", icon: "fa-hand-holding-dollar" },
        { name: "Auto Loan Calculator", url: "/finance/auto-loan-calculator.html", icon: "fa-car" },
        { name: "Interest Calculator", url: "/finance/interest-calculator.html", icon: "fa-percent" },
        { name: "Payment Calculator", url: "/finance/payment-calculator.html", icon: "fa-credit-card" },
        { name: "Retirement Calculator", url: "/finance/retirement-calculator.html", icon: "fa-piggy-bank" },
        { name: "Amortization Calc", url: "/finance/amortization-calculator.html", icon: "fa-table-list" },
        { name: "Investment Calculator", url: "/finance/investment-calculator.html", icon: "fa-chart-line" },
        { name: "Inflation Calculator", url: "/finance/inflation-calculator.html", icon: "fa-money-bill-trend-up" },
        { name: "Finance Calculator", url: "/finance/finance-calculator.html", icon: "fa-calculator" }
    ],
    'Health': [
        { name: "BMI Calculator", url: "/health/bmi-calculator.html", icon: "fa-weight-scale" },
        { name: "Body Fat Calculator", url: "/health/body-fat.html", icon: "fa-ruler-vertical" },
        { name: "Calorie Calculator", url: "/health/calorie-calculator.html", icon: "fa-utensils" },
        { name: "Ideal Weight", url: "/health/ideal-weight.html", icon: "fa-child-reaching" },
        { name: "Water Intake", url: "/health/water-intake.html", icon: "fa-glass-water" }
    ],
    'Everyday Life': [
        { name: "Age Calculator", url: "/everyday-life/age-calculator.html", icon: "fa-cake-candles" },
        { name: "Date Difference", url: "/everyday-life/date-difference.html", icon: "fa-calendar-days" },
        { name: "Time Duration", url: "/everyday-life/time-duration.html", icon: "fa-hourglass-half" },
        { name: "Fuel Cost", url: "/everyday-life/fuel-cost.html", icon: "fa-gas-pump" }
    ],
    'Converters': [
        { name: "Length Converter", url: "/converters/length.html", icon: "fa-ruler" },
        { name: "Weight Converter", url: "/converters/weight.html", icon: "fa-weight-hanging" },
        { name: "Temperature", url: "/converters/temperature.html", icon: "fa-temperature-half" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Utility: Hide Scrollbar Class ---
    const addScrollbarHideStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    };
    addScrollbarHideStyle();

    // --- DYNAMIC WIDGET LOADER ---
    // Looks for elements with data-widget="related-tools" and populates them.
    const loadSidebarWidget = () => {
        const widgets = document.querySelectorAll('[data-widget="related-tools"]');
        
        widgets.forEach(widget => {
            const category = widget.dataset.category;
            const links = CALCULATOR_REGISTRY[category];

            if (!links) {
                console.warn(`No links found for category: ${category}`);
                return;
            }

            // 1. Create Header
            const header = document.createElement('div');
            header.className = 'bg-gradient-to-r from-brand-dark to-brand-red px-4 py-2';
            header.innerHTML = `<h3 class="text-sm font-bold text-white text-center">${category} Calculators</h3>`;
            
            // 2. Create List Container
            const listContainer = document.createElement('div');
            listContainer.className = 'p-4';
            
            const ul = document.createElement('ul');
            ul.className = 'space-y-2';

            // 3. Generate Links
            // Get current path to highlight active link or remove it
            const currentPath = window.location.pathname;

            links.forEach(link => {
                const li = document.createElement('li');
                
                // Check if this is the active page
                const isActive = currentPath.includes(link.url);
                const activeClass = isActive ? 'font-bold text-brand-red' : '';
                const iconColor = isActive ? 'text-brand-red' : 'text-slate-400';

                li.innerHTML = `
                    <a href="${link.url}" class="sidebar-nav-link ${activeClass}">
                        <i class="fa-solid ${link.icon} ${iconColor}"></i> 
                        ${link.name}
                    </a>
                `;
                ul.appendChild(li);
            });

            listContainer.appendChild(ul);
            
            // 4. Append to Widget
            widget.innerHTML = ''; // Clear any placeholder
            widget.appendChild(header);
            widget.appendChild(listContainer);
        });
    };

    loadSidebarWidget();

});
