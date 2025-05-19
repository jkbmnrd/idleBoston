// Import from file
function importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const imported = JSON.parse(event.target.result);
                if (confirm("This will overwrite your current game. Continue?")) {
                    game = imported;
                    updateUI();
                    saveGame();
                }
            } catch (e) {
                alert("Invalid save file!");
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}
