function saveGame() {
    // Add timestamp to the save
    game.lastSaved = Date.now();

    // Save the game state to local storage
    try {
        localStorage.setItem('incrementalGameSave', JSON.stringify(game));
        console.log("Game saved successfully!");
        // Optional: Show a brief "Game Saved!" notification
    } catch (e) {
        console.error("Failed to save game:", e);
        saveNotification("Failed to save game. Please try again.");
        // Optional: Show error to player
    }
    updateLastSavedDisplay();
}