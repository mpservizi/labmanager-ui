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
        routeName: 'home',
        descrizione: 'Modulo entry point per intera applicazione',
        registrareOnAvvio: false //Modulo main caricato nel file main.js
    },
    {
        id: 2,
        cartella: 'schedular',
        label: 'Schedular Ciclature',
        route: '/schedular',
        routeName: 'SchedularView',
        descrizione: `
            Assegnare le prove alle postazioni di ciclatura.
            Aggiornare lo stato delle prove.
            Definire le priorità.
            `,
        registrareOnAvvio: true
    },
    {
        id: 3,
        cartella: 'monitor_ciclatura',
        label: 'Monitor Ciclature',
        route: '/monitor_ciclatura',
        routeName: 'monitor_ciclatura',
        descrizione: 'Mostra lo stato reale dei stalli di ciclatura',
        registrareOnAvvio: true
    },
    {
        id: 4,
        cartella: 'test_request',
        label: 'Test request',
        route: '/test_request',
        routeName: 'test_requests',
        descrizione:
            'Gestire qui tutte le richieste per le prove di ciclatura. Scegliere la quantità dei prodotti da testare e definire le tempistiche per i risultati',
        registrareOnAvvio: true
    },
    {
        id: 5,
        cartella: 'gantt',
        label: 'Planner',
        route: '/gantt',
        routeName: 'gantt',
        descrizione:
            'Mostra il carico di lavoro delle macchine di ciclatura in base ai dati dello Schedular. Non è possibile modificare lo stato delle prove.',
        registrareOnAvvio: true
    }
];

export const ROUTE_MODULI = {};
