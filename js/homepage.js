document.addEventListener('DOMContentLoaded', () => {
    // --- Homepage-specific functionality ---

    // REMOVED: "toggleSubcategoriesBtn" logic as the button was removed from index.html

    const featuredList = document.querySelector('[data-featured-list]');
    if (featuredList) {
        featuredList.setAttribute('role', 'list');
        featuredList.querySelectorAll('article').forEach((item) => {
            item.setAttribute('role', 'listitem');
        });
    }

    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
        const form = newsletterSection.querySelector('form');
        const emailInput = form ? form.querySelector('input[type="email"]') : null;
        let feedbackEl = null;

        if (form && emailInput) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const emailValue = emailInput.value.trim();

                if (!emailValue) {
                    emailInput.focus();
                    return;
                }

                if (!feedbackEl) {
                    feedbackEl = document.createElement('p');

                    feedbackEl.className = 'mt-3 text-sm'; // Using text-sm as it's a feedback message
                    feedbackEl.setAttribute('role', 'alert');
                    // Find the parent of the form to append after
                    form.parentElement.insertAdjacentElement('afterend', feedbackEl);
                }

                feedbackEl.textContent = `Thanks, ${emailValue}! We will notify you when new calculators launch.`;
                feedbackEl.classList.remove('text-red-500');
                feedbackEl.classList.add('text-emerald-600');

                emailInput.value = '';
                emailInput.blur();
            });
        }
    }

    // --- Homepage Search/Filter Functionality ---
    // We must wait for the header to be injected before accessing search elements.

    const categoryCards = document.querySelectorAll('#categoryGrid .category-card'); 
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    // --- Define filterCategories in the outer scope ---
    const filterCategories = () => {
        const searchInput = document.getElementById('calculatorSearch'); // Get mobile
        const desktopSearchInput = document.getElementById('desktopCalculatorSearch'); // Get desktop
        
        let searchTerm = "";
        if (desktopSearchInput && desktopSearchInput.value) {
            searchTerm = desktopSearchInput.value.toLowerCase().trim();
        } else if (searchInput && searchInput.value) {
            searchTerm = searchInput.value.toLowerCase().trim();
        }

        let resultsFound = 0;

        categoryCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const description = card.dataset.description.toLowerCase();
            const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
            
            if (isVisible) {
                card.style.display = 'flex'; 
                resultsFound++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMessage) {
            if (resultsFound === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }
    };
    
    // This function will be called *after* the header is injected.
    const setupSearchAndFilter = () => {
        const searchInput = document.getElementById('calculatorSearch'); // Mobile
        const desktopSearchInput = document.getElementById('desktopCalculatorSearch'); // Desktop
        
        if (!searchInput && !desktopSearchInput) {
            console.error("Search elements not found after layout injection.");
            return;
        }

        let filterLinks = [];

        // --- Setup Filter Links (from category bar and mobile menu) ---
        
        // Find links in the category bar *not* in the mobile menu
        filterLinks = document.querySelectorAll('nav[aria-label="Calculator Categories"] [data-filter-link]');
        
        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                const searchTerm = link.dataset.filterLink;
                searchInput.value = searchTerm;
                filterCategories();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        // Also attach filter logic to the *mobile menu links* on the homepage
        const mobileMenuFilterLinks = document.querySelectorAll('#mobileMenuContent [data-filter-link]');
        mobileMenuFilterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const searchTerm = link.dataset.filterLink;
                searchInput.value = searchTerm;
                filterCategories();
                
                setTimeout(() => {
                    const categoriesSection = document.getElementById('categories');
                    if (categoriesSection) {
                        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300); // Wait for menu to close
            });
        });

        // --- Setup Search Input/Button Listeners ---

        // Trigger search on input (live search)
        if (searchInput) {
            searchInput.addEventListener('input', filterCategories);
        }
        if (desktopSearchInput) {
            desktopSearchInput.addEventListener('input', filterCategories);
        }

        // (Removed searchButton listener)

        // Also trigger on pressing 'Enter' in the search box
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                filterCategories();
            }
        };
        
        if (searchInput) {
            searchInput.addEventListener('keypress', handleEnter);
        }
        if (desktopSearchInput) {
            desktopSearchInput.addEventListener('keypress', handleEnter);
        }
    };
    
    // We need to wait for the common layout to *finish* loading
    const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('mobileMenu')) { // 'mobileMenu' is a good proxy for layout.js finishing
            setupSearchAndFilter(); // Call our new combined function
            obs.disconnect(); // We found it, stop observing

            // --- NEW: Check for query param *after* setup ---
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q');
            if (searchQuery) {
                const searchInput = document.getElementById('calculatorSearch'); // Mobile
                const desktopSearchInput = document.getElementById('desktopCalculatorSearch'); // Desktop
                
                if (searchInput) {
                    searchInput.value = searchQuery;
                }
                if (desktopSearchInput) {
                    desktopSearchInput.value = searchQuery;
                }
                
                filterCategories(); // Run the filter
                    
                // Scroll to categories
                    const categoriesSection = document.getElementById('categories');
                    if (categoriesSection) {
                        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        }
    });
    
    // Start observing the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});
