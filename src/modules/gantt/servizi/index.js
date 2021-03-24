import { pausa } from '@/shared/util.js';
// import { parseWorload } from 'Moduli/gantt/js/parse-worload.js';
// import { getWorloadDati } from '@/prove-codice/gantt/workload.js';
import { getDatiCiclature } from '@/data/db-ciclature.js';
import { parseDatiCiclatura } from 'Moduli/gantt/js/workload-parser.js';
// Caricare i dati del gantt dal server
async function getAll() {
    let result = {
        data: [],
        links: []
    };
    // let workloadDati = getWorloadDati();
    // let result = parseWorload(workloadDati);
    let dati = getDatiCiclature();
    let tasks = parseDatiCiclatura(dati);
    result.data = tasks;
    console.log(result);
    
    // console.log(result);
    await pausa(10);
    return result;
}
export default {
    getAll
};
