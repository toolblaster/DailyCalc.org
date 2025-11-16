document.addEventListener('DOMContentLoaded', () => {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const toggleSubcategoriesBtn = document.getElementById('toggleSubcategories');
    const subcategoryLists = document.querySelectorAll('[data-subcategory]');
    let subcategoriesExpanded = false;

    if (toggleSubcategoriesBtn && subcategoryLists.length) {
        toggleSubcategoriesBtn.setAttribute('aria-pressed', 'false');
        toggleSubcategoriesBtn.addEventListener('click', () => {
            subcategoriesExpanded = !subcategoriesExpanded;
            toggleSubcategoriesBtn.setAttribute('aria-pressed', String(subcategoriesExpanded));
            toggleSubcategoriesBtn.classList.toggle('bg-brand-red/5', subcategoriesExpanded);
            toggleSubcategoriesBtn.classList.toggle('border-brand-red', subcategoriesExpanded);
            toggleSubcategoriesBtn.classList.toggle('text-brand-red', subcategoriesExpanded);

            subcategoryLists.forEach((list) => {
                list.classList.toggle('is-visible', subcategoriesExpanded);
            });
        });
    }

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
                    feedbackEl.className = 'mt-3 text-sm';
                    feedbackEl.setAttribute('role', 'alert');
                    form.insertAdjacentElement('afterend', feedbackEl);
                }

                feedbackEl.textContent = `Thanks, ${emailValue}! We will notify you when new calculators launch.`;
                feedbackEl.classList.remove('text-red-500');
                feedbackEl.classList.add('text-emerald-600');

                emailInput.value = '';
                emailInput.blur();
            });
        }
    }
});