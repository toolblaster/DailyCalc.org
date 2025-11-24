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

// --- GLOBAL SEARCH MODULE ---
const GlobalSearch = {
    // HTML Template for the Search Modal
    // MODIFIED: Made compact (max-w-lg, p-3 header, reduced heights)
    modalHTML: `
        <div id="searchModal" class="fixed inset-0 z-[100] hidden" aria-labelledby="searchModalTitle" role="dialog" aria-modal="true">
            <!-- Overlay -->
            <div id="searchModalOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity opacity-0"></div>

            <!-- Modal Content Container -->
            <div id="searchModalContainer" class="relative flex min-h-full items-start justify-center p-4 pt-10 sm:p-4 pointer-events-none">
                <div id="searchModalContent" class="pointer-events-auto relative w-full max-w-lg transform-gpu overflow-hidden rounded-xl bg-white shadow-2xl transition-all scale-95 opacity-0">
                    
                    <!-- Search Input Header -->
                    <div class="relative border-b border-slate-100 bg-white p-3">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-magnifying-glass text-slate-400 text-base ml-2"></i>
                            <input
                                type="search"
                                id="globalSearchInput"
                                placeholder="Search calculators..."
                                class="flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                autocomplete="off"
                            />
                            <button id="closeSearchModalButton" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-red transition">
                                <span class="sr-only">Close</span>
                                <i class="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Search Results Area -->
                    <div id="searchResultsWrapper" class="max-h-[50vh] overflow-y-auto bg-slate-50/50 p-2">
                        <!-- Initial State -->
                        <div id="searchInitialState" class="py-8 text-center text-slate-400">
                            <i class="fa-regular fa-keyboard text-2xl mb-2 opacity-50"></i>
                            <p class="text-xs">Type to search...</p>
                        </div>

                        <!-- No Results State -->
                        <div id="searchNoResultsState" class="hidden py-8 text-center text-slate-400">
                            <i class="fa-regular fa-face-frown-open text-2xl mb-2 opacity-50"></i>
                            <p class="text-xs">No results for "<span id="searchNoResultsQuery" class="font-medium text-slate-600"></span>"</p>
                        </div>
                        
                        <!-- Results Container -->
                        <div id="searchResultsContainer" class="space-y-1">
                            <!-- Results injected here -->
                        </div>
                    </div>
                    
                    <!-- Footer Hint -->
                    <div class="bg-slate-50 px-3 py-1.5 text-right border-t border-slate-100">
                        <span class="text-[9px] text-slate-400 font-medium tracking-wide uppercase">Esc to close</span>
                    </div>
                </div>
            </div>
        </div>
    `,

    searchIndex: [],

    init() {
        this.buildIndex();
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = this.modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);

        this.modal = document.getElementById('searchModal');
        this.overlay = document.getElementById('searchModalOverlay');
        this.content = document.getElementById('searchModalContent');
        this.input = document.getElementById('globalSearchInput');
        this.resultsContainer = document.getElementById('searchResultsContainer');
        this.initialState = document.getElementById('searchInitialState');
        this.noResultsState = document.getElementById('searchNoResultsState');
        this.noResultsQuery = document.getElementById('searchNoResultsQuery');
        this.closeBtn = document.getElementById('closeSearchModalButton');

        this.bindEvents();
    },

    buildIndex() {
        this.searchIndex = [];
        for (const [category, tools] of Object.entries(CALCULATOR_REGISTRY)) {
            tools.forEach(tool => {
                this.searchIndex.push({
                    ...tool,
                    category: category,
                    searchText: `${tool.name} ${category}`.toLowerCase()
                });
            });
        }
    },

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.js-open-search')) {
                e.preventDefault();
                this.open();
            }
        });

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
        });

        this.input.addEventListener('input', (e) => this.handleInput(e.target.value));
    },

    open() {
        this.modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            this.overlay.classList.remove('opacity-0');
            this.content.classList.remove('scale-95', 'opacity-0');
            this.content.classList.add('scale-100', 'opacity-100');
        });
        setTimeout(() => this.input.focus(), 100);
        document.body.classList.add('overflow-hidden');
    },

    close() {
        this.overlay.classList.add('opacity-0');
        this.content.classList.remove('scale-100', 'opacity-100');
        this.content.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.input.value = '';
            this.resetResults();
            document.body.classList.remove('overflow-hidden');
        }, 200);
    },

    handleInput(query) {
        const cleanQuery = query.trim().toLowerCase();
        
        if (cleanQuery.length === 0) {
            this.resetResults();
            return;
        }

        this.initialState.classList.add('hidden');
        
        const results = this.searchIndex.filter(item => 
            item.searchText.includes(cleanQuery)
        );

        this.renderResults(results, query);
    },

    resetResults() {
        this.resultsContainer.innerHTML = '';
        this.initialState.classList.remove('hidden');
        this.noResultsState.classList.add('hidden');
    },

    renderResults(results, query) {
        this.resultsContainer.innerHTML = '';

        if (results.length === 0) {
            this.noResultsQuery.textContent = query;
            this.noResultsState.classList.remove('hidden');
            return;
        }

        this.noResultsState.classList.add('hidden');

        results.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            // MODIFIED: More compact result items
            link.className = 'group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200';
            
            const nameHTML = item.name.replace(new RegExp(query, 'gi'), match => `<span class="text-brand-red font-semibold">${match}</span>`);

            link.innerHTML = `
                <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm group-hover:border-brand-red/30 group-hover:text-brand-red transition-colors">
                    <i class="fa-solid ${item.icon} text-[10px]"></i>
                </div>
                <div class="flex flex-col">
                    <span class="text-xs font-medium text-slate-700 group-hover:text-slate-900">${nameHTML}</span>
                    <span class="text-[9px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-brand-red/70">${item.category}</span>
                </div>
                <div class="ml-auto text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all">
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
            `;
            this.resultsContainer.appendChild(link);
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    
    const addScrollbarHideStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    };
    addScrollbarHideStyle();

    GlobalSearch.init();

    const loadSidebarWidget = () => {
        const widgets = document.querySelectorAll('[data-widget="related-tools"]');
        
        widgets.forEach(widget => {
            const category = widget.dataset.category;
            const links = CALCULATOR_REGISTRY[category];

            if (!links) return;

            const header = document.createElement('div');
            header.className = 'bg-gradient-to-r from-brand-dark to-brand-red px-4 py-2';
            header.innerHTML = `<h3 class="text-sm font-bold text-white text-center">${category} Calculators</h3>`;
            
            const listContainer = document.createElement('div');
            listContainer.className = 'p-4';
            const ul = document.createElement('ul');
            ul.className = 'space-y-2';

            const currentPath = window.location.pathname;

            links.forEach(link => {
                const li = document.createElement('li');
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
            widget.innerHTML = ''; 
            widget.appendChild(header);
            widget.appendChild(listContainer);
        });
    };

    loadSidebarWidget();

});
