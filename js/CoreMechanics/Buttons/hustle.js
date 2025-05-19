function hustle() {
    if (game.resources.happiness >= game.money.max) {
        let hustleIncome = Math.random() * (game.money.max - game.money.min) + game.money.min;
        let decHappiness = game.money.max - hustleIncome;
        game.money.USD += hustleIncome;
        game.stats.totalClicks ++;
        game.stats.totalMoneyEarned += (hustleIncome);
        game.stats.totalMoneyHustled += (hustleIncome);
        game.resources.happiness -= decHappiness;
        updateUI()
    }
}