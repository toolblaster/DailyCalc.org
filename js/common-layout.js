/*
  DailyCalc.org Common Layout Injector
  This file contains the HTML for the site-wide header, navigation, and footer.
  It injects this HTML into placeholder elements.
  
  [2025-11-07] Added CalculatorLayout engine for dynamic page skeletons.
*/

const headerHTML = `
    <!-- Header -->
    <header class="bg-gradient-to-r from-brand-dark to-brand-red shadow-md sticky top-0 z-40">
        <div class="mx-auto max-w-[1050px] flex-col px-6 py-2 sm:py-3">
            
            <!-- Top row: Logo, Desktop Search, Buttons -->
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

                <!-- 2. Desktop Search Bar (Trigger Button) -->
                <div class="hidden flex-1 px-4 md:block">
                    <!-- Added 'js-open-search' class here -->
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
                    <!-- Mobile Menu Toggle Button -->
                    <nav aria-label="Primary" class="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 md:hidden">
                        <a href="/" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Homepage">
                            <i class="fa-solid fa-house h-5 w-5"></i>
                        </a>
                        <!-- Mobile Search Trigger (Added 'js-open-search') -->
                        <button class="js-open-search rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Open search panel">
                            <i class="fa-solid fa-search h-5 w-5"></i>
                        </button>
                        <a href="/dashboard.html" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="My Dashboard">
                            <i class="fa-solid fa-history h-5 w-5"></i>
                        </a>
                        <button id="mobileMenuToggle" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
                            <i class="fa-solid fa-bars h-5 w-5" id="menuOpenIcon"></i>
                            <i class="fa-solid fa-xmark h-5 w-5 hidden" id="menuCloseIcon"></i>
                        </button>
                    </nav>

                    <!-- Desktop Buttons -->
                    <div class="hidden items-center gap-3 md:flex">
                        <a href="/" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20">
                            <i class="fa-solid fa-house"></i>
                            Home
                        </a>
                        <a href="/dashboard.html" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20">
                            <i class="fa-solid fa-history"></i>
                            My Dashboard
                        </a>
                        <button id="suggestToolButton" class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-soft transition hover:bg-slate-200">
                            <i class="fa-solid fa-lightbulb"></i>
                            Suggest a Tool
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Menu Panel -->
    <div id="mobileMenu" class="md:hidden fixed inset-0 z-50 hidden">
        <div id="mobileMenuOverlay" class="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out" aria-hidden="true"></div>
        <div id="mobileMenuContent" class="relative flex flex-col bg-gradient-to-r from-brand-dark to-brand-red h-full w-2/3 max-w-sm shadow-xl transform -translate-x-full transition-transform duration-300 ease-in-out">
            <div class="flex justify-end p-2">
                 <button id="mobileMenuClose" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Close menu">
                    <i class="fa-solid fa-xmark h-6 w-6"></i>
                </button>
            </div>
            <nav class="flex-1 overflow-y-auto px-4 pb-4" aria-label="Mobile Navigation">
                <a href="/finance/" class="mobile-menu-link">
                    <i class="fa-solid fa-sack-dollar fa-fw"></i>
                    <span>Finance</span>
                </a>
                <a href="/health/" class="mobile-menu-link">
                    <i class="fa-solid fa-heart-pulse fa-fw"></i>
                    <span>Health</span>
                </a>
                <a href="/everyday-life/" class="mobile-menu-link">
                    <i class="fa-solid fa-sun fa-fw"></i>
                    <span>Everyday Life</span>
                </a>
                <a href="/converters/" class="mobile-menu-link">
                    <i class="fa-solid fa-arrows-rotate fa-fw"></i>
                    <span>Converters</span>
                </a>
            </nav>
        </div>
    </div>

    <!-- Category Quick Bar -->
    <nav class="border-b border-slate-200 bg-white hidden md:block" aria-label="Calculator Categories">
        <div class="px-6">
            <div class="hide-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 md:gap-8 lg:justify-center">
                <a href="/finance/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red">
                    <i class="fa-solid fa-sack-dollar fa-fw w-4 text-center text-brand-red"></i>
                    <span class="font-bold">Finance</span>
                </a>
                <a href="/health/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red">
                    <i class="fa-solid fa-heart-pulse fa-fw w-4 text-center text-brand-red"></i>
                    <span class="font-bold">Health</span>
                </a>
                <a href="/everyday-life/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red">
                    <i class="fa-solid fa-sun fa-fw w-4 text-center text-brand-red"></i>
                    <span class="font-bold">Everyday Life</span>
                </a>
                <a href="/converters/" class="flex flex-none items-center gap-2 text-xs text-slate-700 transition hover:text-brand-red">
                    <i class="fa-solid fa-arrows-rotate fa-fw w-4 text-center text-brand-red"></i>
                    <span class="font-bold">Converters</span>
                </a>
            </div>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="bg-brand-dark text-slate-200">
        <div class="mx-auto max-w-[1050px] px-6 py-6">
            <div class="flex flex-col items-center text-center">
                <div>
                    <a href="/" class="flex flex-col items-center justify-center gap-1 text-white" aria-label="DailyCalc.org homepage (footer)">
                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-white text-white">
                            <span class="text-lg font-semibold">DC</span>
                        </div>
                        <div>
                            <p class="font-heading text-[18px] font-semibold">DailyCalc.org</p>
                        </div>
                    </a>
                    <p class="mt-2 max-w-sm text-[12px] text-slate-400">Neutral, global, and helpful calculators for daily life. Built to grow one trusted tool at a time.</p>
                </div>
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

// *** NEW: TOAST NOTIFICATION HTML ***
const toastHTML = `
    <div id="clipboard-toast">
        <!-- Message will be set by JS -->
    </div>
`;

// *** NEW: CALCULATOR COMPONENT LOADER ***
const CalculatorLayout = {
    render(config) {
        // config = {
        //   targetId: 'main-container' (default), 
        //   toolId: 'tool-slot', 
        //   seoId: 'seo-slot', 
        //   sidebarId: 'sidebar-slot',
        //   title: 'Page Title', 
        //   badge: 'Badge Text', 
        //   category: 'Category Name',
        //   breadcrumbs: [] (optional)
        // }

        const target = document.getElementById(config.targetId || 'calculator-layout');
        if (!target) return; // Need a target container (e.g., <main id="calculator-layout">)

        // 1. Grab Content Elements (before we wipe the container)
        const toolEl = document.getElementById(config.toolId);
        const seoEl = document.getElementById(config.seoId);
        const sidebarEl = document.getElementById(config.sidebarId); // Optional extra sidebar content

        if (!toolEl) {
            console.error('CalculatorLayout: Tool content element not found.');
            return;
        }

        // 2. Generate Breadcrumbs
        let breadcrumbHTML = '';
        if (config.breadcrumbs) {
             // Custom implementation if needed
        } else {
             // Default Breadcrumb Logic
             const catSlug = config.category.toLowerCase().replace(/\s+/g, '-');
             breadcrumbHTML = `
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
        }

        // 3. Generate Title
        const badgeHTML = config.badge 
            ? `<span class="ml-2 inline-block rounded-full bg-slate-200/70 border border-slate-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 align-middle">${config.badge}</span>` 
            : '';
        
        const titleHTML = `
            <h1 class="mb-6 font-heading text-2xl font-bold text-brand-dark">
                <span class="bg-gradient-to-r from-brand-dark to-brand-red bg-clip-text text-transparent">${config.title}</span>
                ${badgeHTML}
            </h1>
        `;

        // 4. Construct the Skeleton Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = "mx-auto main-container px-2 py-4 sm:px-4";

        wrapper.innerHTML = `
            ${breadcrumbHTML}
            ${titleHTML}
            <div class="flex flex-col gap-4 lg:flex-row mb-8">
                
                <!-- Left: Calculator Tool Container -->
                <div class="flex-1 min-w-0" id="layout-tool-container">
                    <!-- Tool injected here -->
                </div>
                
                <!-- Right: Sidebar -->
                <div class="w-full shrink-0 space-y-4 lg:w-[300px] no-print">
                    
                    <!-- Widgets -->
                    <div id="desktop-widget-placeholder" class="hidden md:block"></div>
                    
                    <div class="ad-box"><span class="text-xs font-semibold text-slate-400">ADVERTISEMENT<br>300x250</span></div>
                    
                    <!-- Page Specific Sidebar Extras -->
                    <div id="layout-sidebar-container"></div>

                    <!-- Related Tools -->
                    <div class="content-section sticky top-4" id="layout-related-tools" data-widget="related-tools" data-category="${config.category}">
                        <div class="p-4 text-center text-slate-400 text-xs">
                            <i class="fa-solid fa-spinner fa-spin mb-2"></i><br>Loading tools...
                        </div>
                    </div>
                </div>

            </div>
            
            <!-- Mobile Widget -->
            <div id="mobile-widget-placeholder" class="md:hidden mb-8"></div>

            <!-- SEO Content -->
            <div id="layout-seo-divider" class="w-full max-w-[702px] my-10 border-t-[6px] border-slate-400 rounded-full no-print hidden"></div>
            <div id="layout-seo-container" class="w-full max-w-[702px] no-print"></div>
        `;

        // 5. Inject the Preserved Content
        const toolContainer = wrapper.querySelector('#layout-tool-container');
        toolContainer.appendChild(toolEl);
        toolEl.classList.remove('hidden'); // Ensure it's visible

        if (sidebarEl) {
            const sidebarContainer = wrapper.querySelector('#layout-sidebar-container');
            sidebarContainer.appendChild(sidebarEl);
            sidebarEl.classList.remove('hidden');
        }

        if (seoEl) {
            const seoContainer = wrapper.querySelector('#layout-seo-container');
            const divider = wrapper.querySelector('#layout-seo-divider');
            seoContainer.appendChild(seoEl);
            seoEl.classList.remove('hidden');
            divider.classList.remove('hidden');
        }

        // 6. Final Render
        target.innerHTML = ''; // Clear the simplified skeleton
        target.appendChild(wrapper);

        // 7. Post-Render: Initialize Widgets
        // Since we destroyed and recreated the DOM, we need to manually trigger widget init logic
        
        // Init Sidebar Widget (Vote/Share)
        if (window.SidebarWidget && typeof window.SidebarWidget.init === 'function') {
            window.SidebarWidget.init();
        }

        // Init Related Tools (Reuse logic from global.js or implement simple version here)
        this.loadRelatedTools(config.category);
    },

    loadRelatedTools(category) {
        // Simple implementation to ensure tools load even if global.js ran earlier
        const container = document.getElementById('layout-related-tools');
        if (!container || !window.CALCULATOR_REGISTRY) return;

        const links = window.CALCULATOR_REGISTRY[category];
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
        container.innerHTML = '';
        container.appendChild(header);
        container.appendChild(listContainer);
    }
};

// Expose globally
window.CalculatorLayout = CalculatorLayout;


function loadCommonLayout() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // Inject Toast Notification
    let toastPlaceholder = document.getElementById('toast-placeholder');
    if (!toastPlaceholder) {
        toastPlaceholder = document.createElement('div');
        toastPlaceholder.id = 'toast-placeholder';
        document.body.appendChild(toastPlaceholder);
    }
    toastPlaceholder.innerHTML = toastHTML;

    // --- Footer Year ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    // --- Mobile Menu Logic ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuContent = document.getElementById('mobileMenuContent');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const menuOpenIcon = document.getElementById('menuOpenIcon');
    const menuCloseIcon = document.getElementById('menuCloseIcon');

    const openMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');
            mobileMenuContent.classList.remove('-translate-x-full');
            mobileMenuContent.classList.add('translate-x-0');
        });
        menuOpenIcon.classList.add('hidden');
        menuCloseIcon.classList.remove('hidden');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
        if (!mobileMenu) return;
        mobileMenuOverlay.classList.add('opacity-0');
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileMenuContent.classList.add('-translate-x-full');
        mobileMenuContent.classList.remove('translate-x-0');
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) closeMenu(); else openMenu();
        });
    }

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // --- Clipboard Logic for Suggest a Tool Button ---
    const suggestButton = document.getElementById('suggestToolButton');
    const toast = document.getElementById('clipboard-toast');
    
    if (suggestButton && toast) {
        suggestButton.addEventListener('click', () => {
            const email = 'hello@dailycalc.org';
            try {
                const tempInput = document.createElement('textarea');
                tempInput.value = email;
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                toast.textContent = `Copied '${email}' to clipboard!`;
                toast.classList.add('toast-visible');
                setTimeout(() => { toast.classList.remove('toast-visible'); }, 3000);
            } catch (err) {
                toast.textContent = 'Failed to copy to clipboard.';
                toast.classList.add('toast-visible');
                setTimeout(() => { toast.classList.remove('toast-visible'); }, 3000);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', loadCommonLayout);
