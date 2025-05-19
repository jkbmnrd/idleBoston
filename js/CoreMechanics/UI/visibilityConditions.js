function updateUIVisibility() {
    // Always visible elements
    const alwaysVisible = {
        tabs: ['city-tab', 'extra-tab', 'digital-tab', 'overseas-tab'],
        sections: ['hustle-section', 'workers-section', 'upgrades-section', 
            'devices-section', 'bitcoin-section', 'housing-section', 
            'version-section', 'achievements-section', 'overseas-market-section',
        'currency-exchange-section', 'sell-bitcoin-section']
    };
    
    // Conditional elements - maps to game.unlockables properties
    const conditionalElements = {
        tabs: {

        },
        sections: {

        }
    };
    
    // Update tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const shouldShow = alwaysVisible.tabs.includes(tabId) || 
                        (conditionalElements.tabs[tabId] && game.unlockables[conditionalElements.tabs[tabId]]);
        
        button.style.display = shouldShow ? 'inline-block' : 'none';
    });
    
    // Update sections
    document.querySelectorAll('.collapsible-section').forEach(section => {
        const sectionId = section.id;
        const shouldShow = alwaysVisible.sections.includes(sectionId) || 
                         (conditionalElements.sections[sectionId] && game.unlockables[conditionalElements.sections[sectionId]]);
        
        section.style.display = shouldShow ? 'block' : 'none';
    });
}

function initializeUIState() {
    // Update element visibility first
    updateUIVisibility();
    
    // Then handle tab states
    const lastActiveTab = localStorage.getItem('lastActiveTab') || 'city-tab';
    const tabButton = document.querySelector(`[onclick*="${lastActiveTab}"]`);
    
    if (tabButton && tabButton.style.display !== 'none') {
        // Only switch if the tab is available
        openTab(lastActiveTab);
    } else {
        // Fallback to city tab if preferred tab isn't available
        openTab('city-tab');
    }
}