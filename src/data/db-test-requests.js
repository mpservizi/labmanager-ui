let testRequests = [
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
        c3: 6,
        testProgram: []
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
        c3: 6,
        testProgram: []
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
        c3: 24,
        testProgram: []
    }
];

export function getDatiTestRequests() {
    return testRequests;
}
