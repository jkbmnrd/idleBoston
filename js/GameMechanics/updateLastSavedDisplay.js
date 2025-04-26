function updateLastSavedDisplay() {
    const lastSavedEl = document.getElementById('last-saved');
    if (game.lastSaved) {
        const date = new Date(game.lastSaved);
        lastSavedEl.textContent = `Last saved: ${date.toLocaleString()}`;
    } else {
        lastSavedEl.textContent = "Last saved: Never";
    }
}