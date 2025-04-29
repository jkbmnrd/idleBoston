function updateUI() {
    //Worker Updates
    document.getElementById("Beggars").textContent = formatNumber(game.workers.beggars.own);
    document.getElementById("BeggarsCost").textContent = formatNumber(game.workers.beggars.cost);
    document.getElementById("BeggarsGenerating").textContent = formatNumber(game.workers.beggars.generate.toFixed(2) * game.workers.beggars.own);

    document.getElementById("OfficeDrones").textContent = formatNumber(game.workers.officeDrone.own);
    document.getElementById("OfficeDronesCost").textContent = formatNumber(game.workers.officeDrone.cost);
    document.getElementById("OfficeDronesGenerating").textContent = formatNumber(game.workers.officeDrone.generate * game.workers.officeDrone.own);
    
    document.getElementById("FactoryWorker").textContent = formatNumber(game.workers.factoryWorker.own);
    document.getElementById("FactoryWorkerCost").textContent = formatNumber(game.workers.factoryWorker.cost);
    document.getElementById("FactoryWorkerGenerating").textContent = formatNumber(game.workers.factoryWorker.generate * game.workers.factoryWorker.own);
   
    updateSidebar();
    renderUpgrades();
    renderHousing();
}