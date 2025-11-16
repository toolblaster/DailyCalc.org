/*
  DailyCalc.org Common Layout Injector
  This file contains the HTML for the site-wide header, navigation, and footer.
  It injects this HTML into placeholder elements on any page that includes this script.
*/

// 1. Define the HTML for the common elements
// We use backticks (`) for template literals, which make multi-line HTML easy.

const headerHTML = `
    <!-- Top Bar -->
    <div class="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-[1050px] items-center justify-between px-6 py-3 text-[12px]"> <!-- Set to 12px -->
            <div class="flex items-center gap-2 text-slate-600">
                <i class="fa-solid fa-shield-heart text-brand-red"></i>
                <span>Trusted daily calculators for everyone.</span>
            </div>
            <!-- Link to homepage newsletter section -->
            <a href="/#newsletter" class="hidden text-brand-red transition hover:text-brand-dark sm:inline-flex">Get updates</a>
        </div>
    </div>

    <!-- Header -->
    <header class="bg-gradient-to-r from-brand-dark to-brand-red shadow-md sticky top-0 z-40">
        <!-- Main header container -->
        <!-- MODIFIED: Kept flex-col for mobile toggle behavior -->
        <div class="mx-auto max-w-[1050px] flex-col px-6 py-4">
            
            <!-- Top row: Logo, Desktop Search, Buttons -->
            <div class="flex w-full items-center justify-between gap-4">
                
                <!-- 1. Logo -->
                <div class="flex-shrink-0">
                    <!-- Link to homepage -->
                    <a href="/" class="flex items-center gap-3 text-white" aria-label="DailyCalc.org homepage">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white">
                            <span class="text-xl font-semibold">DC</span>
                        </div>
                        <div>
                            <p class="font-heading text-[22px] font-semibold">DailyCalc.org</p> 
                            <p class="text-[12px] text-slate-300">Daily calculators for everyone.</p>
                        </div>
                    </a>
                </div>

                <!-- 2. Desktop Search Bar -->
                <!-- MODIFIED: This is a NEW search bar, only for desktop -->
                <div class="hidden flex-1 px-4 md:block">
                    <div class="relative w-full max-w-sm mx-auto">
                        <label for="desktopCalculatorSearch" class="sr-only">Search calculators</label>
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <i class="fa-solid fa-search text-slate-300"></i>
                        </div>
                        <input
                            type="search"
                            id="desktopCalculatorSearch"
                            placeholder="Search calculators..."
                            class="w-full rounded-full border border-white/30 bg-white/10 px-5 py-2 pl-10 text-sm text-white shadow-sm transition duration-200 placeholder:text-slate-300 focus:border-white focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                </div>
                
                <!-- 3. Mobile/Desktop Buttons -->
                <div class="flex-shrink-0">
                    <!-- Mobile Menu Toggle Button -->
                    <nav aria-label="Primary" class="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 md:hidden">
                        <button id="mobileSearchToggle" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Toggle search" aria-expanded="false">
                            <i class="fa-solid fa-search h-6 w-6"></i>
                        </button>
                        <button id="mobileMenuToggle" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
                            <i class="fa-solid fa-bars h-6 w-6" id="menuOpenIcon"></i>
                            <i class="fa-solid fa-xmark h-6 w-6 hidden" id="menuCloseIcon"></i>
                        </button>
                    </nav>

                    <!-- Desktop "Stay Notified" Button -->
                    <div class="hidden items-center gap-3 md:flex">
                        <!-- Link to homepage newsletter section -->
                        <a href="/#newsletter" class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-soft transition hover:bg-slate-200">
                            <i class="fa-regular fa-bell"></i>
                            Stay notified
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom row: Centered Search Bar -->
            <!-- MODIFIED: This is now the MOBILE search bar, hidden on desktop -->
            <div id="searchBarContainer" class="mx-auto hidden w-full max-w-sm pt-4 md:hidden">
                <div class="relative w-full">
                    <label for="calculatorSearch" class="sr-only">Search calculators</label>
                    
                    <!-- Search Icon -->
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <i class="fa-solid fa-search text-slate-300"></i>
                    </div>

                    <input
                        type="search"
                        id="calculatorSearch"
                        placeholder="Search calculators..."
                        class="w-full rounded-full border border-white/30 bg-white/10 px-5 py-2 pl-10 text-sm text-white shadow-sm transition duration-200 placeholder:text-slate-300 focus:border-white focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>
            </div>

        </div>
    </header>

    <!-- *** NEW MOBILE MENU PANEL (Slide-in) *** -->
    <div id="mobileMenu" class="md:hidden fixed inset-0 z-50 hidden">
        <div id="mobileMenuOverlay" class="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out" aria-hidden="true"></div>
        <div id="mobileMenuContent" class="relative flex flex-col bg-gradient-to-r from-brand-dark to-brand-red h-full w-1/2 max-w-sm shadow-xl transform -translate-x-full transition-transform duration-300 ease-in-out">
            
            <div class="flex justify-end p-2">
                 <button id="mobileMenuClose" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Close menu">
                    <i class="fa-solid fa-xmark h-6 w-6"></i>
                </button>
            </div>
            
            <nav class="flex-1 overflow-y-auto px-4 pb-4" aria-label="Mobile Navigation">
                <!-- Links now point back to homepage categories -->
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Finance">
                    <i class="fa-solid fa-sack-dollar fa-fw"></i>
                    <span>Finance</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Health">
                    <i class="fa-solid fa-heart-pulse fa-fw"></i>
                    <span>Health & Fitness</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Date">
                    <i class="fa-regular fa-calendar fa-fw"></i>
                    <span>Date & Time</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Math">
                    <i class="fa-solid fa-square-root-variable fa-fw"></i>
                    <span>Math & Numbers</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Study">
                    <i class="fa-solid fa-graduation-cap fa-fw"></i>
                    <span>Study & Education</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="Converters">
                    <i class="fa-solid fa-arrows-rotate fa-fw"></i>
                    <span>Converters</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="General">
                    <i class="fa-solid fa-screwdriver-wrench fa-fw"></i>
                    <span>General Tools</span>
                </a>
                <a href="/#categories" class="mobile-menu-link" data-filter-link="AI">
                    <i class="fa-solid fa-robot fa-fw"></i>
                    <span>AI-Based</span>
                </a>
                <a href="/#newsletter" class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-soft transition hover:bg-slate-200">
                    <i class="fa-regular fa-bell"></i>
                    Stay notified
                </a>
            </nav>
        </div>
    </div>

    <!-- New Category Quick Bar -->
    <!-- MODIFIED: Added 'hidden' to hide on mobile, and 'md:block' to show on desktop -->
    <nav class="border-b border-slate-200 bg-white hidden md:block" aria-label="Calculator Categories">
        <div class="px-6">
            <div class="hide-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 md:gap-8 lg:justify-center">
                <!-- Links now point back to homepage categories -->
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Finance">
                    <i class="fa-solid fa-sack-dollar fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Finance</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Health">
                    <i class="fa-solid fa-heart-pulse fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Health & Fitness</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Date">
                    <i class="fa-regular fa-calendar fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Date & Time</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Math">
                    <i class="fa-solid fa-square-root-variable fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Math & Numbers</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Study">
                    <i class="fa-solid fa-graduation-cap fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Study & Education</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="Converters">
                    <i class="fa-solid fa-arrows-rotate fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">Converters</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="General">
                    <i class="fa-solid fa-screwdriver-wrench fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">General Tools</span>
                </a>
                <a href="/#categories" class="flex flex-none items-center gap-2 text-sm text-slate-700 transition hover:text-brand-red" data-filter-link="AI">
                    <i class="fa-solid fa-robot fa-fw w-4 text-center text-brand-red/70"></i>
                    <span class="font-medium">AI-Based</span>
                </a>
            </div>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="bg-brand-dark text-slate-200">
        <div class="mx-auto max-w-[1050px] px-6 py-12">
            <div class="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-center md:gap-16">
                
                <div>
                    <!-- Link to homepage -->
                    <a href="/" class="flex items-center justify-center gap-3 text-white" aria-label="DailyCalc.org homepage (footer)">
                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-white text-white">
                            <span class="text-lg font-semibold">DC</span>
                        </div>
                        <div>
                            <p class="font-heading text-[18px] font-semibold">DailyCalc.org</p>
                        </div>
                    </a>
                    <p class="mt-4 max-w-sm text-[12px] text-slate-400">Neutral, global, and helpful calculators for daily life. Built to grow one trusted tool at a time.</p>
                </div>

                <div>
                    <h3 class="text-[14px] font-semibold uppercase tracking-widest text-white">Contact</h3>
                    <p class="mt-4 text-[12px] text-slate-300">Have a calculator request or partnership opportunity?</p>
                    <a href="mailto:hello@dailycalc.org" class="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red">
                        <i class="fa-regular fa-envelope"></i>
                        hello@dailycalc.org
                    </a>
                </div>
            </div>
            
            <div class="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-center sm:gap-6">
                <p class="text-center sm:text-left">&copy; <span id="currentYear"></span> DailyCalc.org. All rights reserved.</p>
                <div class="flex flex-wrap justify-center gap-4 sm:justify-start">
                    <!-- These should link to real pages eventually -->
                    <a href="/privacy.html" class="transition hover:text-white">Privacy</a>
                    <a href="/terms.html" class="transition hover:text-white">Terms</a>
                    <a href="/accessibility.html" class="transition hover:text-white">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>
`;


// 2. Create a function to inject the HTML
function loadCommonLayout() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    } else {
        console.warn('Could not find "#header-placeholder" element.');
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    } else {
        console.warn('Could not find "#footer-placeholder" element.');
    }

    // After injecting, we need to find elements *inside* the injected code
    // (like the mobile menu buttons and current year) and make them work.

    // --- Footer Year ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Logic ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuContent = document.getElementById('mobileMenuContent');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const menuOpenIcon = document.getElementById('menuOpenIcon');
    const menuCloseIcon = document.getElementById('menuCloseIcon');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenuContent .mobile-menu-link');

    const openMenu = () => {
        if (!mobileMenu || !mobileMenuContent || !mobileMenuOverlay || !menuOpenIcon || !menuCloseIcon) return;
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
        if (!mobileMenu || !mobileMenuContent || !mobileMenuOverlay || !menuOpenIcon || !menuCloseIcon) return;
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

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // Close menu when any link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Category Quick Bar Logic ---
    // On calculator pages, the category links should just go to the homepage
    // and let the homepage's JS handle filtering.
    // The `data-filter-link` attribute is now just for consistency.
    // We also add a simple "hide scrollbar" style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    // --- Search Input ---
    // Define search input once, as it's used by multiple sections
    const searchInput = document.getElementById('calculatorSearch'); // Mobile search
    const desktopSearchInput = document.getElementById('desktopCalculatorSearch'); // Desktop search

    // --- NEW: Mobile Search Toggle Logic ---
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const searchBarContainer = document.getElementById('searchBarContainer');

    if (mobileSearchToggle && searchBarContainer && searchInput) {
        mobileSearchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = searchBarContainer.classList.contains('hidden');
            
            searchBarContainer.classList.toggle('hidden'); // This toggles visibility
            
            if (isHidden) {
                mobileSearchToggle.setAttribute('aria-expanded', 'true');
                searchInput.focus(); // Focus the input when it appears
            } else {
                mobileSearchToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Global Search Redirect Logic ---
    const isHomepage = document.getElementById('home'); // Check for homepage <main> ID

    // Helper function for redirect
    const handleSearchRedirect = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = e.target.value.trim();
            if (searchTerm) {
                // Redirect to homepage with search query
                window.location.href = '/?q=' + encodeURIComponent(searchTerm);
            }
        }
    };

    if (searchInput && !isHomepage) {
        // If we are *not* on the homepage, make 'Enter' redirect to homepage search
        searchInput.addEventListener('keypress', handleSearchRedirect);
    }
    
    if (desktopSearchInput && !isHomepage) {
        // Also apply to desktop search
        desktopSearchInput.addEventListener('keypress', handleSearchRedirect);
    }
}

// 3. Add the event listener to run our function
// We use 'DOMContentLoaded' to make sure the placeholder elements exist before we try to find them.
document.addEventListener('DOMContentLoaded', loadCommonLayout);
