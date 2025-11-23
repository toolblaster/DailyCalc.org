/*
  DailyCalc.org Common Layout Injector
  This file contains the HTML for the site-wide header, navigation, and footer.
  It injects this HTML into placeholder elements AND handles the internal
  logic for those injected elements (e.g., mobile menu, search modal).
*/

// 1. Define the HTML for the common elements
// We use backticks (`) for template literals, which make multi-line HTML easy.

const headerHTML = `
    <!-- 
      REMOVED: Top Bar 
    -->

    <!-- Header -->
    <header class="bg-gradient-to-r from-brand-dark to-brand-red shadow-md sticky top-0 z-40">
        <!-- Main header container -->
        <!-- MODIFIED: Reduced vertical padding (py-3 sm:py-4 -> py-2 sm:py-3) -->
        <div class="mx-auto max-w-[1050px] flex-col px-6 py-2 sm:py-3">
            
            <!-- Top row: Logo, Desktop Search, Buttons -->
            <div class="flex w-full items-center justify-between gap-4">
                
                <!-- 1. Logo -->
                <div class="flex-shrink-0">
                    <!-- Link to homepage -->
                    <!-- MODIFIED: Reduced gap on all sizes -->
                    <a href="/" class="flex items-center gap-2 text-white" aria-label="DailyCalc.org homepage">
                        <!-- MODIFIED: Reduced logo circle size on mobile (h-8 w-8) and desktop (sm:h-10 sm:w-10) -->
                        <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-white text-white">
                            <!-- MODIFIED: Reduced logo text size on mobile (text-base) and desktop (sm:text-lg) -->
                            <span class="text-base sm:text-lg font-semibold">DC</span>
                        </div>
                        <div>
                            <!-- MODIFIED: Reduced title text size on mobile (text-lg) and desktop (sm:text-[20px]) -->
                            <p class="font-heading text-lg sm:text-[20px] font-semibold">DailyCalc.org</p> 
                            <!-- MODIFIED: Reduced subtitle text size on mobile (text-[10px]) and desktop (sm:text-[11px]) -->
                            <p class="text-[10px] sm:text-[11px] text-slate-300">Daily calculators for everyone.</p>
                        </div>
                    </a>
                </div>

                <!-- 2. Desktop Search Bar (NOW A BUTTON) -->
                <div class="hidden flex-1 px-4 md:block">
                    <!-- MODIFIED: Changed max-w-[9rem] back to a more balanced max-w-xs -->
                    <button id="openDesktopSearchModalButton" class="relative w-full max-w-xs mx-auto text-left" aria-label="Open search panel">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <i class="fa-solid fa-search text-slate-300"></i>
                        </div>
                        <div class="w-full rounded-full border border-white/30 bg-white/10 px-5 py-2 pl-10 text-sm text-slate-300 shadow-sm transition duration-200 hover:bg-white/20">
                            Search calculators...
                        </div>
                    </button> <!-- FIXED: Added missing closing </button> tag -->
                </div>
                
                <!-- 3. Mobile/Desktop Buttons -->
                <div class="flex-shrink-0">
                    <!-- Mobile Menu Toggle Button -->
                    <nav aria-label="Primary" class="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 md:hidden">
                        <!-- NEW: Home button for mobile header -->
                        <!-- MODIFIED: Icon size h-6 w-6 -> h-5 w-5 -->
                        <a href="/" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Homepage">
                            <i class="fa-solid fa-house h-5 w-5"></i>
                        </a>
                        <!-- MODIFIED: This button now opens the global search modal -->
                        <!-- MODIFIED: Icon size h-6 w-6 -> h-5 w-5 -->
                        <button id="openMobileSearchModalButton" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Open search panel">
                            <i class="fa-solid fa-search h-5 w-5"></i>
                        </button>
                        <!-- NEW: Dashboard button for mobile header -->
                        <!-- MODIFIED: Icon size h-6 w-6 -> h-5 w-5 -->
                        <a href="/dashboard.html" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="My Dashboard">
                            <i class="fa-solid fa-history h-5 w-5"></i>
                        </a>
                        <!-- MODIFIED: Icon size h-6 w-6 -> h-5 w-5 -->
                        <button id="mobileMenuToggle" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
                            <i class="fa-solid fa-bars h-5 w-5" id="menuOpenIcon"></i>
                            <i class="fa-solid fa-xmark h-5 w-5 hidden" id="menuCloseIcon"></i>
                        </button>
                    </nav>

                    <!-- Desktop Buttons -->
                    <div class="hidden items-center gap-3 md:flex">
                        <!-- NEW: Home Button -->
                        <a href="/" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20">
                            <i class="fa-solid fa-house"></i>
                            Home
                        </a>
                        <!-- NEW: Dashboard Button -->
                        <a href="/dashboard.html" class="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20">
                            <i class="fa-solid fa-history"></i>
                            My Dashboard
                        </a>
                        <!-- MODIFIED: Changed <a> back to <button> and gave it an ID -->
                        <button id="suggestToolButton" class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-soft transition hover:bg-slate-200">
                            <i class="fa-solid fa-lightbulb"></i>
                            Suggest a Tool
                        </button>
                    </div>
                </div>
            </div>

            <!-- 
              REMOVED: The old mobile search bar container.
              It is no longer needed as search is now a global modal.
            -->
            
        </div>
    </header>

    <!-- *** NEW MOBILE MENU PANEL (Slide-in) *** -->
    <div id="mobileMenu" class="md:hidden fixed inset-0 z-50 hidden">
        <div id="mobileMenuOverlay" class="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out" aria-hidden="true"></div>
        <!-- MODIFIED: Increased width from w-1/2 to w-2/3 -->
        <div id="mobileMenuContent" class="relative flex flex-col bg-gradient-to-r from-brand-dark to-brand-red h-full w-2/3 max-w-sm shadow-xl transform -translate-x-full transition-transform duration-300 ease-in-out">
            
            <div class="flex justify-end p-2">
                 <button id="mobileMenuClose" class="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Close menu">
                    <i class="fa-solid fa-xmark h-6 w-6"></i>
                </button>
            </div>
            
            <nav class="flex-1 overflow-y-auto px-4 pb-4" aria-label="Mobile Navigation">
                <!-- REMOVED: Home Link -->
                
                <!-- REMOVED: Dashboard Link -->
                

                <!-- Links now point to category pages -->
                <a href="/finance/" class="mobile-menu-link">
                    <i class="fa-solid fa-sack-dollar fa-fw"></i>
                    <span>Finance</span>
                </a>
                <a href="/health/" class="mobile-menu-link">
                    <i class="fa-solid fa-heart-pulse fa-fw"></i>
                    <span>Health</span>
                </a>
                <!-- MODIFIED: Updated HREF to /everyday-life/ -->
                <a href="/everyday-life/" class="mobile-menu-link">
                    <i class="fa-solid fa-sun fa-fw"></i>
                    <span>Everyday Life</span>
                </a>
                <a href="/converters/" class="mobile-menu-link">
                    <i class="fa-solid fa-arrows-rotate fa-fw"></i>
                    <span>Converters</span>
                </a>
                <!-- REMOVED: Math, Study, General, AI links -->
                
            </nav>
        </div>
    </div>

    <!-- New Category Quick Bar -->
    <!-- MODIFIED: Added 'hidden' to hide on mobile, and 'md:block' to show on desktop -->
    <nav class="border-b border-slate-200 bg-white hidden md:block" aria-label="Calculator Categories">
        <div class="px-6">
            <div class="hide-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 md:gap-8 lg:justify-center">
                <!-- Links now point to category pages -->
                <!-- MODIFIED: Reverted to text-xs, kept font-bold -->
                
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
                
                <!-- REMOVED: Math, Study, General, AI links -->
            </div>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="bg-brand-dark text-slate-200">
        
        <!-- 
          REMOVED: Newsletter Section 
        -->

        <!-- MODIFIED: Reduced vertical padding (py-8 -> py-6) -->
        <div class="mx-auto max-w-[1050px] px-6 py-6">
            <!-- 
              REMOVED: Old logo wrapper div.
              The logo is now moved down into the copyright section.
            -->
            
            <!-- 1. Logo Section (Back in its own div) -->
            <div class="flex flex-col items-center text-center">
                <div>
                    <!-- Link to homepage -->
                    <!-- MODIFIED: Reduced gap (gap-2 -> gap-1) -->
                    <a href="/" class="flex flex-col items-center justify-center gap-1 text-white" aria-label="DailyCalc.org homepage (footer)">
                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-white text-white">
                            <span class="text-lg font-semibold">DC</span>
                        </div>
                        <div>
                            <p class="font-heading text-[18px] font-semibold">DailyCalc.org</p>
                        </div>
                    </a>
                    <!-- MODIFIED: Reduced top margin (mt-3 -> mt-2) -->
                    <p class="mt-2 max-w-sm text-[12px] text-slate-400">Neutral, global, and helpful calculators for daily life. Built to grow one trusted tool at a time.</p>
                </div>
            </div>
            
            <!-- 2. Copyright Section (with the line above it) -->
            <!-- MODIFIED: Reduced margin-top (mt-8 -> mt-6) and padding-top (pt-8 -> pt-6) -->
            <div class="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-center sm:gap-6">
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

// *** NEW: GLOBAL SEARCH MODAL HTML ***
const searchModalHTML = `
    <div id="searchModal" class="fixed inset-0 z-50 hidden" aria-labelledby="searchModalTitle" role="dialog" aria-modal="true">
        <!-- Overlay -->
        <div id="searchModalOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

        <!-- Modal Content Container -->
        <!-- MODIFIED: Added id="searchModalContainer" -->
        <div id="searchModalContainer" class="relative flex min-h-full items-start justify-center p-4 pt-16 sm:p-6">
            <div id="searchModalContent" class="relative w-full max-w-xl transform-gpu overflow-hidden rounded-lg bg-white shadow-2xl transition-all">
                <!-- Search Input Group -->
                <div class="relative">
                    <label for="globalSearchInput" class="sr-only">Search calculators</label>
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                        <i class="fa-solid fa-search text-slate-400"></i>
                    </div>
                    <input
                        type="search"
                        id="globalSearchInput"
                        placeholder="Search calculators (e.g., 'BMI', 'Mortgage')"
                        class="w-full border-b border-slate-200 bg-transparent py-4 pl-14 pr-16 text-lg text-slate-900 placeholder:text-slate-400 focus:border-brand-red focus:outline-none focus:ring-0"
                    />
                    <button id="closeSearchModalButton" class="absolute inset-y-0 right-0 flex items-center justify-center rounded-lg p-5 text-slate-400 transition hover:text-brand-red" aria-label="Close search panel">
                        <i class="fa-solid fa-xmark h-6 w-6"></i>
                    </button>
                </div>

                <!-- Search Results Area -->
                <div id="searchResultsWrapper" class="max-h-[60vh] overflow-y-auto p-2">
                    <!-- Initial 'Type to search' state -->
                    <div id="searchInitialState" class="p-10 text-center text-sm text-slate-500">
                        <i class="fa-regular fa-keyboard fa-xl mb-3"></i>
                        <p>Type a calculator name or keyword to search.</p>
                    </div>

                    <!-- Loading Spinner -->
                    <div id="searchLoadingState" class="p-10 text-center text-sm text-slate-500 hidden">
                        <i class="fa-solid fa-spinner fa-spin fa-xl"></i>
                    </div>

                    <!-- 'No results' state -->
                    <div id="searchNoResultsState" class="p-10 text-center text-sm text-slate-500 hidden">
                        <i class="fa-regular fa-face-frown fa-xl mb-3"></i>
                        <p>No results found for "<strong id="searchNoResultsQuery"></strong>".</p>
                    </div>
                    
                    <!-- Results Container -->
                    <div id="searchResultsContainer">
                        <!-- Results will be injected here as links -->
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

// *** NEW: TOAST NOTIFICATION HTML ***
const toastHTML = `
    <div id="clipboard-toast">
        <!-- Message will be set by JS -->
    </div>
`;


// *** NEW: MOCK DATABASE FOR SEARCH ***
// This is what your "NeuralSearch" API would eventually return.
// I've used the data from your homepage grid.
const MOCK_CALCULATOR_DB = [
    {
        title: "Finance",
        description: "Budgeting, loans, investments, and personal wealth tools.",
        url: "/finance/", // UPDATED
        keywords: "mortgage budget savings"
    },
    {
        title: "Health",
        description: "Track wellness goals, nutrition, and body metrics with ease.",
        url: "/health/", // UPDATED
        keywords: "bmi hydration nutrition training"
    },
    {
        title: "Everyday Life",
        description: "Countdowns, date math, time zone helpers, and scheduling.",
        url: "/everyday-life/", // UPDATED
        keywords: "countdown timezone workday life"
    },
    {
        title: "Math & Numbers",
        description: "Algebra, geometry, statistics, and quick number crunchers.",
        url: "/math-numbers/", // UPDATED
        keywords: "algebra geometry statistics"
    },
    {
        title: "Study & Education",
        description: "Learning aids, grading, study planners, and academic tools.",
        url: "/study-education/", // UPDATED
        keywords: "grade gpa study planner"
    },
    {
        title: "Converters",
        description: "Unit conversions for measurements, currencies, and formats.",
        url: "/converters/", // UPDATED
        keywords: "units currency measurements"
    },
    {
        title: "General Tools",
        description: "Everyday quick calculators for household and lifestyle needs.",
        url: "/general-tools/", // UPDATED
        keywords: "diy home travel"
    },
    {
        title: "AI-Based Calculators",
        description: "Smart calculators leveraging AI for nuanced or predictive results.",
        url: "/ai-based/", // UPDATED
        keywords: "artificial intelligence scenario"
    }
];

// *** NEW: Mock Search Function ***
// This simulates a network request to your search API.
// REPLACE THIS FUNCTION when your backend is ready.
const fetchSearchResults = (query) => {
    return new Promise((resolve) => {
        if (!query) {
            return resolve([]);
        }
        
        const lowerQuery = query.toLowerCase();
        
        const results = MOCK_CALCULATOR_DB.filter(calc => 
            calc.title.toLowerCase().includes(lowerQuery) ||
            calc.description.toLowerCase().includes(lowerQuery) ||
            calc.keywords.toLowerCase().includes(lowerQuery)
        );
        
        // Simulate network delay
        setTimeout(() => {
            resolve(results);
        }, 300); // 300ms delay
    });
};

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

    // *** NEW: Inject Search Modal ***
    // We create a placeholder and append it to the body, then inject HTML.
    let searchModalPlaceholder = document.getElementById('search-modal-placeholder');
    if (!searchModalPlaceholder) {
        searchModalPlaceholder = document.createElement('div');
        searchModalPlaceholder.id = 'search-modal-placeholder';
        document.body.appendChild(searchModalPlaceholder);
    }
    searchModalPlaceholder.innerHTML = searchModalHTML;

    // *** NEW: Inject Toast Notification ***
    let toastPlaceholder = document.getElementById('toast-placeholder');
    if (!toastPlaceholder) {
        toastPlaceholder = document.createElement('div');
        toastPlaceholder.id = 'toast-placeholder';
        document.body.appendChild(toastPlaceholder);
    }
    toastPlaceholder.innerHTML = toastHTML;


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

    if (mobileMenuToggle) { // Check if it exists
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
    // UPDATED: No longer closing menu on filter link click
    // mobileMenuLinks.forEach(link => {
    //     link.addEventListener('click', closeMenu);
    // });

    // --- Category Quick Bar Logic ---
    // (No changes needed here)
    
    // --- REMOVED: Scrollbar Hide Style (now in global.js) ---

    
    // *** NEW: Global Search Modal Logic ***
    
    const searchModal = document.getElementById('searchModal');
    const searchModalOverlay = document.getElementById('searchModalOverlay');
    const searchModalContent = document.getElementById('searchModalContent');
    const openMobileSearchBtn = document.getElementById('openMobileSearchModalButton');
    const openDesktopSearchBtn = document.getElementById('openDesktopSearchModalButton');
    const closeSearchBtn = document.getElementById('closeSearchModalButton');
    const globalSearchInput = document.getElementById('globalSearchInput');
    
    // MODIFIED: Added searchModalContainer
    const searchModalContainer = document.getElementById('searchModalContainer');
    
    // Result area elements
    const resultsWrapper = document.getElementById('searchResultsWrapper');
    const resultsContainer = document.getElementById('searchResultsContainer');
    const initialState = document.getElementById('searchInitialState');
    const loadingState = document.getElementById('searchLoadingState');
    const noResultsState = document.getElementById('searchNoResultsState');
    const noResultsQuery = document.getElementById('searchNoResultsQuery');

    let searchDebounceTimer;

    const openSearchModal = () => {
        if (!searchModal) return;
        searchModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        // Focus the input *after* the transition starts
        setTimeout(() => {
            globalSearchInput.focus();
        }, 100); // Small delay for CSS to apply
    };

    const closeSearchModal = () => {
        if (!searchModal) return;
        searchModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        // Clear input and results when closing
        globalSearchInput.value = '';
        resultsContainer.innerHTML = '';
        initialState.classList.remove('hidden');
        loadingState.classList.add('hidden');
        noResultsState.classList.add('hidden');
    };

    // Render search results
    const renderSearchResults = (results) => {
        resultsContainer.innerHTML = ''; // Clear old results
        
        if (results.length === 0) {
            return; // We'll let the input handler show the 'no results' state
        }
        
        results.forEach(result => {
            const resultLink = document.createElement('a');
            resultLink.href = result.url;
            resultLink.className = 'flex items-center gap-4 rounded-md p-4 text-left transition hover:bg-slate-100';
            
            // Simple icon based on title (you can customize this)
            let iconClass = 'fa-solid fa-calculator';
            if (result.title.includes('Finance')) iconClass = 'fa-solid fa-sack-dollar';
            if (result.title.includes('Health')) iconClass = 'fa-solid fa-heart-pulse';
            if (result.title.includes('Everyday Life')) iconClass = 'fa-solid fa-sun'; // MODIFIED
            if (result.title.includes('Math')) iconClass = 'fa-solid fa-square-root-variable';
            if (result.title.includes('Study')) iconClass = 'fa-solid fa-graduation-cap';
            if (result.title.includes('Converters')) iconClass = 'fa-solid fa-arrows-rotate';
            if (result.title.includes('General')) iconClass = 'fa-solid fa-screwdriver-wrench';
            if (result.title.includes('AI')) iconClass = 'fa-solid fa-robot';

            resultLink.innerHTML = `
                <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <i class="${iconClass}"></i>
                </div>
                <div>
                    <p class="font-semibold text-brand-dark">${result.title}</p>
                    <p class="text-xs text-slate-600">${result.description}</p>
                </div>
            `;
            resultsContainer.appendChild(resultLink);
        });
    };

    // Handle search input
    const onSearchInput = (e) => {
        const query = e.target.value.trim();

        // Clear any existing timer
        clearTimeout(searchDebounceTimer);

        // Hide all states
        initialState.classList.add('hidden');
        loadingState.classList.add('hidden');
        noResultsState.classList.add('hidden');
        resultsContainer.innerHTML = '';

        if (!query) {
            initialState.classList.remove('hidden'); // Show initial state if query is empty
            return;
        }

        // Show loading spinner immediately
        loadingState.classList.remove('hidden');

        // Set a new timer
        searchDebounceTimer = setTimeout(async () => {
            const results = await fetchSearchResults(query);
            
            loadingState.classList.add('hidden'); // Hide loading
            
            if (results.length === 0) {
                noResultsQuery.textContent = query;
                noResultsState.classList.remove('hidden');
            } else {
                renderSearchResults(results);
            }
        }, 250); // 250ms debounce
    };

    // Attach all event listeners
    if (openMobileSearchBtn) {
        openMobileSearchBtn.addEventListener('click', openSearchModal);
    }
    if (openDesktopSearchBtn) {
        openDesktopSearchBtn.addEventListener('click', openSearchModal);
    }
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', closeSearchModal);
    }
    if (searchModalOverlay) {
        searchModalOverlay.addEventListener('click', closeSearchModal);
    }

    // MODIFIED: Added click listener to the container
    if (searchModalContainer) {
        searchModalContainer.addEventListener('click', (e) => {
            // If the user clicks the container itself (the padding)
            // and NOT the content box inside it, close the modal.
            if (e.target === searchModalContainer) {
                closeSearchModal();
            }
        });
    }
    
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', onSearchInput);
    }
    
    // Close modal on 'Escape' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    });

    // --- REMOVED: Mobile Search Toggle Logic ---
    // (This is now handled by the modal logic above)
    
    // --- NEW: Clipboard Logic for Suggest a Tool Button ---
    const suggestButton = document.getElementById('suggestToolButton');
    const toast = document.getElementById('clipboard-toast');
    
    if (suggestButton && toast) {
        const originalHtml = suggestButton.innerHTML;
        
        suggestButton.addEventListener('click', () => {
            const email = 'hello@dailycalc.org';
            
            // Use the fallback clipboard method (document.execCommand)
            // as it's more reliable in sandboxed iframes.
            try {
                const tempInput = document.createElement('textarea');
                tempInput.value = email;
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                // --- Show Toast Notification ---
                // Set the message
                toast.textContent = `Copied '${email}' to clipboard!`;
                
                // Show the toast
                toast.classList.add('toast-visible');

                // Revert button after 2 seconds
                setTimeout(() => {
                    toast.classList.remove('toast-visible');
                }, 3000); // Hide toast after 3 seconds

            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
                // Show an error toast
                toast.textContent = 'Failed to copy to clipboard.';
                toast.classList.add('toast-visible');
                setTimeout(() => {
                    toast.classList.remove('toast-visible');
                }, 3000);
            }
        });
    }
}

// 3. Add the event listener to run our function
// We use 'DOMContentLoaded' to make sure the placeholder elements exist before we try to find them.
document.addEventListener('DOMContentLoaded', loadCommonLayout);
