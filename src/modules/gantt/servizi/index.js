import { pausa } from '@/shared/util.js';
// import { parseWorload } from 'Moduli/gantt/js/parse-worload.js';
// import { getWorloadDati } from '@/prove-codice/gantt/workload.js';
import { getDatiCiclature } from '@/data/db-ciclature.js';
import { CiclaturaService } from 'Moduli/schedular/api/index.js';
import { parseDatiCiclatura } from 'Moduli/gantt/js/workload-parser.js';
// Caricare i dati del gantt dal server
async function getAll() {
    let result = {
        data: [],
        links: []
    };
    let dati = getDatiCiclature();
    // let datiCiclatura = await CiclaturaService.getDatiCiclatura();
    // let dati = JSON.parse(datiCiclatura.eventi);
    let tasks = parseDatiCiclatura(dati);
    result.data = tasks;
    await pausa(10);
    return result;
}
export default {
    getAll
};
