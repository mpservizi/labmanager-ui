/**
 * Fornisce i parametri in base al ambiente di sviluppo
 */
export function getServerUrl() {
    // let baseUrl = 'http://localhost:3000/api/';
    let baseUrl = '/api/';
    return baseUrl;
}

/**
 * Indica se è attivo il flag per caricare dati fake
 */
export function isFake() {
    if (process.env.VUE_APP_IS_FAKE == 'true') {
        return true;
    }
    return false;
}
