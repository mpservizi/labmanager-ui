let testRequests = {
    richieste: [
        {
            id: 1,
            codiceProgetto: 'PR-03488',
            titoloProgetto: 'Universal range',
            descrizione: 'Switch gallery schema 1 testato a 16A',
            dataInizio: '04/03/2021',
            dataFine: '28/03/2021',
            weekInizio: 8,
            weekFine: 12,
            tecnico: 'Malkit',
            cliente: 'Andrea Barbero',
            priority: 1,
            stato: 4,
            c1: 6,
            c2: 6,
            c3: 6
        },
        {
            id: 2,
            codiceProgetto: 'PR-03488',
            titoloProgetto: 'Universal range',
            descrizione: 'Switch gallery schema 6 testato a 16A',
            dataInizio: '04/03/2021',
            dataFine: '28/03/2021',
            weekInizio: 8,
            weekFine: 12,
            tecnico: 'Malkit',
            cliente: 'Andrea Barbero',
            priority: 1,
            stato: 4,
            c1: 6,
            c2: 6,
            c3: 6
        },
        {
            id: 3,
            codiceProgetto: 'PR-00017',
            titoloProgetto: 'Makel',
            descrizione:
                'Verificare conformità prodotti Makel con IEC-606691-ED.4',
            dataInizio: '05/04/2021',
            dataFine: '28/04/2021',
            weekInizio: 14,
            weekFine: 17,
            tecnico: 'Malkit',
            cliente: 'Matteo Roncalli',
            priority: 2,
            stato: 1,
            c1: 30,
            c2: 0,
            c3: 24
        }
    ],
    plans: [
        {
            id: 1,
            idRequest: 1,
            titoloProgetto: 'Universal range',
            titolo: 'Schema 1',
            stato: 4,
            c1: 6,
            c2: 6,
            c3: 6
        },
        {
            id: 2,
            idRequest: 2,
            titoloProgetto: 'Universal range',
            titolo: 'Schema 6',
            stato: 4,
            c1: 6,
            c2: 6,
            c3: 6
        },
        {
            id: 3,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0010 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 4,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0030 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 5,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0220 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 6,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0410 - 19.1-PB',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 0
        },
        {
            id: 7,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0240 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 8,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0210 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 9,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0040 - 19.1',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 10,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0110 - 19.1-PB',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 0
        },
        {
            id: 11,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0020 - 19.3',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        },
        {
            id: 12,
            idRequest: 3,
            titoloProgetto: 'Makel',
            titolo: 'WL0310 - 19.3',
            stato: 1,
            c1: 3,
            c2: 0,
            c3: 3
        }
    ]
};

export function getDatiTestRequests() {
    return testRequests;
}
