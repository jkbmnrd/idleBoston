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
            // Income
            money:{
                // Currency
                USD: 10, // primary currency
                euro: 0, // special currency => currently unused
                bitcoin: 0, // offline currency => earned while online too!

                //Hustle
                achievementMultClick: 1.00,
                max: 0.10, // Max "Hustle" income
                min: 0.01, // Min "Hustle" income

                //Passive Income
                income: 0, // dollars generated per second while online only
                bitcoinIncome: 0, // Bitcoin generated per second
                achievementMultPassive: 1.00, // Multiplier from achievements on passive income => currently unused 
            },
            // Resources
            resources: {
                // Happiness
                happiness: 10, // current happiness
                happinessMax: 10, // current max happiness => upgradeable
                happinessGain: 0.001, // happiness gain per second => upgradeable

                // Can Collection
                cans: 0, // current number of cans
                bottles: 0, // current number of bottles
                bagSize: 10, // Max number of cans and bottles you can carry
                canValue: 0.05, // Value of each can
                bottleValue: 0.15, // Value of each bottle
                bottleChance: 0.05, // Chance to find a bottle instead of a can => 0.05 is 5%
                canHappiness: 0.5, // Happiness lost per can manually collected 
            },
            // Workers System Information
            workers: {
                beggars: { // name of worker
                    own: 0, // number of workers owned
                    cap: 10, // max number of this worker type
                    cost: 10, // current cost of worker
                    scale: 1.8, // cost scaling factor of worker
                    initial: 10, // starting cost of worker
                    generate: 0.25, // number of cans collected per second
                    license: 0 }, // cost of license to purchase this worker
                officeDrone: { 
					own: 0, 
                    cap: 10,
					cost: 100, 
                    scale: 1.8,
                    initial: 100,
					generate: 2,
                    license: 100 },
                factoryWorker: {
                    own: 0, 
                    cap: 10,
					cost: 1000, 
                    scale: 1.8,
                    initial: 1000,
					generate: 5,
                    license: 1000 },
            },
            // Upgrades
            upgrades: {
                // placeholder => upgradesSystem.js hosts these.
            },
            // Housing Choices
            housing: {
                // placeholder => housingSystem.js hosts these.
            },
            // Devices
            devices: {
                // placeholder => devicesSystem.js hosts these.
            },
            // Bitcoin Upgrades
            bitcoinUpgrades: {
                // placholder upgrades you can buy with bitcoin instead of selling it => bitcoinSystem.js hosts these.
            },
            // Permanent Unlockables - Progression Features Unlocked
            unlockables: {
                ownPhone: false, // currently unused.
            },
            // Stats
            stats: {
                totalClicks: 0, // total number of clicks on buttons only
                totalMoneyEarned: 0, // total money earned from all sources
                totalMoneyHustled: 0, // total money earned from hustling and busking
                totalCanEarnings: 0, // total money earned from selling cans and bottles
                totalCansCollected: 0, // total number of cans collected
                totalBottlesCollected: 0, // total number of bottles collected
                totalBitcoinEarned: 0, // total bitcoin earned - offline income
                timePlayed: 0, // total time played in seconds
                totalOfflineTime: 0, // total time while offline in seconds
            },
            // Settings
            settings: {
                notifications: true, // Enable or disable notifications
                autoSave: true, // Enable or disable auto-saving
            },
            version: "0.0.8", // Current version of the game
            lastSaved: {
                // Placeholder for last saved time
            },
            achievements: {
                unlocked: {
                    // Placeholder for unlocked achievements in game saves
                },
               // List of achievements
                list: {
                    firstDollar: {
                        name: "First Dollar", // Title of Achievement - displayed
                        description: "We all have to start somewhere!", // Description of Achievement - displayed
                        reward: "+1% to passive income", // Reward - displayed
                        condition: (game) => game.stats.totalMoneyEarned >= 1, // Unlock condition: (where the variable is located) => stat to check >= value to check for
                        unlocked: false, // Unlocked status - displayed technically
                        effect: (game) => { game.money.achievementMultPassive += 0.01; }, // Reward for completing
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

                    idleMaster: {
                        name: "Idle Master",
                        description: "Letting the money roll in!",
                        reward: "+2% to passive income",
                        condition: (game) => game.stats.timePlayed >= 3600, // 1 hour
                        unlocked: false,
                        effect: (game) => { game.money.achievementMultPassive += 0.02; },
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