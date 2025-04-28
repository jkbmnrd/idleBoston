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
                income: 0,
                achievementMultPassive: 1.00, //Multiplier for achievements
                achievementMultClick: 1.00,
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
            achievements: {
                unlocked: {},
                // Define your achievements here
                list: {
                    firstDollar: {
                        name: "First Dollar",
                        description: "We all have to start somewhere!",
                        reward: "+1% to passive income",
                        condition: (game) => game.stats.totalMoneyEarned >= 1,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.01; },
                    },
                    tenBeggars: {
                        name: "Beggar Army",
                        description: "Hire 10 Beggars",
                        reward: "Beggars earn 100% more",
                        condition: (game) => game.workers.beggars.own >= 10,
                        unlocked: false,
                        effect: (game) => { game.workers.beggars.generate *= 2; },
                    },
                    hundredDrones: {
                        name: "Corporate Takeover",
                        description: "Hire 10 Office Drones",
                        reward: "Office Drones earn 25% more",
                        condition: (game) => game.workers.officeDrone.own >= 10,
                        unlocked: false,
                        effect: (game) => { 
                            game.workers.officeDrone.generate *= 1.25; 
                        },
                    },
                    maxHappiness: {
                        name: "First House!",
                        description: "Buy your first 'home'... if you want to call it that.",
                        reward: "+2% to all income",
                        condition: (game) => game.resources.happinessMax >= 25,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive *= 1.02; },
                    },
                    firstHundred: {
                        name: "First Hundred",
                        description: "Making some real progress now!",
                        reward: "+5% to passive income",
                        condition: (game) => game.stats.totalMoneyEarned >= 100,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.02; },
                    },

                    firstThousand: {
                        name: "First Thousand",
                        description: "Now we're talking!",
                        reward: "+3% to passive income",
                        condition: (game) => game.stats.totalMoneyEarned >= 1000,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.03; },
                    },

                    firstMillion: {
                        name: "First Million",
                        description: "Welcome to the big leagues!",
                        reward: "+5% to passive income",
                        condition: (game) => game.stats.totalMoneyEarned >= 1000000,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.05; },
                    },

                    firstClick: {
                        name: "First Click",
                        description: "You clicked the button!",
                        reward: "+1% to click value",
                        condition: (game) => game.stats.totalClicks >= 1,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultClick += 0.01; },
                    },

                    hundredClicks: {
                        name: "Hundred Clicks",
                        description: "Dedication pays off!",
                        reward: "+2% to click value",
                        condition: (game) => game.stats.totalClicks >= 100,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultClick += 0.02; },
                    },

                    thousandClicks: {
                        name: "Thousand Clicks",
                        description: "Your finger must be tired!",
                        reward: "+3% to click value",
                        condition: (game) => game.stats.totalClicks >= 1000,
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultClick += 0.03; },
                    },

                    idleMaster: {
                        name: "Idle Master",
                        description: "Letting the money roll in!",
                        reward: "+2% to passive income",
                        condition: (game) => game.stats.timePlayed >= 3600, // 1 hour
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.02; },
                    },

                    patiencePays: {
                        name: "Patience Pays",
                        description: "Waiting for the big bucks!",
                        reward: "+3% to passive income",
                        condition: (game) => game.stats.timePlayed >= 86400, // 1 day
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.03; },
                    },
                },
            },
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