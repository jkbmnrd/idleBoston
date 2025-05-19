// Define all bitcoin upgrades
const bitcoinUpgradesData = {
    orderPizza: {
        id: "orderPizza",
        name: "Order a Pizza",
        description: "Surely these bitcoin will not rise in value or be used for anything else. Order a pizza for yourself and your friends. Effect: Happiness Regenration +0.01/s",
        basePrice: 0.000011,
        effect: () => {
            game.resources.happinessGain += 0.01;
        },
        unlocked: () => game.workers.beggars.own >= 10
    },
    threatenMayor: {
        id: "threatenMayor",
        name: "Threaten The Mayor",
        description: "Pay a local hacker to threaten the mayor of The City. It'll cost you, but your beggars will not be harassed anymore. Effect: Beggar Income +250%",
        basePrice: 0.0053,
        effect: () => {
            game.workers.beggars.generate *= 2.5;
        },
        unlocked: () => game.workers.beggars.own >= 10
    },

    // Add more upgrades here
};

// Initialize upgrades in game state
function initBitcoinUpgrades() {
    if (!game.bitcoinUpgrades) {
        game.bitcoinUpgrades = {};
    }
    
    // Initialize each upgrade's purchased state
    Object.keys(bitcoinUpgradesData).forEach(bitcoinUpgradesId => {
        if (game.bitcoinUpgrades[bitcoinUpgradesId] === undefined) {
            game.bitcoinUpgrades[bitcoinUpgradesId] = false;
        }
    });
}

// Render all available Bitcoin Upgrades
function renderBitcoinUpgrades() {
    const container = document.getElementById('bitcoinUpgrades-container');
    container.innerHTML = '';
    
    Object.values(bitcoinUpgradesData).forEach(bitcoinUpgrades => {
        const isUnlocked = bitcoinUpgrades.unlocked();
        const isPurchased = game.bitcoinUpgrades[bitcoinUpgrades.id];
        const canAfford = game.money.bitcoin >= bitcoinUpgrades.basePrice;
        
        const bitcoinUpgradesCard = document.createElement('div');
        bitcoinUpgradesCard.className = `bitcoinUpgrades-card ${
            isPurchased ? 'purchased' : 
            !isUnlocked ? 'unavailable' : ''
        }`;
        
        bitcoinUpgradesCard.innerHTML = `
            <div class="bitcoinUpgrades-header">
                <h3 class="bitcoinUpgrades-title">${bitcoinUpgrades.name}</h3>
                <span class="bitcoinUpgrades-price">₿${(bitcoinUpgrades.basePrice).toFixed(6)}</span>
            </div>
            <p class="bitcoinUpgrades-description">${bitcoinUpgrades.description}</p>
            <button 
                class="bitcoinUpgrades-button ${
                    isPurchased ? 'purchased' : 
                    !isUnlocked || !canAfford ? 'disabled' : ''
                }" 
                onclick="buyBitcoinUpgrades('${bitcoinUpgrades.id}')"
                ${isPurchased || !isUnlocked ? 'disabled' : ''}
            >
                ${isPurchased ? 'Purchased' : 
                  !isUnlocked ? 'Locked' : 
                  canAfford ? 'Buy Now' : 'Too Expensive'}
            </button>
        `;
        
        container.appendChild(bitcoinUpgradesCard);
        if (!container) {
            console.error("Bitcoin upgrades container not found!");
            return;
        }
    });
}

// Purchase a bitcoin upgrade
function buyBitcoinUpgrades(bitcoinUpgradesId) {
    const bitcoinUpgrades = bitcoinUpgradesData[bitcoinUpgradesId];
    
    if (!bitcoinUpgrades || game.bitcoinUpgrades[bitcoinUpgrades]) return;
    
    if (game.money.bitcoin >= bitcoinUpgrades.basePrice) {
        game.money.bitcoin -= bitcoinUpgrades.basePrice;
        game.bitcoinUpgrades[bitcoinUpgradesId] = true;
        bitcoinUpgrades.effect();
        
        // Visual feedback
        const button = document.querySelector(`button[onclick="buyBitcoinUpgrades('${bitcoinUpgradesId}')"]`);
        if (button) {
            button.textContent = 'Purchased!';
            button.disabled = true;
            button.classList.add('purchased');
            
            // Find the card and update its style
            const card = button.closest('.bitcoinUpgrades-card');
            if (card) {
                card.classList.add('purchased');
            }
            
            setTimeout(() => {
                button.textContent = 'Purchased';
                renderBitcoinUpgrades(); // Refresh all Housing
            }, 1000);
        }
        updateUI();
        saveGame();
    }
}

// Call this when the game loads
function setupBitcoinUpgrades() {
    initBitcoinUpgrades();
    renderBitcoinUpgrades();
}