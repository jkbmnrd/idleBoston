function saveGame() {
    // Add timestamp to the save
    game.lastSaved = new Date().toISOString();
    
    // Version control for future compatibility
    game.version = "0.0.3";
    
    try {
        localStorage.setItem('incrementalGameSave', JSON.stringify(game));
        console.log("Game saved successfully!");
        // Optional: Show a brief "Game Saved!" notification
    } catch (e) {
        console.error("Failed to save game:", e);
        // Optional: Show error to player
    }
    updateLastSavedDisplay();
}