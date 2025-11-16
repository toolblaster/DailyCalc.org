document.addEventListener('DOMContentLoaded', () => {
    // --- Homepage-specific functionality ---

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

    // --- REMOVED: Homepage Search/Filter Functionality ---
    // All search, filtering, and mutation observer logic has been
    // removed from this file. It is now handled by the new global
    // search modal in js/common-layout.js.
    
});
