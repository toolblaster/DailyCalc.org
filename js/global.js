/*
  DailyCalc.org Global Utilities
  - Calculator Registry
  - Global Search
  - Sidebar Widget (Voting, Sharing, Tools)
  - Auto-Save / Drafts
  - Dynamic SEO
*/

// --- CENTRAL DATA: Calculator Registry ---
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
    modalHTML: `
        <div id="searchModal" class="fixed inset-0 z-[100] hidden" aria-labelledby="searchModalTitle" role="dialog" aria-modal="true">
            <div id="searchModalOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity opacity-0"></div>
            <div id="searchModalContainer" class="relative flex min-h-full items-start justify-center p-4 pt-10 sm:p-4 pointer-events-none">
                <div id="searchModalContent" class="pointer-events-auto relative w-full max-w-lg transform-gpu overflow-hidden rounded-xl bg-white shadow-2xl transition-all scale-95 opacity-0">
                    <div class="relative border-b border-slate-100 bg-white p-3">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-magnifying-glass text-slate-400 text-base ml-2"></i>
                            <input type="search" id="globalSearchInput" placeholder="Search calculators..." class="flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none" autocomplete="off" />
                            <button id="closeSearchModalButton" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-red transition">
                                <span class="sr-only">Close</span><i class="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                    </div>
                    <div id="searchResultsWrapper" class="max-h-[50vh] overflow-y-auto bg-slate-50/50 p-2">
                        <div id="searchInitialState" class="py-8 text-center text-slate-400">
                            <i class="fa-regular fa-keyboard text-2xl mb-2 opacity-50"></i><p class="text-xs">Type to search...</p>
                        </div>
                        <div id="searchNoResultsState" class="hidden py-8 text-center text-slate-400">
                            <i class="fa-regular fa-face-frown-open text-2xl mb-2 opacity-50"></i><p class="text-xs">No results for "<span id="searchNoResultsQuery" class="font-medium text-slate-600"></span>"</p>
                        </div>
                        <div id="searchResultsContainer" class="space-y-1"></div>
                    </div>
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
                this.searchIndex.push({ ...tool, category: category, searchText: `${tool.name} ${category}`.toLowerCase() });
            });
        }
    },
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.js-open-search')) { e.preventDefault(); this.open(); }
        });
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) { this.close(); }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); this.open(); }
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
        if (cleanQuery.length === 0) { this.resetResults(); return; }
        this.initialState.classList.add('hidden');
        const results = this.searchIndex.filter(item => item.searchText.includes(cleanQuery));
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

// --- SIDEBAR WIDGET MODULE ---
const SidebarWidget = {
    widgetElement: null,

    init() {
        const mobileContainer = document.getElementById('mobile-widget-placeholder');
        const desktopContainer = document.getElementById('desktop-widget-placeholder');
        const oldContainer = document.getElementById('sidebar-widget-container');
        
        if (!mobileContainer && !desktopContainer && !oldContainer) return;

        this.createWidget();
        this.placeWidget();

        window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
            this.placeWidget();
        });
    },

    placeWidget() {
        const mobileContainer = document.getElementById('mobile-widget-placeholder');
        const desktopContainer = document.getElementById('desktop-widget-placeholder');
        const oldContainer = document.getElementById('sidebar-widget-container');

        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        if (isDesktop) {
            if (desktopContainer) desktopContainer.appendChild(this.widgetElement);
            else if (oldContainer) oldContainer.appendChild(this.widgetElement);
        } else {
            if (mobileContainer) mobileContainer.appendChild(this.widgetElement);
            else if (oldContainer) oldContainer.appendChild(this.widgetElement);
        }
    },

    createWidget() {
        const pageKey = 'vote_' + window.location.pathname;
        const hasVoted = localStorage.getItem(pageKey);
        
        const urlHash = Array.from(window.location.pathname).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        let serverBaseCount = (Math.abs(urlHash) % 31) + 9; 
        
        let displayCount = serverBaseCount;
        if (hasVoted === 'yes') {
             displayCount = serverBaseCount + 1;
        } 

        this.widgetElement = document.createElement('div');
        this.widgetElement.className = 'content-section p-4 mb-4 text-xs';
        
        const voteHTML = !hasVoted ? `
            <div id="vote-section" class="mb-4 border-b border-slate-100 pb-4">
                <p class="text-slate-600 font-medium mb-3 text-center">Did we solve your problem today?</p>
                <div class="flex gap-2 items-center justify-center">
                    <button id="vote-yes" class="widget-btn gap-2 hover:border-brand-green hover:text-brand-green w-auto px-4">
                        <i class="fa-regular fa-thumbs-up"></i> <span class="font-bold">${displayCount}</span>
                    </button>
                    <button id="vote-no" class="widget-btn gap-1 hover:border-red-400 hover:text-red-500 w-auto px-3">
                        <i class="fa-regular fa-thumbs-down"></i>
                    </button>
                </div>
            </div>
        ` : this.getResultHTML(displayCount, hasVoted);

        const toolsHTML = `
            <div id="static-tools" class="grid grid-cols-2 gap-2">
                <div class="relative w-full">
                    <button class="widget-btn w-full gap-2" id="share-trigger">
                        <i class="fa-solid fa-share-nodes text-slate-400"></i> Share
                    </button>
                    <div id="share-menu" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden grid-cols-4 gap-1 bg-white border border-slate-200 shadow-lg rounded-lg p-2 w-auto z-20 min-w-[160px]">
                        <a href="#" data-share="facebook" class="flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1877F2]" title="Facebook">
                            <i class="fa-brands fa-facebook text-lg"></i>
                        </a>
                        <a href="#" data-share="whatsapp" class="flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 text-slate-600 hover:text-[#25D366]" title="WhatsApp">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </a>
                        <a href="#" data-share="twitter" class="flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 text-slate-600 hover:text-black" title="X (Twitter)">
                            <i class="fa-brands fa-x-twitter text-lg"></i>
                        </a>
                        <a href="#" data-share="telegram" class="flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 text-slate-600 hover:text-[#229ED9]" title="Telegram">
                            <i class="fa-brands fa-telegram text-lg"></i>
                        </a>
                    </div>
                </div>
                <button class="widget-btn w-full gap-2" id="cite-btn" title="Cite this page">
                    <i class="fa-solid fa-quote-right text-slate-400"></i> Cite
                </button>
            </div>
        `;

        this.widgetElement.innerHTML = voteHTML + toolsHTML;
        this.attachShareListeners(this.widgetElement);
        
        this.widgetElement.querySelector('#cite-btn').addEventListener('click', () => {
             prompt('Citation for this tool:', `DailyCalc.org. (${new Date().getFullYear()}). ${document.title}. Retrieved from ${window.location.href}`);
        });

        if (!hasVoted) {
            const yesBtn = this.widgetElement.querySelector('#vote-yes');
            const noBtn = this.widgetElement.querySelector('#vote-no');
            yesBtn.addEventListener('click', () => {
                localStorage.setItem(pageKey, 'yes');
                this.transitionToResult(this.widgetElement, serverBaseCount + 1, 'yes');
            });
            noBtn.addEventListener('click', () => {
                localStorage.setItem(pageKey, 'no');
                this.transitionToResult(this.widgetElement, serverBaseCount, 'no');
            });
        }
    },

    getResultHTML(count, voteType) {
        const thumbClass = voteType === 'yes' ? 'text-brand-green' : 'text-slate-400';
        const iconClass = voteType === 'yes' ? 'fa-solid' : 'fa-regular';
        return `
            <div id="vote-section" class="fade-in mb-4 border-b border-slate-100 pb-4 text-center">
                <div class="flex items-center gap-2 justify-center mb-2">
                    <i class="${iconClass} fa-thumbs-up ${thumbClass} text-lg"></i>
                    <span class="text-slate-700 font-medium"><strong>${count}</strong> people found this helpful</span>
                </div>
                <div class="text-[10px] text-slate-400">Thanks for your feedback!</div>
            </div>
        `;
    },

    transitionToResult(wrapper, count, voteType) {
        const voteSection = wrapper.querySelector('#vote-section');
        if (voteSection) {
            voteSection.outerHTML = this.getResultHTML(count, voteType);
        }
    },

    attachShareListeners(wrapper) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const shareTrigger = wrapper.querySelector('#share-trigger');
        const shareMenu = wrapper.querySelector('#share-menu');

        if (shareTrigger && shareMenu) {
            shareTrigger.addEventListener('click', (e) => {
                e.stopPropagation(); 
                shareMenu.classList.toggle('hidden');
                shareMenu.classList.toggle('grid');
            });
            document.addEventListener('click', (e) => {
                if (!shareMenu.contains(e.target) && e.target !== shareTrigger) {
                    shareMenu.classList.add('hidden');
                    shareMenu.classList.remove('grid');
                }
            });
        }
        
        wrapper.querySelectorAll('[data-share]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.dataset.share; 
                let shareUrl = '';
                if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                if(shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
                if(shareMenu) {
                    shareMenu.classList.add('hidden');
                    shareMenu.classList.remove('grid');
                }
            });
        });
    }
};

// --- AUTO-SAVE / DRAFTS MODULE ---
const AutoSave = {
    init() {
        const pageId = window.location.pathname;
        const elements = document.querySelectorAll('input, select, textarea');
        elements.forEach(el => {
            if (!el.id || ['submit', 'button', 'hidden', 'password', 'file', 'reset'].includes(el.type)) return;
            const storageKey = `draft_${pageId}_${el.id}`;
            const savedValue = sessionStorage.getItem(storageKey);
            if (savedValue !== null) {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    el.checked = (savedValue === 'true');
                } else {
                    el.value = savedValue;
                }
                try {
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                } catch (e) {
                    console.warn('AutoSave dispatch failed for', el.id);
                }
            }
            const saveHandler = (e) => {
                let valToSave;
                if (el.type === 'checkbox' || el.type === 'radio') {
                    valToSave = el.checked;
                } else {
                    valToSave = el.value;
                }
                sessionStorage.setItem(storageKey, valToSave);
            };
            el.addEventListener('input', saveHandler);
            el.addEventListener('change', saveHandler);
        });
    }
};

// --- DYNAMIC SEO MODULE ---
const DynamicSEO = {
    init() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        if (path.includes('mortgage-calculator.html') && params.has('price')) {
            const price = parseFloat(params.get('price'));
            if (!isNaN(price)) {
                const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
                const newTitle = `Mortgage Calculator - ${formattedPrice} Loan Estimate`;
                document.title = newTitle;
                const newDesc = `Estimate monthly payments, taxes, and PMI for a ${formattedPrice} home loan. Free, fast, and accurate mortgage calculator.`;
                this.updateMeta('description', newDesc);
                this.updateMeta('og:title', newTitle);
                this.updateMeta('og:description', newDesc);
            }
        }
    },
    updateMeta(name, content) {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) element = document.querySelector(`meta[property="${name}"]`);
        if (element) {
            element.setAttribute('content', content);
        } else {
            const meta = document.createElement('meta');
            if (name.startsWith('og:')) meta.setAttribute('property', name);
            else meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const addScrollbarHideStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .fade-in { animation: fadeIn 0.3s ease-in; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `;
        document.head.appendChild(style);
    };
    addScrollbarHideStyle();

    GlobalSearch.init();
    SidebarWidget.init();
    AutoSave.init(); 
    DynamicSEO.init();

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
                li.innerHTML = `<a href="${link.url}" class="sidebar-nav-link ${activeClass}"><i class="fa-solid ${link.icon} ${iconColor}"></i> ${link.name}</a>`;
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
