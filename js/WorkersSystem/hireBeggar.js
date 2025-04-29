function hireBeggar() {
    if (game.money.USD >= game.workers.beggars.cost) {
        game.money.USD -= game.workers.beggars.cost;
        game.workers.beggars.own += 1;
        game.workers.beggars.cost += ((0.5 * game.workers.beggars.initial) + ((game.workers.beggars.cost **1.02)-game.workers.beggars.cost));
        updateUI();
        saveGame();
    } else {
        alert("You do not have the capital necessary to hire a beggar. Pitiful!")
    }
}