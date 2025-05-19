// Define all houses
const housingData = {
    noHouse: {
        id: "noHouse",
        name: "No House",
        description: "You do not own a house. You sleep under an underpass and hope for the best. Effect: Happiness +0.01/s",
        basePrice: 0,
        effect: () => {
            game.resources.happinessGain += 0.01;
            game.resources.happinessMax += 0;
        },
        unlocked: () => game.workers.beggars.own >= 1
    },
    cardboardBox: {
        id: "cardboardBox",
        name: "Cardboard Box",
        description: "Purchase a cardboard box from the store down the road. They notice you're homeless, so they upcharge you! Effect: Happiness +0.01/s, Max Happiness +5",
        basePrice: 250,
        effect: () => {
            game.resources.happinessGain += 0.01;
            game.resources.happinessMax += 5;
        },
        unlocked: () => game.workers.beggars.own >= 10
    },
    trailerPark: {
        id: "trailerPark",
        name: "Room in a Trailer Park",
        description: "You purchase a room in a trailer park. It's not much, but it's your new home. Effect: Happiness +0.02/s, Max Happiness +8",
        basePrice: 650,
        effect: () => {
            game.resources.happinessGain += 0.02;
            game.resources.happinessMax += 8;
        },
        unlocked: () => game.workers.beggars.own >= 20
    },
    studioApartment: {
        id: "studioApartment",
        name: "Studio Apartment",
        description: "You purchase a studio apartment in the city. It's small, but it's yours! Effect: Happiness +0.05/s, Max Happiness +12",
        basePrice: 250,
        effect: () => {
            game.resources.happinessGain += 0.04;
            game.resources.happinessMax += 12;
        },
        unlocked: () => game.workers.officeDrone.own >= 1
    },
    // Add more houses here
};

// Initialize housing in game state
function initHousing() {
    if (!game.housing) {
        game.housing = {};
    }
    
    // Initialize each house's purchased state
    Object.keys(housingData).forEach(housingId => {
        if (game.housing[housingId] === undefined) {
            game.housing[housingId] = false;
        }
    });
}

// Render all available Housing
function renderHousing() {
    const container = document.getElementById('housing-container');
    container.innerHTML = '';
    
    Object.values(housingData).forEach(housing => {
        const isUnlocked = housing.unlocked();
        const isPurchased = game.housing[housing.id];
        const canAfford = game.money.USD >= housing.basePrice;
        
        const housingCard = document.createElement('div');
        housingCard.className = `housing-card ${
            isPurchased ? 'purchased' : 
            !isUnlocked ? 'unavailable' : ''
        }`;
        
        housingCard.innerHTML = `
            <div class="housing-header">
                <h3 class="housing-title">${housing.name}</h3>
                <span class="housing-price">$${formatNumber(housing.basePrice)}</span>
            </div>
            <p class="housing-description">${housing.description}</p>
            <button 
                class="housing-button ${
                    isPurchased ? 'purchased' : 
                    !isUnlocked || !canAfford ? 'disabled' : ''
                }" 
                onclick="buyHousing('${housing.id}')"
                ${isPurchased || !isUnlocked ? 'disabled' : ''}
            >
                ${isPurchased ? 'Purchased' : 
                  !isUnlocked ? 'Locked' : 
                  canAfford ? 'Buy Now' : 'Too Expensive'}
            </button>
        `;
        
        container.appendChild(housingCard);
        if (!container) {
            console.error("Housing container not found!");
            return;
        }
    });
}

// Purchase an housing
function buyHousing(housingId) {
    const housing = housingData[housingId];
    
    if (!housing || game.housing[housingId]) return;
    
    if (game.money.USD >= housing.basePrice) {
        game.money.USD -= housing.basePrice;
        game.housing[housingId] = true;
        housing.effect();
        
        // Visual feedback
        const button = document.querySelector(`button[onclick="buyHousing('${housingId}')"]`);
        if (button) {
            button.textContent = 'Purchased!';
            button.disabled = true;
            button.classList.add('purchased');
            
            // Find the card and update its style
            const card = button.closest('.housing-card');
            if (card) {
                card.classList.add('purchased');
            }
            
            setTimeout(() => {
                button.textContent = 'Purchased';
                renderHousing(); // Refresh all Housing
            }, 1000);
        }
        updateUI();
        saveGame();
    }
}

// Call this when the game loads
function setupHousing() {
    initHousing();
    renderHousing();
}