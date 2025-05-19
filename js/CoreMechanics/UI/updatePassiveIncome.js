function updatePassiveIncome(deltaTime) {
    // Safeguard: Default to 0 if values are missing/NaN
    const deltaTimeSafe = Number(deltaTime) || 0; // Ensures deltaTime is a number
  
    // Calculate income => no longer used
    // const income = (game.money.achievementMultPassive * (game.workers.beggars.own * game.workers.beggars.generate * deltaTimeSafe) + (game.workers.officeDrone.own * game.workers.officeDrone.generate * deltaTimeSafe) + (game.workers.factoryWorker.own * game.workers.factoryWorker.generate * deltaTimeSafe));
    // game.money.income = income * 10;

    // Calculate cans per second
    const cansEarned = (game.workers.beggars.generate * game.workers.beggars.own * deltaTimeSafe);
    if (game.resources.bottles + game.resources.cans < game.resources.bagSize) {
      game.resources.cans = (game.resources.cans || 0) + cansEarned;
      game.stats.totalCansCollected = (game.stats.totalCansCollected + cansEarned);
    }


    // Calculate bitcoin per second
    const bitcoinIncome = (game.money.bitcoinIncome * deltaTimeSafe);
    game.money.bitcoin = (game.money.bitcoin || 0) + bitcoinIncome;
    game.stats.totalBitcoinEarned = (game.stats.totalBitcoinEarned + bitcoinIncome);

    // Safely add to money (initialize if missing) => no longer used
    // game.money.USD = (game.money.USD || 0) + income;
    // game.stats.totalMoneyEarned = (game.stats.totalMoneyEarned + income);


    // Calculate happiness
    const happyIncome = (game.resources.happinessGain);

    // Safely add to happiness
    if (game.resources.happiness <= (game.resources.happinessMax - happyIncome)) {
      game.resources.happiness = (game.resources.happiness || 0) + happyIncome;
    } else if (game.resources.happiness <= (game.resources.happinessMax + happyIncome)) {
      let tempHappy = (game.resources.happinessMax - game.resources.happiness);
      game.resources.happiness = (game.resources.happiness || 0) + tempHappy;
    } else
      return
  }