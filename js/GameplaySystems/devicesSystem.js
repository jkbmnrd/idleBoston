// Define all devices
const devicesData = {
    brokenTracFone: {
        id: "brokenTracFone",
        name: "Broken TracFone",
        description: "You have a broken TracFone. It doesn't really work for calls, but you can still use it to mine for Bitcoin. Effect: Offline Bitcoin Production +0.000000001/s",
        basePrice: 1,
        effect: () => {
            game.money.bitcoinIncome += 0.000000001;
        },
        unlocked: () => game.unlockables.ownPhone = true,
    },
    // Add more devices here
};

// Initialize devices in game state
function initDevices() {
    if (!game.devices) {
        game.devices = {};
    }
    
    // Initialize each devices' purchased state
    Object.keys(devicesData).forEach(devicesId => {
        if (game.devices[devicesId] === undefined) {
            game.devices[devicesId] = false;
        }
    });
}

// Render all available devices
function renderDevices() {
    const container = document.getElementById('devices-container');
    container.innerHTML = '';
    
    Object.values(devicesData).forEach(devices => {
        const isUnlocked = devices.unlocked();
        const isPurchased = game.devices[devices.id];
        const canAfford = game.money.USD >= devices.basePrice;
        
        const devicesCard = document.createElement('div');
        devicesCard.className = `devices-card ${
            isPurchased ? 'purchased' : 
            !isUnlocked ? 'unavailable' : ''
        }`;
        
        devicesCard.innerHTML = `
            <div class="devices-header">
                <h3 class="devices-title">${devices.name}</h3>
                <span class="devices-price">$${formatNumber(devices.basePrice)}</span>
            </div>
            <p class="devices-description">${devices.description}</p>
            <button 
                class="devices-button ${
                    isPurchased ? 'purchased' : 
                    !isUnlocked || !canAfford ? 'disabled' : ''
                }" 
                onclick="buyDevices('${devices.id}')"
                ${isPurchased || !isUnlocked ? 'disabled' : ''}
            >
                ${isPurchased ? 'Purchased' : 
                  !isUnlocked ? 'Locked' : 
                  canAfford ? 'Buy Now' : 'Too Expensive'}
            </button>
        `;
        
        container.appendChild(devicesCard);
        if (!container) {
            console.error("Devices container not found!");
            return;
        }
    });
}

// Purchase a device
function buyDevices(devicesId) {
    const devices = devicesData[devicesId];
    
    if (!devices || game.devices[devicesId]) return;
    
    if (game.money.USD >= devices.basePrice) {
        game.money.USD -= devices.basePrice;
        game.devices[devicesId] = true;
        devices.effect();
        
        // Visual feedback
        const button = document.querySelector(`button[onclick="buyDevices('${devicesId}')"]`);
        if (button) {
            button.textContent = 'Purchased!';
            button.disabled = true;
            button.classList.add('purchased');
            
            // Find the card and update its style
            const card = button.closest('.devices-card');
            if (card) {
                card.classList.add('purchased');
            }
            
            setTimeout(() => {
                button.textContent = 'Purchased';
                renderDevices(); // Refresh all devices
            }, 1000);
        }
        updateUI();
        saveGame();
    }
}

// Call this when the game loads
function setupDevices() {
    initDevices();
    renderDevices();
}