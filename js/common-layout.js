/*
  DailyCalc.org Common Layout Injector
  ...
  [2025-11-28] Added Wishlist (Favorites) feature replacing 'Suggest a Tool'.
  [2025-12-01] Fixed Wishlist header text color.
*/

const headerHTML = `
    <!-- Header -->
    <header class="bg-gradient-to-r from-brand-dark to-brand-red shadow-md sticky top-0 z-40">
        <div class="mx-auto max-w-[1050px] flex-col px-6 py-2 sm:py-3">
            <div class="flex w-full items-center justify-between gap-4">
                <!-- 1. Logo -->
                <div class="flex-shrink-0">
                    <a href="/" class="flex items-center gap-2 text-white" aria-label="DailyCalc.org homepage">
                        <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-white text-white">
                            <span class="text-base sm:text-lg font-semibold">DC</span>
                        </div>
                        <div>
                            <p class="font-heading text-lg sm:text-[20px] font-semibold">DailyCalc.org</p> 
                            <p class="text-[10px] sm:text-[11px] text-slate-300">Daily calculators for everyone.</p>
                        </div>
                    </a>
                </div>

                <!-- 2. Desktop Search Bar -->
                <div class="hidden flex-1 px-4 md:block">
                    <button class="js-open-search relative w-full max-w-xs mx-auto text-left" aria-label="Open search panel">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <i class="fa-solid fa-search text-slate-300"></i>
                        </div>
                        <div class="w-full rounded-full border border-white/30 bg-white/10 px-5 py-2 pl-10 text-sm text-slate-300 shadow-sm transition duration-200 hover:bg-white/20">
                            Search calculators...
                        </div>
                    </button>
                </div>
                
                <!-- 3. Mobile/Desktop Buttons -->
                <div class="flex-shrink-0">
                    <nav aria-label="Primary" class="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 md:hidden">
                        <a href="/" class="rounded-lg p-2 text-white transition hover:bg-white/10"><i class="fa-solid fa-house h-5 w-5"></i></a>
                        <button class="js-open-search rounded-lg p-2 text-white transition hover:bg-white/10"><i class="fa-solid fa-search h-5 w-5"></i></button>
                        <!-- Mobile Wishlist Button -->
                        <button id="mobileWishlistBtn" class="rounded-lg p-2 text-white transition hover:bg-white/10 relative">
                            <i class="fa-solid fa-heart h-5 w-5"></i>
                            <span id="mobileWishlistCount" class="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-yellow-400 text-[8px] font-bold text-black hidden">0</span>
                        </button>
                        <button id="mobileMenuToggle" class="rounded-lg p-2 text-white transition hover:bg-white/10"><i class="fa-solid fa-bars h-5 w-5" id="menuOpenIcon"></i><i class="fa-solid fa-xmark h-5 w-5 hidden" id="menuCloseIcon"></i></button>
                    </nav>

                    <div class="hidden items-center gap-3 md:flex">
                        <a href="/" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20"><i class="fa-solid fa-house"></i> Home</a>
                        <a href="/dashboard.html" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>
                        
                        <!-- Desktop Wishlist Button (Replaces Suggest a Tool) -->
                        <button id="desktopWishlistBtn" class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-soft transition hover:bg-slate-200 relative group">
                            <i class="fa-solid fa-heart group-hover:scale-110 transition-transform"></i> 
                            <span>Wishlist</span>
                            <span id="desktopWishlistCount" class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[10px] text-white hidden">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Wishlist Modal / Drawer -->
    <div id="wishlistDrawer" class="fixed inset-0 z-[60] hidden">
        <div id="wishlistOverlay" class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity opacity-0"></div>
        <div id="wishlistContent" class="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col">
            <div class="bg-gradient-to-r from-brand-dark to-brand-red p-4 text-white flex justify-between items-center shadow-md">
                <h3 class="font-bold text-lg flex items-center gap-2 text-white"><i class="fa-solid fa-heart text-white"></i> My Wishlist</h3>
                <button id="closeWishlistBtn" class="text-white/80 hover:text-white transition"><i class="fa-solid fa-xmark text-xl"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto p-4 bg-slate-50" id="wishlistListContainer">
                <!-- Items injected here -->
                <div class="text-center text-slate-400 mt-10">
                    <i class="fa-regular fa-heart text-4xl mb-3 opacity-30"></i>
                    <p class="text-xs">Your wishlist is empty.<br>Save tools to access them quickly.</p>
                </div>
            </div>
            <div class="p-4 border-t border-slate-200 bg-white">
                <a href="/dashboard.html" class="block w-full rounded-lg bg-slate-100 py-3 text-center text-xs font-bold text-slate-700 hover:bg-slate-200 transition">View Full Dashboard</a>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="md:hidden fixed inset-0 z-50 hidden">
        <div id="mobileMenuOverlay" class="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out"></div>
        <div id="mobileMenuContent" class="relative flex flex-col bg-gradient-to-r from-brand-dark to-brand-red h-full w-2/3 max-w-sm shadow-xl transform -translate-x-full transition-transform duration-300 ease-in-out">
            <div class="flex justify-end p-2"><button id="mobileMenuClose" class="rounded-lg p-2 text-white transition hover:bg-white/10"><i class="fa-solid fa-xmark h-6 w-6"></i></button></div>
            <nav class="flex-1 overflow-y-auto px-4 pb-4">
                <a href="/finance/" class="mobile-menu-link"><i class="fa-solid fa-sack-dollar fa-fw"></i><span>Finance</span></a>
                <a href="/health/" class="mobile-menu-link"><i class="fa-solid fa-heart-pulse fa-fw"></i><span>Health</span></a>
                <a href="/everyday-life/" class="mobile-menu-link"><i class="fa-solid fa-sun fa-fw"></i><span>Everyday Life</span></a>
                <a href="/converters/" class="mobile-menu-link"><i class="fa-solid fa-arrows-rotate fa-fw"></i><span>Converters</span></a>
            </nav>
        </div>
    </div>

    <!-- Category Quick Bar -->
    <nav class="border-b border-slate-200 bg-white hidden md:block">
        <div class="px-6">
            <div class="hide-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 md:gap-8 lg:justify-center">
                <a href="/finance/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red"><i class="fa-solid fa-sack-dollar fa-fw w-4 text-center text-brand-red"></i><span class="font-bold">Finance</span></a>
                <a href="/health/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red"><i class="fa-solid fa-heart-pulse fa-fw w-4 text-center text-brand-red"></i><span class="font-bold">Health</span></a>
                <a href="/everyday-life/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red"><i class="fa-solid fa-sun fa-fw w-4 text-center text-brand-red"></i><span class="font-bold">Everyday Life</span></a>
                <a href="/converters/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red"><i class="fa-solid fa-arrows-rotate fa-fw w-4 text-center text-brand-red"></i><span class="font-bold">Converters</span></a>
            </div>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="bg-brand-dark text-slate-200">
        <div class="mx-auto max-w-[1050px] px-6 py-6">
            <div class="flex flex-col items-center text-center">
                <a href="/" class="flex flex-col items-center justify-center gap-1 text-white">
                    <div class="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-white text-white"><span class="text-lg font-semibold">DC</span></div>
                    <div><p class="font-heading text-[18px] font-semibold">DailyCalc.org</p></div>
                </a>
                <p class="mt-2 max-w-sm text-[12px] text-slate-400">Neutral, global, and helpful calculators for daily life. Built to grow one trusted tool at a time.</p>
            </div>
            <div class="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-center sm:gap-6">
                <p class="text-center sm:text-left">&copy; <span id="currentYear"></span> DailyCalc.org. All rights reserved.</p>
                <div class="flex flex-wrap justify-center gap-4 sm:justify-start">
                    <a href="/privacy.html" class="transition hover:text-white">Privacy</a>
                    <a href="/terms.html" class="transition hover:text-white">Terms</a>
                    <a href="/accessibility.html" class="transition hover:text-white">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>
`;

const toastHTML = `<div id="clipboard-toast"></div>`;

/* --- LAYOUT ENGINE --- */
const CalculatorLayout = {
    render(config) {
        const target = document.getElementById(config.targetId || 'calculator-layout');
        if (!target) return; 

        // 1. Grab Content Elements
        const toolEl = document.getElementById(config.toolId);
        const seoEl = document.getElementById(config.seoId);
        const sidebarEl = document.getElementById(config.sidebarId);

        if (!toolEl) { console.error('Layout: Tool element not found.'); return; }

        // 2. Generate Breadcrumbs (Default)
        const catSlug = config.category.toLowerCase().replace(/\s+/g, '-');
        const breadcrumbHTML = `
            <nav class="mb-3 text-xs text-slate-500 no-print" aria-label="Breadcrumb">
                <ol class="flex items-center gap-1">
                    <li><a href="/" class="hover:text-[#518428]">Home</a></li>
                    <li><span class="text-slate-400">/</span></li>
                    <li><a href="/${catSlug}/" class="hover:text-[#518428]">${config.category}</a></li>
                    <li><span class="text-slate-400">/</span></li>
                    <li><span class="font-medium text-slate-700">${config.title}</span></li>
                </ol>
            </nav>
        `;

        // 3. Generate Title
        const badgeHTML = config.badge ? `<span class="ml-2 inline-block rounded-full bg-slate-200/70 border border-slate-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 align-middle">${config.badge}</span>` : '';
        const titleHTML = `
            <h1 class="mb-6 font-heading text-2xl font-bold text-brand-dark">
                <span class="bg-gradient-to-r from-brand-dark to-brand-red bg-clip-text text-transparent">${config.title}</span>
                ${badgeHTML}
            </h1>
        `;

        // 4. Construct SKELETON
        const wrapper = document.createElement('div');
        wrapper.className = "mx-auto main-container px-2 py-4 sm:px-4";

        wrapper.innerHTML = `
            ${breadcrumbHTML}
            ${titleHTML}
            
            <div class="flex flex-col gap-4 lg:flex-row mb-8">
                
                <!-- LEFT COLUMN: Tool + SEO -->
                <div class="flex-1 min-w-0 flex flex-col gap-8" id="layout-left-column">
                    <div id="layout-tool-container"></div>
                    <!-- Mobile Widget Placeholder (Visible only md:hidden) -->
                    <div id="mobile-widget-placeholder" class="md:hidden"></div>
                    
                    <!-- SEO Container (Now inside left column) -->
                    <div id="layout-seo-wrapper" class="hidden">
                        <!-- CENTRALIZED DIVIDER INJECTION -->
                        <div class="calc-section-divider !mt-2"></div>
                        <div id="layout-seo-container"></div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Sticky Sidebar -->
                <div class="w-full shrink-0 space-y-4 lg:w-[300px] no-print">
                    <div id="desktop-widget-placeholder" class="hidden md:block"></div>
                    <div class="ad-box"><span class="text-xs font-semibold text-slate-400">ADVERTISEMENT<br>300x250</span></div>
                    <div id="layout-sidebar-container"></div>
                    <div class="content-section sticky top-4" id="layout-related-tools" data-widget="related-tools" data-category="${config.category}">
                        <div class="p-4 text-center text-slate-400 text-xs"><i class="fa-solid fa-spinner fa-spin mb-2"></i><br>Loading tools...</div>
                    </div>
                </div>

            </div>
        `;

        // 5. Inject Content
        const toolContainer = wrapper.querySelector('#layout-tool-container');
        toolContainer.appendChild(toolEl);
        toolEl.classList.remove('hidden');

        if (sidebarEl) {
            wrapper.querySelector('#layout-sidebar-container').appendChild(sidebarEl);
            sidebarEl.classList.remove('hidden');
        }

        if (seoEl) {
            const seoWrapper = wrapper.querySelector('#layout-seo-wrapper');
            const seoContainer = wrapper.querySelector('#layout-seo-container');
            seoContainer.appendChild(seoEl);
            seoEl.classList.remove('hidden');
            seoWrapper.classList.remove('hidden');
        }

        target.innerHTML = '';
        target.appendChild(wrapper);

        // 6. Post-Render Init
        if (window.SidebarWidget && typeof window.SidebarWidget.init === 'function') window.SidebarWidget.init();
        this.loadRelatedTools(config.category);
    },

    loadRelatedTools(category) {
        const container = document.getElementById('layout-related-tools');
        if (!container || !window.CALCULATOR_REGISTRY) return;
        const links = window.CALCULATOR_REGISTRY[category];
        if (!links) return;
        
        container.innerHTML = `
            <div class="bg-gradient-to-r from-brand-dark to-brand-red px-4 py-2"><h3 class="text-sm font-bold text-white text-center">${category} Calculators</h3></div>
            <div class="p-4"><ul class="space-y-2"></ul></div>
        `;
        const ul = container.querySelector('ul');
        const currentPath = window.location.pathname;
        links.forEach(link => {
            const isActive = currentPath.includes(link.url);
            const activeClass = isActive ? 'font-bold text-brand-red' : '';
            const iconColor = isActive ? 'text-brand-red' : 'text-slate-400';
            ul.innerHTML += `<li><a href="${link.url}" class="sidebar-nav-link ${activeClass}"><i class="fa-solid ${link.icon} ${iconColor}"></i> ${link.name}</a></li>`;
        });
    }
};

window.CalculatorLayout = CalculatorLayout;

// --- Wishlist UI Logic ---
const WishlistUI = {
    init() {
        const dBtn = document.getElementById('desktopWishlistBtn');
        const mBtn = document.getElementById('mobileWishlistBtn');
        const drawer = document.getElementById('wishlistDrawer');
        const overlay = document.getElementById('wishlistOverlay');
        const content = document.getElementById('wishlistContent');
        const close = document.getElementById('closeWishlistBtn');

        const toggleDrawer = (show) => {
            if (show) {
                drawer.classList.remove('hidden');
                requestAnimationFrame(() => {
                    overlay.classList.remove('opacity-0');
                    content.classList.remove('translate-x-full');
                });
                this.renderList();
            } else {
                overlay.classList.add('opacity-0');
                content.classList.add('translate-x-full');
                setTimeout(() => drawer.classList.add('hidden'), 300);
            }
        };

        if (dBtn) dBtn.addEventListener('click', () => toggleDrawer(true));
        if (mBtn) mBtn.addEventListener('click', () => toggleDrawer(true));
        if (close) close.addEventListener('click', () => toggleDrawer(false));
        if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

        this.updateCounts();
        
        // Listen for custom events if WishlistManager dispatches them
        window.addEventListener('wishlistUpdated', () => this.updateCounts());
    },

    updateCounts() {
        if (!window.WishlistManager) return;
        const count = window.WishlistManager.getCount();
        const dBadge = document.getElementById('desktopWishlistCount');
        const mBadge = document.getElementById('mobileWishlistCount');
        
        if (dBadge) {
            dBadge.textContent = count;
            dBadge.classList.toggle('hidden', count === 0);
        }
        if (mBadge) {
            mBadge.textContent = count;
            mBadge.classList.toggle('hidden', count === 0);
        }
    },

    renderList() {
        const container = document.getElementById('wishlistListContainer');
        if (!container || !window.WishlistManager) return;
        
        const items = window.WishlistManager.getItems();
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-slate-400 py-10">
                    <i class="fa-regular fa-heart text-4xl mb-3 opacity-30"></i>
                    <p class="text-xs text-center">Your wishlist is empty.<br>Save tools to see them here.</p>
                </div>`;
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'space-y-3';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between gap-3 group hover:border-brand-red/30 transition';
            li.innerHTML = `
                <a href="${item.url}" class="flex-1 min-w-0">
                    <h4 class="text-xs font-bold text-slate-700 truncate group-hover:text-brand-red transition">${item.name || 'Saved Tool'}</h4>
                    <p class="text-[10px] text-slate-500 truncate">${item.category || 'Tool'}</p>
                </a>
                <button class="remove-wishlist-btn h-6 w-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition" data-url="${item.url}">
                    <i class="fa-solid fa-trash-can text-[10px]"></i>
                </button>
            `;
            ul.appendChild(li);
        });
        container.appendChild(ul);

        container.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.currentTarget.dataset.url;
                window.WishlistManager.remove(url);
                this.renderList(); // Re-render immediately
                this.updateCounts();
            });
        });
    }
};

function loadCommonLayout() {
    const h = document.getElementById('header-placeholder');
    const f = document.getElementById('footer-placeholder');
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = footerHTML;
    
    if (!document.getElementById('toast-placeholder')) {
        const t = document.createElement('div'); t.id = 'toast-placeholder'; t.innerHTML = toastHTML;
        document.body.appendChild(t);
    }
    
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu Logic
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const content = document.getElementById('mobileMenuContent');
    const close = document.getElementById('mobileMenuClose');
    
    const toggleMenu = (show) => {
        if(!menu) return;
        if(show) {
            menu.classList.remove('hidden');
            requestAnimationFrame(() => {
                overlay.classList.remove('opacity-0');
                content.classList.remove('-translate-x-full');
            });
            document.body.classList.add('overflow-hidden');
            document.getElementById('menuOpenIcon').classList.add('hidden');
            document.getElementById('menuCloseIcon').classList.remove('hidden');
        } else {
            overlay.classList.add('opacity-0');
            content.classList.add('-translate-x-full');
            document.body.classList.remove('overflow-hidden');
            document.getElementById('menuOpenIcon').classList.remove('hidden');
            document.getElementById('menuCloseIcon').classList.add('hidden');
            setTimeout(() => menu.classList.add('hidden'), 300);
        }
    };

    if(toggle) toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !document.getElementById('menuOpenIcon').classList.contains('hidden'); 
        toggleMenu(isOpen);
    });
    if(close) close.addEventListener('click', () => toggleMenu(false));
    if(overlay) overlay.addEventListener('click', () => toggleMenu(false));

    // Initialize Wishlist UI
    WishlistUI.init();
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCommonLayout);
} else {
    loadCommonLayout();
}
