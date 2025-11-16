/*
  DailyCalc.org Dashboard Logic
  This script loads and displays data from localStorage for the dashboard page.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Helper Functions to Get Data ---
    // In a real app, these would be in global.js, but for this page
    // we can define them here.

    /**
     * Gets the calculation history from localStorage.
     * @returns {Array} An array of history objects, newest first.
     */
    function getHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('dailyCalcHistory')) || [];
            return history.reverse(); // Show newest first
        } catch (e) {
            console.error("Error reading history from localStorage", e);
            return [];
        }
    }

    /**
     * Gets the saved presets from localStorage.
     * @returns {Object} An object with calculator names as keys.
     */
    function getPresets() {
        try {
            return JSON.parse(localStorage.getItem('dailyCalcPresets')) || {};
        } catch (e) {
            console.error("Error reading presets from localStorage", e);
            return {};
        }
    }

    /**
     * Clears all calculation history.
     */
    function clearHistory() {
        try {
            localStorage.removeItem('dailyCalcHistory');
            // We could also just set it to []
            // localStorage.setItem('dailyCalcHistory', JSON.stringify([]));
        } catch (e) {
            console.error("Error clearing history in localStorage", e);
        }
    }

    // --- DOM Elements ---
    const historyContainer = document.getElementById('historyContainer');
    const historyEmptyState = document.getElementById('historyEmptyState');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    
    const presetsContainer = document.getElementById('presetsContainer');
    const presetsEmptyState = document.getElementById('presetsEmptyState');

    // --- Logic to Load History ---
    function loadHistory() {
        const history = getHistory();
        
        // Clear previous content
        historyContainer.innerHTML = ''; 

        if (history.length === 0) {
            historyEmptyState.classList.remove('hidden');
            historyContainer.classList.add('hidden');
            clearHistoryButton.classList.add('hidden'); // Hide clear button if no history
        } else {
            historyEmptyState.classList.add('hidden');
            historyContainer.classList.remove('hidden');
            clearHistoryButton.classList.remove('hidden');

            // Create a list to hold the history items
            const historyList = document.createElement('ul');
            historyList.className = 'divide-y divide-slate-200 rounded-lg border border-slate-200';

            history.forEach(item => {
                const li = document.createElement('li');
                // MODIFIED: Reduced padding
                li.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3';
                
                const itemDetails = `
                    <div>
                        <a href="${item.url || '#'}" class="font-semibold text-brand-red hover:underline">${item.calculator}</a>
                        <!-- MODIFIED: Smaller text -->
                        <p class="text-xs text-slate-600">${item.inputs}</p>
                        <!-- MODIFIED: Smaller margin -->
                        <p class="mt-0.5 text-sm text-slate-900 font-medium">${item.result}</p>
                    </div>
                    <div class="flex-shrink-0">
                        <!-- MODIFIED: Smaller text -->
                        <p class="text-[11px] text-slate-500">${new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                `;
                li.innerHTML = itemDetails;
                historyList.appendChild(li);
            });
            historyContainer.appendChild(historyList);
        }
    }

    // --- Logic to Load Presets ---
    function loadPresets() {
        const presets = getPresets();
        const calculatorNames = Object.keys(presets);

        // Clear previous content
        presetsContainer.innerHTML = '';

        if (calculatorNames.length === 0) {
            presetsEmptyState.classList.remove('hidden');
            presetsContainer.classList.add('hidden');
        } else {
            presetsEmptyState.classList.add('hidden');
            presetsContainer.classList.remove('hidden');

            // Create a wrapper for the preset groups
            const presetsWrapper = document.createElement('div');
            // MODIFIED: Reduced spacing
            presetsWrapper.className = 'space-y-4';

            calculatorNames.forEach(calcName => {
                const presetsForCalc = presets[calcName];
                
                // Create a section for each calculator
                const calcGroup = document.createElement('div');
                calcGroup.className = 'rounded-lg border border-slate-200';
                
                const header = document.createElement('h3');
                // MODIFIED: Reduced padding, matched font size to H2s
                header.className = 'border-b border-slate-200 bg-slate-50 px-3 py-2 text-lg font-semibold text-brand-dark';
                header.textContent = calcName;
                calcGroup.appendChild(header);

                const presetList = document.createElement('ul');
                presetList.className = 'divide-y divide-slate-200';

                presetsForCalc.forEach(preset => {
                    const li = document.createElement('li');
                    // MODIFIED: Reduced padding
                    li.className = 'flex items-center justify-between gap-4 p-3';
                    li.innerHTML = `
                        <div>
                            <p class="font-medium text-slate-900">${preset.name}</p>
                            <!-- MODIFIED: Smaller text -->
                            <p class="text-[11px] text-slate-500">${preset.inputs}</p>
                        </div>
                        <!-- MODIFIED: Smaller text -->
                        <button class="flex-shrink-0 text-[11px] text-slate-500 hover:text-brand-red" data-calc="${calcName}" data-preset-name="${preset.name}" aria-label="Delete preset ${preset.name}">
                            <i class="fa-solid fa-trash-can"></i> Delete
                        </button>
                    `;
                    presetList.appendChild(li);
                });

                calcGroup.appendChild(presetList);
                presetsWrapper.appendChild(calcGroup);
            });

            presetsContainer.appendChild(presetsWrapper);
        }
    }

    // --- Event Listeners ---

    // Clear History Button
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', () => {
            // Using a custom modal for this would be better in the long run
            // but confirm() is okay for localStorage features.
            if (confirm("Are you sure you want to clear all your calculation history? This cannot be undone.")) {
                clearHistory();
                loadHistory(); // Re-load the (now empty) history section
            }
        });
    }

    // Delete Preset Button (Event Delegation)
    if (presetsContainer) {
        presetsContainer.addEventListener('click', (e) => {
            const deleteButton = e.target.closest('button[data-preset-name]');
            
            if (deleteButton) {
                const calcName = deleteButton.dataset.calc;
                const presetName = deleteButton.dataset.presetName;

                if (confirm(`Are you sure you want to delete the preset "${presetName}"?`)) {
                    // Get all presets
                    const allPresets = getPresets();
                    
                    // Filter out the one to delete
                    allPresets[calcName] = allPresets[calcName].filter(p => p.name !== presetName);

                    // If no presets left for this calc, remove the calc key
                    if (allPresets[calcName].length === 0) {
                        delete allPresets[calcName];
                    }

                    // Save the updated presets object back to localStorage
                    try {
                        localStorage.setItem('dailyCalcPresets', JSON.stringify(allPresets));
                    } catch (e) {
                        console.error("Error saving updated presets", e);
                    }
                    
                    // Reload the presets section
                    loadPresets();
                }
            }
        });
    }


    // --- Initial Load ---
    loadHistory();
    loadPresets();

});
