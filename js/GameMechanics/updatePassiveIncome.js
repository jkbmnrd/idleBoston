function updatePassiveIncome(deltaTime) {
    // Safeguard: Default to 0 if values are missing/NaN
    const deltaTimeSafe = Number(deltaTime) || 0; // Ensure deltaTime is a number
  
    // Calculate income
    const income = (game.workers.beggars.own * game.workers.beggars.generate * deltaTimeSafe) + (game.workers.officeDrone.own * game.workers.officeDrone.generate * deltaTimeSafe) + (game.workers.factoryWorker.own * game.workers.factoryWorker.generate * deltaTimeSafe);
    game.money.income = income * 10;

    // Calculate happiness
    const happyIncome = (game.resources.happinessGain);

    // Safely add to money (initialize if missing)
    game.money.USD = (game.money.USD || 0) + income;

    // Safely add to happiness
    if (game.resources.happiness <= (game.resources.happinessMax - happyIncome)) {
      game.resources.happiness = (game.resources.happiness || 0) + happyIncome;
    } else if (game.resources.happiness <= (game.resources.happinessMax + happyIncome)) {
      var tempHappy = (game.resources.happinessMax - game.resources.happiness);
      game.resources.happiness = (game.resources.happiness || 0) + tempHappy;
    } else
      return
  }