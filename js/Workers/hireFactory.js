function hireFactory() {
    if (game.money.USD >= game.workers.factoryWorker.cost) {
        game.money.USD -= game.workers.factoryWorker.cost;
        game.workers.factoryWorker.own += 1;
        game.workers.factoryWorker.cost += ((0.5 * game.workers.factoryWorker.initial) + ((game.workers.factoryWorker.cost * 1.1)-game.workers.factoryWorker.cost));
        updateUI();
        saveGame();
    } else {
        alert("You do not have the capital necessary to hire a Factory Worker. Earn more cash!")
    }
}