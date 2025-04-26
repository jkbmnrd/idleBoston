function hustle() {
    if (game.resources.happiness >= game.money.max) {
        var hustleIncome = Math.random() * (game.money.max - game.money.min) + game.money.min;
        var decHappiness = game.money.max - hustleIncome;
        game.money.USD += hustleIncome;
        game.stats.totalClicks ++;
        game.stats.totalMoneyEarned += hustleIncome;
        game.resources.happiness -= decHappiness;
        updateUI()
    }
}