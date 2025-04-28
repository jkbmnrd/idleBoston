function loadGame() {
    try {
        const savedGame = localStorage.getItem('incrementalGameSave');
        if (!savedGame) return false;
        
        const parsed = JSON.parse(savedGame);
        
        // Validate critical structures
        if (!validateSave(parsed)) {
            throw new Error("Invalid save structure");
        }
        
        // Version migration example
        if (parsed.version !== game.version) {
            console.warn(`Save version ${parsed.version} differs from current ${game.version}`);
            // Add version-specific migrations here if needed
        }
        
        // Create a temporary merged game state
        const loadedGame = {
            ...game, // Default structure with all functions
            ...parsed, // Saved values
            // Special handling for nested objects:
            money: {
                ...game.money,
                ...(parsed.money || {})
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
            }
        };
        
        // Restore achievement functions for each achievement
        Object.keys(loadedGame.achievements.list).forEach(key => {
            if (game.achievements.list[key]) {
                loadedGame.achievements.list[key] = {
                    ...(parsed.achievements?.list?.[key] || {}), // Saved data
                    condition: game.achievements.list[key].condition, // Original function
                    effect: game.achievements.list[key].effect // Original function
                };
            }
        });
        
        // Finally assign to the global game object
        game = loadedGame;
        
        // Update UI elements
        updateLastSavedDisplay();
        updateUI(); // Refresh everything
        
        console.log("Game loaded successfully");
        return true;
    } catch (e) {
        console.error("Load failed:", e);
        // Optional: Show error to player
        return false;
    }
}