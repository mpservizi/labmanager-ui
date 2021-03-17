/**
 * Lista dei moduli presenti nella cartella modules
 * Questa lista è usata per installare i moduli all avvio e per definire i root per raggiungere i moduli
 */
export const LISTA_MODULI = [
    {
        id: 1,
        cartella: 'main',
        label: 'Main',
        route: '/',
        descrizione: 'Modulo entry point per intera applicazione',
        registrareOnAvvio: false //Modulo main caricato nel file main.js
    },
    {
        id: 2,
        cartella: 'schedular',
        label: 'Schedular Ciclature',
        route: '/schedular',
        descrizione: 'Pianifica le prove sui stalli di ciclatura',
        registrareOnAvvio: true
    },
    {
        id: 3,
        cartella: 'monitor_ciclatura',
        label: 'Monitor Ciclature',
        route: '/monitor_ciclatura',
        descrizione: 'Mostra lo stato reale dei stalli di ciclatura',
        registrareOnAvvio: true
    }
];

export const ROUTE_MODULI = {};
