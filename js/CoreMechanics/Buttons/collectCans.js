function collectCans() {
    if (game.resources.happiness >= game.resources.canHappiness && game.resources.bagSize > (game.resources.cans + game.resources.bottles)) {
        if (Math.random() == game.resources.bottleChance) {
            game.resources.bottles += 1;
            game.resources.happiness -= game.resources.canHappiness;
            game.stats.totalBottlesCollected++;
            game.stats.totalClicks ++;
            game.resources.bottles += 1;
            updateUI()
        }
        else {
            game.resources.happiness -= game.resources.canHappiness;
            game.stats.totalCansCollected++;
            game.stats.totalClicks ++;
            game.resources.cans += 1;
            updateUI()
        }
    }
}