export const LISTA_MODULI = [
    {
        cartella: 'main',
        label: 'Main',
        route: '/',
        descrizione: 'Modulo entry point per intera applicazione',
        registrareOnAvvio: false
    },
    {
        cartella: 'schedular',
        label: 'Schedular Ciclature',
        route: '/schedular',
        descrizione: 'Pianifica le prove sui stalli di ciclatura',
        registrareOnAvvio: true
    },
    {
        cartella: 'monitor_ciclatura',
        label: 'Monitor Ciclature',
        route: '/monitor_ciclatura',
        descrizione: 'Mostra lo stato reale dei stalli di ciclatura',
        registrareOnAvvio: true
    }
];
