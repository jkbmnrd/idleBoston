function updateSidebar() {
  // Update currencies
  document.getElementById('stat-usd').textContent = "$" + game.money.USD.toFixed(2);
  document.getElementById('stat-income').textContent = "$" + game.money.income.toFixed(2) + "/s";
  document.getElementById('stat-happiness').textContent = game.resources.happiness.toFixed(2);
  document.getElementById('stat-happy-max').textContent = game.resources.happinessMax;
  document.getElementById('stat-euro').textContent = "€" + game.money.Euro.toFixed(2);
  document.getElementById('stat-bitcoin').textContent = "₿" + game.money.Bitcoin.toFixed(6);
  
  // Update stats
  document.getElementById('stat-totalClicks').textContent = game.stats.totalClicks;
  document.getElementById('stat-totalEarned').textContent = "$" + game.stats.totalMoneyEarned.toFixed(2);

  // Format time played (seconds to HH:MM:SS)
  const totalSeconds = Math.floor(game.stats.timePlayed); // Remove decimal seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.getElementById('stat-timePlayed').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}