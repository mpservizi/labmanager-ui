import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';

async function getAll() {
    let dati = await TestRequetService.getRichieste();
    let lista = dati.richieste;
    await pausa(100);
    return lista;
}
async function save(payload) {
    let wkInizio = 1;
    let wkFine = 2;

    payload.weekInizio = wkInizio;
    payload.weekFine = wkFine;

    console.log(payload);
    await pausa(100);
    return true;
}
export default {
    getAll,
    save
};
