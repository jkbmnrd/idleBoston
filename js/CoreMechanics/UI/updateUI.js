function updateUI() {
    //Worker Updates
    document.getElementById("Beggars").textContent = game.workers.beggars.own.toFixed(0);
    document.getElementById("BeggarsCost").textContent = formatNumber(game.workers.beggars.cost);
    document.getElementById("BeggarsGenerating").textContent = formatNumber(game.workers.beggars.generate.toFixed(2) * game.workers.beggars.own);

    document.getElementById("OfficeDrones").textContent = game.workers.officeDrone.own.toFixed(0);
    document.getElementById("OfficeDronesCost").textContent = formatNumber(game.workers.officeDrone.cost);
    document.getElementById("OfficeDronesGenerating").textContent = formatNumber(game.workers.officeDrone.generate * game.workers.officeDrone.own);
    
    document.getElementById("FactoryWorker").textContent = game.workers.factoryWorker.own.toFixed(0);
    document.getElementById("FactoryWorkerCost").textContent = formatNumber(game.workers.factoryWorker.cost);
    document.getElementById("FactoryWorkerGenerating").textContent = formatNumber(game.workers.factoryWorker.generate * game.workers.factoryWorker.own);
   
    updateSidebar();
    renderUpgrades();
    renderHousing();
}