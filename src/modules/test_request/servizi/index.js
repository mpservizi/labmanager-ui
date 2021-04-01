import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';

async function getAll() {
    let lista = [
        {
            id: 1,
            progetto: 'Universal range',
            descrizione: 'Switch gallery schema 1 testati a 16A',
            inizio: '04/03/2021',
            fine: '28/03/2021'
        },
        {
            id: 2,
            progetto: 'Universal range',
            descrizione: 'Switch gallery schema 6 testati a 16A',
            inizio: '04/03/2021',
            fine: '28/03/2021'
        }
    ];
    let dati = await TestRequetService.getRichieste();
    lista = dati.richieste;
    await pausa(1000);
    return lista;
}

export default {
    getAll
};
