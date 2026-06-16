/*
  DailyCalc.org Global Utilities (js/global.js)
  --------------------------------------------------
  [2025-11-28] HistoryManager: Enforced "Single Entry Per Tool" policy for ALL calculators.
  [2025-11-28] WishlistManager: Added for managing Favorite tools via localStorage.
  [2025-12-05] WishlistManager: Updated to store Icons. SidebarWidget now detects icons automatically.
  [2025-12-06] Registry Update: Updated Length Converter URL to length-converter.html.
  [2026-06-16] Search Cleanup: Completely removed GlobalSearch module and search indexes to optimize performance and remove unused codes.
  [2026-06-16] Responsive MatchMedia: Updated matchMedia query breakpoint to 1024px to match layout system desktop structures perfectly.
  [2026-06-16] Scroll Lock Fix: Added html scroll lock (document.documentElement) along with body to completely freeze background scrolling when Wishlist Drawer or Mobile Menu is open.
  [2026-06-16] Header Search Removal: Removed both desktop and mobile search buttons from headerHTML as requested for a future alternative layout placeholder.
  [2026-06-16] Footer Share Integration: Embedded the beautiful, modern social share links into footerHTML and initialized dynamic sharing URL handlers.
  [2026-06-16] Sidebar Clean: Completely removed voting thumbs widget and ad references; only Wishlist module is loaded.
*/

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
        { name: "Length Converter", url: "/converters/length-converter.html", icon: "fa-ruler" },
        { name: "Weight Converter", url: "/converters/weight.html", icon: "fa-weight-hanging" },
        { name: "Temperature", url: "/converters/temperature.html", icon: "fa-temperature-half" }
    ]
};

// --- HISTORY MANAGER ---
const HistoryManager = {
    save(toolName, inputs, result, url) {
        if (!toolName || !result) return;

        let history = [];
        try {
            history = JSON.parse(localStorage.getItem('dailyCalcHistory')) || [];
        } catch (e) {
            history = [];
        }

        const newItem = {
            calculator: toolName,
            inputs: inputs,
            result: result,
            timestamp: new Date().toISOString(),
            url: url || window.location.href
        };

        // 1. Remove ANY existing entry for this specific tool (Clean Slate)
        history = history.filter(item => item.calculator !== toolName);
        
        // 2. Add the new entry to the top
        history.unshift(newItem);

        // 3. Global Cap
        if (history.length > 100) history = history.slice(0, 100);

        localStorage.setItem('dailyCalcHistory', JSON.stringify(history));
    }
};
window.HistoryManager = HistoryManager;

// --- WISHLIST MANAGER ---
const WishlistManager = {
    getItems() {
        try {
            return JSON.parse(localStorage.getItem('dailyCalcWishlist')) || [];
        } catch (e) {
            return [];
        }
    },

    add(name, category, url, icon) {
        const items = this.getItems();
        // Prevent duplicates
        if (items.some(i => i.url === url)) return;
        
        items.unshift({
            name: name,
            category: category,
            url: url,
            icon: icon || 'fa-calculator', 
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('dailyCalcWishlist', JSON.stringify(items));
        this.dispatchUpdate();
    },

    remove(url) {
        let items = this.getItems();
        items = items.filter(i => i.url !== url);
        localStorage.setItem('dailyCalcWishlist', JSON.stringify(items));
        this.dispatchUpdate();
    },

    toggle(name, category, url, icon) {
        const items = this.getItems();
        const exists = items.some(i => i.url === url);
        if (exists) {
            this.remove(url);
            return false; 
        } else {
            this.add(name, category, url, icon);
            return true; 
        }
    },

    has(url) {
        const items = this.getItems();
        return items.some(i => i.url === url);
    },

    getCount() {
        return this.getItems().length;
    },

    dispatchUpdate() {
        window.dispatchEvent(new Event('wishlistUpdated'));
    }
};
window.WishlistManager = WishlistManager;

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

        // Match the lg screen layout breakpoint (1024px) instead of mobile breakpoint (768px)
        window.matchMedia('(min-width: 1024px)').addEventListener('change', () => {
            this.placeWidget();
        });
    },

    placeWidget() {
        const mobileContainer = document.getElementById('mobile-widget-placeholder');
        const desktopContainer = document.getElementById('desktop-widget-placeholder');
        const oldContainer = document.getElementById('sidebar-widget-container');

        const isDesktop = window.matchMedia('(min-width: 1024px)').matches; // Updated to 1024px

        if (isDesktop) {
            if (desktopContainer) desktopContainer.appendChild(this.widgetElement);
            else if (oldContainer) oldContainer.appendChild(this.widgetElement);
        } else {
            if (mobileContainer) mobileContainer.appendChild(this.widgetElement);
            else if (oldContainer) oldContainer.appendChild(this.widgetElement);
        }
    },

    createWidget() {
        this.widgetElement = document.createElement('div');
        this.widgetElement.className = 'content-section p-4 mb-4 text-xs';
        
        const toolsHTML = `
            <div id="static-tools" class="w-full">
                <!-- Wishlist Toggle Button in Sidebar (Simplified full width) -->
                <button class="widget-btn w-full gap-2" id="sidebar-wishlist-toggle" title="Add/Remove from Wishlist">
                    <i class="fa-regular fa-heart text-slate-400"></i> <span>Wishlist</span>
                </button>
            </div>
        `;

        this.widgetElement.innerHTML = toolsHTML;
        
        // Attach Wishlist Logic
        const wishlistBtn = this.widgetElement.querySelector('#sidebar-wishlist-toggle');
        if (wishlistBtn && window.WishlistManager) {
            const currentUrl = window.location.href;
            
            const updateBtnState = () => {
                const isSaved = window.WishlistManager.has(currentUrl);
                const icon = wishlistBtn.querySelector('i');
                const text = wishlistBtn.querySelector('span');
                
                if (isSaved) {
                    icon.classList.remove('fa-regular', 'text-slate-400');
                    icon.classList.add('fa-solid', 'text-brand-red');
                    wishlistBtn.classList.add('active', 'border-brand-red', 'text-brand-red');
                    text.textContent = 'Saved';
                } else {
                    icon.classList.remove('fa-solid', 'text-brand-red');
                    icon.classList.add('fa-regular', 'text-slate-400');
                    wishlistBtn.classList.remove('active', 'border-brand-red', 'text-brand-red');
                    text.textContent = 'Wishlist';
                }
            };

            wishlistBtn.addEventListener('click', () => {
                const title = document.title.split('|')[0].trim();
                const category = document.querySelector('.calc-subcat-title')?.innerText || "Tool"; 
                
                // Logic to find the correct icon for this tool
                let foundCat = "Tool";
                let foundIcon = "fa-calculator";
                
                // 1. Try to find in Registry
                for(const [cat, tools] of Object.entries(CALCULATOR_REGISTRY)) {
                    const tool = tools.find(t => window.location.pathname.includes(t.url));
                    if(tool) {
                        foundCat = cat;
                        foundIcon = tool.icon;
                        break;
                    }
                }

                // 2. Fallback: try to grab icon from the page header if not found
                if (foundIcon === "fa-calculator") {
                     const domIcon = document.querySelector('.calc-tool-header i');
                     if(domIcon) {
                        domIcon.classList.forEach(cls => {
                            if(cls.startsWith('fa-') && cls !== 'fa-solid' && cls !== 'fa-regular') foundIcon = cls;
                        });
                     }
                }

                // Pass the found icon to the Manager
                window.WishlistManager.toggle(title, foundCat, currentUrl, foundIcon);
                updateBtnState();
            });

            // Initial check
            updateBtnState();
            window.addEventListener('wishlistUpdated', updateBtnState);
        }
    }
};

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

window.DailyLineChart = class {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.options = Object.assign({
            color: '#518428', 
            strokeWidth: 3,
            fillArea: true,
            height: 200,
            formatY: (val) => val.toLocaleString(),
            formatX: (val) => val,
            padding: { top: 10, right: 10, bottom: 20, left: 10 }
        }, options);

        this.data = this.options.data || [];
        this.svg = null;
        this.tooltip = null;
        
        this.init();
        if (this.data.length) this.draw();
        
        window.addEventListener('resize', () => this.draw());
    }

    init() {
        this.container.innerHTML = '';
        this.container.style.position = 'relative';
        
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.svg.style.overflow = "visible";
        this.container.appendChild(this.svg);

        this.tooltip = document.createElement("div");
        this.tooltip.className = "absolute bg-slate-800 text-white text-[10px] px-2 py-1 rounded pointer-events-none opacity-0 transition-opacity shadow-lg z-10 whitespace-nowrap";
        this.container.appendChild(this.tooltip);

        this.overlay = document.createElement("div");
        this.overlay.className = "absolute inset-0 z-0 cursor-crosshair";
        this.container.appendChild(this.overlay);

        this.overlay.addEventListener("mousemove", (e) => this.handleHover(e));
        this.overlay.addEventListener("touchmove", (e) => this.handleHover(e.touches[0]));
        this.overlay.addEventListener("mouseleave", () => this.hideTooltip());
        this.overlay.addEventListener("touchend", () => this.hideTooltip());
    }

    update(newData) {
        this.data = newData;
        this.draw();
    }

    draw() {
        if (!this.data || this.data.length < 2) return;

        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height || this.options.height;
        
        this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        this.svg.innerHTML = ''; 

        const xVals = this.data.map(d => d.x);
        const yVals = this.data.map(d => d.y);
        const minX = Math.min(...xVals);
        const maxX = Math.max(...xVals);
        const minY = 0; 
        const maxY = Math.max(...yVals) * 1.05; 

        const getX = (val) => {
            const pct = (val - minX) / (maxX - minX);
            return this.options.padding.left + pct * (width - this.options.padding.left - this.options.padding.right);
        };
        const getY = (val) => {
            const pct = (val - minY) / (maxY - minY);
            return height - this.options.padding.bottom - (pct * (height - this.options.padding.top - this.options.padding.bottom));
        };

        const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        [0, 0.25, 0.5, 0.75, 1].forEach(tick => {
            const val = minY + tick * (maxY - minY);
            const y = getY(val);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", this.options.padding.left);
            line.setAttribute("x2", width - this.options.padding.right);
            line.setAttribute("y1", y);
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#e2e8f0"); 
            line.setAttribute("stroke-width", "1");
            if (tick === 0) line.setAttribute("stroke-width", "2"); 
            gridGroup.appendChild(line);
        });
        this.svg.appendChild(gridGroup);

        let pathD = `M ${getX(this.data[0].x)} ${getY(this.data[0].y)}`;
        this.data.forEach((p, i) => {
            if (i === 0) return;
            pathD += ` L ${getX(p.x)} ${getY(p.y)}`;
        });

        if (this.options.fillArea) {
            const areaD = pathD + ` L ${getX(this.data[this.data.length-1].x)} ${getY(minY)} L ${getX(this.data[0].x)} ${getY(minY)} Z`;
            const areaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            areaPath.setAttribute("d", areaD);
            areaPath.setAttribute("fill", this.options.color);
            areaPath.setAttribute("opacity", "0.1"); 
            this.svg.appendChild(areaPath);
        }

        const linePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        linePath.setAttribute("d", pathD);
        linePath.setAttribute("fill", "none");
        linePath.setAttribute("stroke", this.options.color);
        linePath.setAttribute("stroke-width", this.options.strokeWidth);
        linePath.setAttribute("stroke-linecap", "round");
        linePath.setAttribute("stroke-linejoin", "round");
        this.svg.appendChild(linePath);

        this.scale = { getX, getY, minX, maxX, width, height };
    }

    handleHover(e) {
        if (!this.scale || !this.data) return;
        const rect = this.container.getBoundingClientRect();
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const offsetX = clientX - rect.left;

        const chartWidth = this.scale.width - this.options.padding.left - this.options.padding.right;
        const clickPct = (offsetX - this.options.padding.left) / chartWidth;
        const rawX = this.scale.minX + clickPct * (this.scale.maxX - this.scale.minX);
        
        const closest = this.data.reduce((prev, curr) => 
            Math.abs(curr.x - rawX) < Math.abs(prev.x - rawX) ? curr : prev
        );

        if (closest) {
            const cx = this.scale.getX(closest.x);
            const cy = this.scale.getY(closest.y);

            let circle = this.svg.querySelector('.hover-circle');
            if (!circle) {
                circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("class", "hover-circle");
                circle.setAttribute("r", "5");
                circle.setAttribute("fill", "#fff");
                circle.setAttribute("stroke", this.options.color);
                circle.setAttribute("stroke-width", "2");
                this.svg.appendChild(circle);
            }
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.style.display = 'block';

            this.tooltip.innerHTML = `
                <div class="font-bold">${this.options.formatX(closest.x)}</div>
                <div>${this.options.formatY(closest.y)}</div>
            `;
            this.tooltip.style.opacity = 1;
            
            const tipRect = this.tooltip.getBoundingClientRect();
            let left = cx - (tipRect.width / 2);
            let top = cy - tipRect.height - 10;

            if (left < 0) left = 10;
            if (left + tipRect.width > rect.width) left = rect.width - tipRect.width - 10;

            this.tooltip.style.left = `${left}px`;
            this.tooltip.style.top = `${top}px`;
        }
    }

    hideTooltip() {
        if (this.tooltip) this.tooltip.style.opacity = 0;
        const circle = this.svg ? this.svg.querySelector('.hover-circle') : null;
        if (circle) circle.style.display = 'none';
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
            header.innerHTML = `<h2 class="text-sm font-bold text-white text-center">${category} Calculators</h2>`;
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
