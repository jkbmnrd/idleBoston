function handleOfflineTime() {
    const lastPlayed = localStorage.getItem("lastPlayed");
    if (!lastPlayed) return;
    
    const offlineSeconds = (Date.now() - lastPlayed) / 1000;
    if (offlineSeconds > 5) { // Ignore sub-5-second breaks
        updatePassiveIncome(offlineSeconds);
        showOfflineRewards(offlineSeconds);
    }
}