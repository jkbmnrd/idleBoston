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
        
        // Carefully merge loaded data
        game = {
            ...game, // Default structure
            ...parsed, // Saved values
            // Preserve critical new features that might not exist in old saves
            settings: {
                ...game.settings,
                ...(parsed.settings || {})
            }
        };
        
        // Update UI elements
        updateLastSavedDisplay();
        
        return true;
    } catch (e) {
        console.error("Load failed:", e);
        // Optional: Show error to player
        return false;
    }
}