let debugEnabled = false;

module.exports = {
    enableDebug() {
        debugEnabled = true;
    },
    debug(...args) {
        if (debugEnabled) {
            console.log(...args);
        }
    },
    log(...args) {
        console.log(...args);
    }
}