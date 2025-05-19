function updateSidebar() {
  // Update currencies
  document.getElementById('stat-usd').textContent = "$" + game.money.USD.toFixed(2);
  document.getElementById('stat-income').textContent = "+$" + game.money.income.toFixed(2) + "/s";
  document.getElementById('stat-happiness').textContent = game.resources.happiness.toFixed(2);
  document.getElementById('stat-happy-max').textContent = game.resources.happinessMax;
  document.getElementById('stat-euro').textContent = "€" + game.money.euro.toFixed(2);
  document.getElementById('stat-bitcoin').textContent = "₿" + game.money.bitcoin.toFixed(9);

  // Update bottles and cans
  document.getElementById('stat-bottles').textContent = game.resources.bottles.toFixed(0);
  document.getElementById('stat-cans').textContent = game.resources.cans.toFixed(0);
  
  // Inventory Size
  document.getElementById('stat-inventory').textContent = (game.resources.bottles + game.resources.cans).toFixed(0) + "/" + game.resources.bagSize;

  // Update stats
  document.getElementById('stat-totalClicks').textContent = game.stats.totalClicks;
  document.getElementById('stat-totalEarned').textContent = "$" + game.stats.totalMoneyEarned.toFixed(2);
  document.getElementById('stat-totalBottles').textContent = game.stats.totalBottlesCollected.toFixed(0);
  document.getElementById('stat-totalCans').textContent = game.stats.totalCansCollected.toFixed(0);
  document.getElementById('stat-totalHustleEarned').textContent = "$" + game.stats.totalMoneyHustled.toFixed(2);
  document.getElementById('stat-totalCanEarned').textContent = "$" + game.stats.totalCanEarnings.toFixed(2);
  document.getElementById('stat-totalBitcoinEarned').textContent = "₿" + game.stats.totalBitcoinEarned.toFixed(9);

  // Format time played (seconds to HH:MM:SS)
  const totalSeconds = Math.floor(game.stats.timePlayed); // Remove decimal seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.getElementById('stat-timePlayed').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

