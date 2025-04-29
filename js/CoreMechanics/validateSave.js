function validateSave(data) {
    const required = ['money', 'workers', 'stats'];
    return required.every(key => data[key] !== undefined);
}
