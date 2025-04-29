// Define all upgrades
const upgradesData = {
    beggarManager: {
        id: "beggarManager",
        name: "Hobo Manager",
        description: "You find an experienced Beggar on a street corner and decide to hire her to teach your employees how to hustle. Each Beggar now earns +100% more income!",
        basePrice: 50,
        effect: () => {
            // Double beggar income
            game.workers.beggars.generate *= 2;
            console.log("Beggar income doubled!");
        },
        unlocked: () => game.workers.beggars.own >= 1
    },
    beggarSuperstar: {
        id: "beggarSuperstar",
        name: "Employee of the Month",
        description: "One of your employees does a phenomenal job and you award them employee of the month. Morale is boosted, increasing income by 100%!",
        basePrice: 100,
        effect: () => {
            // Double beggar income
            game.workers.beggars.generate *= 2;
            console.log("Beggar income doubled!");
        },
        unlocked: () => game.workers.beggars.own >= 1
    },
    beggarKing: {
        id: "beggarKing",
        name: "Beggar King",
        description: "One of your beggars hustles better than all others. You crown them the Beggar King, which inspires your beggar legion to produce +100% more cash!",
        basePrice: 200,
        effect: () => {
            // Double beggar income
            game.workers.beggars.generate *= 2;
            console.log("Beggar income doubled!");
        },
        unlocked: () => game.workers.beggars.own >= 1
    },
    officeTraining: {
        id: "officeTraining",
        name: "Office Training",
        description: "You decide to hire an HR team to do training on your current staff. Each Office Drone's productivity is boosted by 50%",
        basePrice: 2500,
        effect: () => {
            game.workers.officeDrone.generate *= 1.5;
        },
        unlocked: () => game.workers.officeDrone.own >= 1
    },
    streetPerforming: {
        id: "streetPerforming",
        name: "Street Performing",
        description: "Entice more people to pay attention to your Beggars, earning you +100% more income from each.",
        basePrice: 5000,
        effect: () => {
            game.workers.beggars.generate *= 1.5;
        },
        unlocked: () => game.workers.beggars.own >= 10
    },
    officeLunch: {
        id: "officeLunch",
        name: "Office Lunch",
        description: "Boost worker productivity by providing free lunches for your employees! Each Office Drone now earns an additioninal $2.50 per second.",
        basePrice: 15000,
        effect: () => {
            game.workers.officeDrone.generate += 2.5;
        },
        unlocked: () => game.workers.officeDrone.own >= 5
    },
    officePromotions: {
        id: "officePromotions",
        name: "Office Promotions",
        description: "Your Office Drones are upgraded into Cubicle Connoisseurs. +400% productivity of each Office Drone!",
        basePrice: 15000,
        effect: () => {
            game.workers.officeDrone.generate *= 4;
        },
        unlocked: () => game.workers.officeDrone.own >= 10
    },
    // Add more upgrades here
};

// Initialize upgrades in game state
function initUpgrades() {
    if (!game.upgrades) {
        game.upgrades = {};
    }
    
    // Initialize each upgrade's purchased state
    Object.keys(upgradesData).forEach(upgradeId => {
        if (game.upgrades[upgradeId] === undefined) {
            game.upgrades[upgradeId] = false;
        }
    });
}

// Render all available upgrades
function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '';
    
    Object.values(upgradesData).forEach(upgrade => {
        const isUnlocked = upgrade.unlocked();
        const isPurchased = game.upgrades[upgrade.id];
        const canAfford = game.money.USD >= upgrade.basePrice;
        
        const upgradeCard = document.createElement('div');
        upgradeCard.className = `upgrade-card ${
            isPurchased ? 'purchased' : 
            !isUnlocked ? 'unavailable' : ''
        }`;
        
        upgradeCard.innerHTML = `
            <div class="upgrade-header">
                <h3 class="upgrade-title">${upgrade.name}</h3>
                <span class="upgrade-price">$${formatNumber(upgrade.basePrice)}</span>
            </div>
            <p class="upgrade-description">${upgrade.description}</p>
            <button 
                class="upgrade-button ${
                    isPurchased ? 'purchased' : 
                    !isUnlocked || !canAfford ? 'disabled' : ''
                }" 
                onclick="buyUpgrade('${upgrade.id}')"
                ${isPurchased || !isUnlocked ? 'disabled' : ''}
            >
                ${isPurchased ? 'Purchased' : 
                  !isUnlocked ? 'Locked' : 
                  canAfford ? 'Buy Now' : 'Too Expensive'}
            </button>
        `;
        
        container.appendChild(upgradeCard);
    });
}

// Purchase an upgrade
function buyUpgrade(upgradeId) {
    const upgrade = upgradesData[upgradeId];
    
    if (!upgrade || game.upgrades[upgradeId]) return;
    
    if (game.money.USD >= upgrade.basePrice) {
        game.money.USD -= upgrade.basePrice;
        game.upgrades[upgradeId] = true;
        upgrade.effect();
        
        // Visual feedback
        const button = document.querySelector(`button[onclick="buyUpgrade('${upgradeId}')"]`);
        if (button) {
            button.textContent = 'Purchased!';
            button.disabled = true;
            button.classList.add('purchased');
            
            // Find the card and update its style
            const card = button.closest('.upgrade-card');
            if (card) {
                card.classList.add('purchased');
            }
            
            setTimeout(() => {
                button.textContent = 'Purchased';
                renderUpgrades(); // Refresh all upgrades
            }, 1000);
        }
        
        updateUI();
        saveGame();
    }
}

// Call this when the game loads
function setupUpgrades() {
    initUpgrades();
    renderUpgrades();
}