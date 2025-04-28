let lastUpdate = Date.now();
function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000; // Convert to seconds
    lastUpdate = now;

    game.stats.timePlayed += deltaTime;

    updatePassiveIncome(deltaTime);
    checkAchievements();
    updateSidebar();
    updateUI();

    if (game.stats.timePlayed % 10 === 0) autoSave(); // Save every 10 sec
}

// Run every 100ms (10 times/second)
const loopInterval = setInterval(gameLoop, 100);