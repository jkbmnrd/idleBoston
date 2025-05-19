function sellBitcoin() {
    if (game.money.bitcoin > 0 ) { // Check if there is bitcoin to sell
        let bitcoinProfit = (game.money.bitcoin * 5000); // 1 bitcoin = 5000 USD
        game.money.USD += bitcoinProfit;
        game.money.bitcoin = 0; // Reset bitcoin to 0 after selling
        game.stats.totalMoneyEarned += bitcoinProfit;
        game.stats.totalClicks ++;
        updateUI()
    } 
}