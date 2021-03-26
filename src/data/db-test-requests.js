const testRequests = [
    {
        Id: 1,
        Progetto: 'Universal range',
        Descrizione: 'Switch gallery schema 1 testato a 16A',
        Data_inizio: '04/03/2021',
        Data_fine: '28/03/2021',
        Week_inizio: 8,
        Week_fine: 12,
        Tecnico: 'Malkit',
        Cliente: 'Andrea Barbero'
    },
    {
        Id: 2,
        Progetto: 'Universal range',
        Descrizione: 'Switch gallery schema 6 testato a 16A',
        Data_inizio: '04/03/2021',
        Data_fine: '28/03/2021',
        Week_inizio: 8,
        Week_fine: 12,
        Tecnico: 'Malkit',
        Cliente: 'Andrea Barbero'
    },
    {
        Id: 3,
        Progetto: 'Makel',
        Descrizione: 'Verificare conformità prodotti Makel con IEC-606691-ED.4',
        Data_inizio: '05/04/2021',
        Data_fine: '28/04/2021',
        Week_inizio: 14,
        Week_fine: 17,
        Tecnico: 'Malkit',
        Cliente: 'Matteo Roncalli'
    }
];

export function getDatiTestRequests() {
    return testRequests;
}
