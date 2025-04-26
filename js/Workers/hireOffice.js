function hireOffice() {
    if (game.money.USD >= game.workers.officeDrone.cost) {
        game.money.USD -= game.workers.officeDrone.cost;
        game.workers.officeDrone.own += 1;
        game.workers.officeDrone.cost += ((0.5 * game.workers.officeDrone.initial) + ((game.workers.officeDrone.cost * 1.1)-game.workers.officeDrone.cost));
        updateUI();
        saveGame();
    } else {
        alert("You do not have the capital necessary to hire an Office Drone. Earn more cash!")
    }
}