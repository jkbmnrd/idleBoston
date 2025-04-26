// Reset confirmation UI
function confirmReset() {
    const confirmation = document.getElementById('reset-confirmation');
    confirmation.style.display = 'block';
}

function cancelReset() {
    document.getElementById('reset-confirmation').style.display = 'none';
}

// Main reset function
function resetGame() {
    try {
        // Clear localStorage
        localStorage.removeItem('incrementalGameSave');
        
        // Reset game state
        game = {
            // Currency
            money:{
                USD: 10, //primary currency
                Euro: 0, //special currency
                Bitcoin: 0, //prestige currency
                max: 1, //Max "Hustle" income
                min: 0, //Min "Hustle" income
                achievementMult: 1.00, //Multiplier for achievements
            },
            // Resources
            resources: {
                happiness: 10,
                happinessMax: 10,
                happinessGain: 0,
            },
            // Workers
            workers: {
                beggars: { 
                    own: 0, 
                    cost: 10, 
                    initial: 10,
                    generate: 0.25 },
                officeDrone: { 
					own: 0, 
					cost: 100, 
                    initial: 100,
					generate: 25 },
                factoryWorker: {
					own: 0, 
					cost: 1000, 
                    initial: 1000,
					generate: 100 },
            },
            upgrades: {

            },
            housing: {

            },
            // Stats
            stats: {
                totalClicks: 0,
                totalMoneyEarned: 0,
                timePlayed: 0,
            },
            // Settings
            settings: {
                volume: 0.5,
                notifications: true,
            },
            version: "0.0.3",
        };
        
        // Hide confirmation
        cancelReset();
        
        // Visual feedback
        const resetBtn = document.querySelector('.reset-button');
        resetBtn.innerHTML = '<i class="fas fa-check"></i> Game Reset!';
        resetBtn.style.backgroundColor = '#2ecc71';
        
        // Update UI
        updateUI();
        renderUpgrades();
        renderHousing();
        
        // Reset button appearance after 2 seconds
        setTimeout(() => {
            resetBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Reset Game';
            resetBtn.style.backgroundColor = '#e74c3c';
        }, 2000);
        
        console.log("Game has been reset");
    } catch (e) {
        console.error("Error resetting game:", e);
    }
}