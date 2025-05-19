const upgradesData = { // Defines all upgrades => first upgrade has comments for how to use.
    firstPhone: { // should match the ID 
        id: "firstPhone", // unique identifier for the upgrade
        name: "'Buy' Your First Phone!", // name of upgrade => displayed
        description: "The beginning of your journey. You find a phone on the ground and decide to keep it.",// description of upgrade => displayed
        basePrice: 5, // cost of upgrade
        effect: () => {
            createNotification("You got a phone! Go unlock it in the devices menu!"); // effect of upgrade
        },
        unlocked: () => game.money.USD >= 12, // how to unlock the upgrade
    },
    beggarManager: { // should match the ID
        id: "beggarManager", // unique identifier for the upgrade
        name: "Beggar Manager", // name of upgrade => displayed
        description: "Hire an experience beggar to oversee the collection of cans. Increase can production of all beggars by 25%.", // description of upgrade => displayed
        basePrice: 20, // cost of upgrade
        effect: () => {
            game.workers.beggars.generate *= 1.25; // effect of upgrade
            createNotification("Beggar income increased by 25%!"); // notification of what just happened
        },
        unlocked: () => game.workers.beggars.own >= 1 // how to unlock the upgrade
    },
    bagSizeIncrease1: {
        id: "bagSizeIncrease1",
        name: "Small Bag",
        description: "A beggar found a small bag on the ground. It can hold 5 more cans!",
        basePrice: 25,
        effect: () => {
            game.resources.bagSize += 5;
            createNotification("Bag size incraesed by 5!");
        },
        unlocked: () => game.workers.beggars.own >= 2
    },
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