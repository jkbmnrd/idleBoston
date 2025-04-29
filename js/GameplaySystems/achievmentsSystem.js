function setupAchievements() {
    // Initialize achievements in the game object
    for (const [key, achievement] of Object.entries(game.achievements.list)) {
        if (!game.achievements.unlocked.hasOwnProperty(key)) {
            game.achievements.unlocked[key] = false;
        }
    }
    for (const [key, achievement] of Object.entries(game.achievements.list)) {
        if (typeof achievement.condition !== 'function') {
            console.error(`Achievement ${key} is missing condition function!`);
        }
    }
    updateAchievementsUI();
}

function checkAchievements() {
    let newAchievements = false;
    
    for (const [key, achievement] of Object.entries(game.achievements.list)) {
        const isUnlocked = game.achievements.unlocked[key];
        if (!isUnlocked && achievement.condition(game)) {
            // Unlock achievement
            game.achievements.unlocked[key] = true;
            achievement.effect(game); // Apply effect
            newAchievements = true;
            
            // Notification
            if (game.settings.notifications) {
                showNotification(`Achievement Unlocked: ${achievement.name}`);
            }
            
            console.log(`Unlocked ${key}:`, achievement); // Debug log
        }
    }
    
    if (newAchievements) {
        updateAchievementsUI();
        updatePassiveIncome();
        updateUI(); // Force immediate refresh
    }
}



function updateAchievementsUI() {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    
    let unlockedCount = 0;
    let totalCount = 0;
    
    for (const [key, achievement] of Object.entries(game.achievements.list)) {
        totalCount++;
        const isUnlocked = game.achievements.unlocked[key];
        if (isUnlocked) unlockedCount++;
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${isUnlocked ? 'fa-trophy' : 'fa-lock'}"></i>
            </div>
            <div class="achievement-info">
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                ${isUnlocked ? 
                    `<p class="achievement-reward"><i class="fas fa-award"></i> Reward: ${achievement.reward}</p>` : 
                    '<p class="achievement-progress">In progress...</p>'}
            </div>
        `;
        
        container.appendChild(achievementElement);
    }
    
    // Update header with progress
    const header = document.querySelector('#achievements-section h2');
    if (header) {
        header.innerHTML = `<i class="fas fa-trophy"></i> Achievements (${unlockedCount}/${totalCount})`;
    }
}