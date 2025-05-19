// Export save as file
function exportSave() {
    const blob = new Blob([JSON.stringify(game)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incremental_game_save_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}