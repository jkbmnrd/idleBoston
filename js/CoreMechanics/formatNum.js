function formatNumber(num) {
    if(num >= 1e6) return (num/1e6).toFixed(2) + "M";
    if(num >= 1e3) return (num/1e3).toFixed(2) + "K";
    return num.toFixed(2);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
}