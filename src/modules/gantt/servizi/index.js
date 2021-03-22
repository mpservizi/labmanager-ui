import { pausa } from '@/shared/util.js';
import { parseWorload } from 'Moduli/gantt/js/parse-worload.js';
import { getWorloadDati } from '@/prove-codice/gantt/workload.js';
// Caricare i dati del gantt dal server
async function getAll() {
    let workloadDati = getWorloadDati();
    let result = parseWorload(workloadDati);
    // console.log(result);
    await pausa(10);
    return result;
}
export default {
    getAll
};
