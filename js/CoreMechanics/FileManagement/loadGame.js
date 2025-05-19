function loadGame() {
    try {
        const savedGame = localStorage.getItem('incrementalGameSave');
        if (!savedGame) return false;
        
        const parsed = JSON.parse(savedGame);
        
        // Validate critical structures
        if (!validateSave(parsed)) {
            throw new Error("Invalid save structure");
        }
        
        // Get current time BEFORE loading the game state
        const currentTime = Date.now();
        const lastSaved = parsed.lastSaved || currentTime;
        const offlineTime = Math.max(0, currentTime - lastSaved);
        const offlineSeconds = Math.floor(offlineTime / 1000);
        
        // Create a temporary merged game state
        const loadedGame = {
            ...game, // Default structure with all functions
            ...parsed, // Saved values
            // Special handling for nested objects:
            money: {
                ...game.money,
                ...(parsed.money || {})
            },
            resources: {
                ...game.resources,
                ...(parsed.resources || {})
            },
            workers: {
                ...game.workers,
                ...(parsed.workers || {})
            },
            settings: {
                ...game.settings,
                ...(parsed.settings || {})
            },
            stats: {
                ...game.stats,
                ...(parsed.stats || {})
            },
            // Preserve achievement functions while keeping unlocked status
            achievements: {
                ...game.achievements, // This keeps the original functions
                unlocked: {
                    ...(parsed.achievements?.unlocked || {})
                }
            },
            lastSaved: currentTime // Update the last saved time
        };
        
        // Restore achievement functions
        Object.keys(loadedGame.achievements.list).forEach(key => {
            if (game.achievements.list[key]) {
                loadedGame.achievements.list[key] = {
                    ...(parsed.achievements?.list?.[key] || {}),
                    condition: game.achievements.list[key].condition,
                    effect: game.achievements.list[key].effect
                };
            }
        });
        
        // Assign to global game object
        game = loadedGame;
        
        // Calculate and apply offline earnings AFTER loading the game state
        if (offlineSeconds > 0) {
            game.stats.totalOfflineTime += offlineSeconds;
            
            // Calculate resources earned offline using the LOADED game state
            const earnedBitcoin = game.money.bitcoinIncome * offlineSeconds;
            game.money.bitcoin += earnedBitcoin;
            game.stats.totalBitcoinEarned += earnedBitcoin;
            
            // Show offline earnings
            showOfflineEarnings(earnedBitcoin, offlineSeconds);
        } else {
            console.warn("No offline earnings to claim.");
        }
        
        // Initialize UI systems that depend on loaded data
        initializeUIAfterLoad();
        
        return true;
    } catch (e) {
        console.error("Load failed:", e);
        return false;
    }
}

function showOfflineEarnings(amount, timeAway) {
    const popup = document.createElement('div');
    popup.className = 'offline-popup';
    popup.innerHTML = `
        <h3>Welcome back!</h3>
        <p>You were away for ${formatTime(timeAway)}</p>
        <p>Earned: ${(amount.toFixed(9))} bitcoin</p>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

// New function to handle post-load UI initialization
function initializeUIAfterLoad() {
    // Update all UI components
    updateLastSavedDisplay();
    updateUI();
    updateSidebar();
    
    // Handle tab restoration
    const lastActiveTab = localStorage.getItem('lastActiveTab') || 'city-tab';
    const tabButton = document.querySelector(`[onclick*="${lastActiveTab}"]`);
    
    if (tabButton && tabButton.style.display !== 'none') {
        // Only switch if the tab is available
        openTab(lastActiveTab);
    } else {
        // Fallback to city tab if preferred tab isn't available
        openTab('city-tab');
    }
    
    // Show load notification
    loadNotification("Game loaded successfully!");
}