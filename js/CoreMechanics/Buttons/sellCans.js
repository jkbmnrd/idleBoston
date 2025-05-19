function sellCans() {
    if (game.resources.cans > 0 || game.resources.bottles > 0) { // Check if there are cans or bottles to sell
        let earnings = (game.resources.cans * game.resources.canValue);
        game.money.USD += earnings;
        game.stats.totalMoneyEarned += earnings;
        game.stats.totalCanEarnings += earnings;
        game.stats.totalClicks ++;
        game.resources.cans = 0;
        updateUI()
    } 
}