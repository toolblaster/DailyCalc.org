/*
  DailyCalc.org Dashboard Logic
  This script loads and displays data from localStorage for the dashboard page.
  UPDATED: Reverted to Horizontal/Compact layout for Mobile based on user feedback.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const historyContainer = document.getElementById('historyContainer');
    const historyEmptyState = document.getElementById('historyEmptyState');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    const historyCountBadge = document.getElementById('historyCount');
    
    const presetsContainer = document.getElementById('presetsContainer');
    const presetsEmptyState = document.getElementById('presetsEmptyState');
    const clearPresetsButton = document.getElementById('clearPresetsButton');
    const presetsCountBadge = document.getElementById('presetsCount');

    // --- Helper: Time Ago ---
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m";
        return "now";
    }

    // --- Helper: Get Icon for Calculator ---
    function getIconForCalc(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('mortgage') || lowerName.includes('loan')) return 'fa-house-chimney';
        if (lowerName.includes('bmi') || lowerName.includes('health')) return 'fa-heart-pulse';
        if (lowerName.includes('age') || lowerName.includes('date')) return 'fa-calendar-days';
        if (lowerName.includes('converter')) return 'fa-arrows-rotate';
        return 'fa-calculator';
    }

    // --- Logic to Load History ---
    function loadHistory() {
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem('dailyCalcHistory')) || [];
            history.reverse(); 
        } catch (e) {
            console.error("Error reading history", e);
        }
        
        historyContainer.innerHTML = ''; 
        if (historyCountBadge) historyCountBadge.textContent = history.length;

        if (history.length === 0) {
            historyEmptyState.classList.remove('hidden');
            historyContainer.classList.add('hidden');
            if (clearHistoryButton) clearHistoryButton.classList.add('hidden');
        } else {
            historyEmptyState.classList.add('hidden');
            historyContainer.classList.remove('hidden');
            if (clearHistoryButton) clearHistoryButton.classList.remove('hidden');

            const ul = document.createElement('ul');
            ul.className = 'divide-y divide-slate-100'; 

            history.forEach(item => {
                const li = document.createElement('li');
                li.className = 'group hover:bg-slate-50 transition-colors duration-150';
                
                // COMPACT HORIZONTAL LAYOUT (Mobile & Desktop)
                li.innerHTML = `
                    <a href="${item.url || '#'}" class="flex items-center gap-3 p-2.5 text-decoration-none block">
                        
                        <!-- Icon (Fixed Size) -->
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 shadow-sm group-hover:border-brand-red/30 group-hover:text-brand-red transition-colors">
                            <i class="fa-solid ${getIconForCalc(item.calculator)} text-xs"></i>
                        </div>
                        
                        <!-- Middle: Info (Flexible) -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-baseline justify-between mb-0.5">
                                <span class="text-xs font-bold text-slate-700 truncate pr-2 group-hover:text-brand-red transition-colors">${item.calculator}</span>
                                <span class="text-[9px] text-slate-400 shrink-0">${timeAgo(item.timestamp)}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-[10px] text-slate-500 truncate flex-1" title="${item.inputs}">${item.inputs}</p>
                            </div>
                        </div>

                        <!-- Right: Result Badge (Fixed/Shrink) -->
                        <div class="ml-1 shrink-0">
                            <span class="inline-block max-w-[80px] sm:max-w-[120px] truncate rounded bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 border border-green-100 text-center">
                                ${item.result}
                            </span>
                        </div>
                    </a>
                `;
                ul.appendChild(li);
            });
            historyContainer.appendChild(ul);
        }
    }

    // --- Logic to Load Presets ---
    function loadPresets() {
        let presets = {};
        try {
            presets = JSON.parse(localStorage.getItem('dailyCalcPresets')) || {};
        } catch (e) {
            console.error("Error reading presets", e);
        }

        const calculatorNames = Object.keys(presets);
        let totalPresets = 0;
        calculatorNames.forEach(name => totalPresets += presets[name].length);
        
        presetsContainer.innerHTML = '';
        if (presetsCountBadge) presetsCountBadge.textContent = totalPresets;

        if (totalPresets === 0) {
            presetsEmptyState.classList.remove('hidden');
            presetsContainer.classList.add('hidden');
            if (clearPresetsButton) clearPresetsButton.classList.add('hidden');
        } else {
            presetsEmptyState.classList.add('hidden');
            presetsContainer.classList.remove('hidden');
            if (clearPresetsButton) clearPresetsButton.classList.remove('hidden');

            const ul = document.createElement('ul');
            ul.className = 'divide-y divide-slate-100';

            calculatorNames.forEach(calcName => {
                const calcPresets = presets[calcName];
                
                calcPresets.forEach(preset => {
                    const li = document.createElement('li');
                    li.className = 'group flex items-center gap-3 p-2.5 hover:bg-slate-50 transition-colors duration-150 relative';
                    
                    // COMPACT HORIZONTAL LAYOUT
                    li.innerHTML = `
                        <!-- Icon -->
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 shadow-sm">
                            <i class="fa-solid fa-star text-xs text-yellow-400"></i>
                        </div>

                        <!-- Text Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <h3 class="text-xs font-bold text-slate-700 truncate">${preset.name}</h3>
                                <span class="hidden sm:inline text-[9px] text-slate-300">•</span>
                                <span class="hidden sm:inline text-[9px] text-slate-400 truncate">${calcName}</span>
                            </div>
                            <p class="text-[10px] text-slate-500 truncate mt-0.5" title="${preset.inputs}">${preset.inputs}</p>
                        </div>

                        <!-- Actions (Always visible on mobile row to save click) -->
                        <div class="flex items-center gap-1.5 pl-2">
                            <a href="${preset.url}" class="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-sm transition-all" title="Load Preset">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                            </a>
                            <button class="flex h-7 w-7 items-center justify-center rounded bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-sm transition-all" data-delete-preset data-calc="${calcName}" data-name="${preset.name}" title="Delete Preset">
                                <i class="fa-solid fa-trash-can text-[10px]"></i>
                            </button>
                        </div>
                    `;
                    ul.appendChild(li);
                });
            });
            presetsContainer.appendChild(ul);
        }
    }

    // --- Event Listeners ---

    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear your entire calculation history?")) {
                localStorage.removeItem('dailyCalcHistory');
                loadHistory();
            }
        });
    }

    if (clearPresetsButton) {
        clearPresetsButton.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete ALL saved presets?")) {
                localStorage.removeItem('dailyCalcPresets');
                loadPresets();
            }
        });
    }

    presetsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-delete-preset]');
        if (btn) {
            const calc = btn.dataset.calc;
            const name = btn.dataset.name;
            if (confirm(`Delete preset "${name}"?`)) {
                const allPresets = JSON.parse(localStorage.getItem('dailyCalcPresets')) || {};
                if (allPresets[calc]) {
                    allPresets[calc] = allPresets[calc].filter(p => p.name !== name);
                    if (allPresets[calc].length === 0) delete allPresets[calc];
                    localStorage.setItem('dailyCalcPresets', JSON.stringify(allPresets));
                    loadPresets();
                }
            }
        }
    });

    // --- Initial Load ---
    loadHistory();
    loadPresets();

});
