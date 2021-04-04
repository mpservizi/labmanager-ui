import { parseEventiServer, parseRisorse } from './data-parser.js';
import { CiclaturaService } from '@/api/CiclaturaService.js';
/**
 * Carica la liste delle risorse dal server
 * @returns
 */
export async function loadRisorse() {
    let data = await CiclaturaService.getRisorse();
    return parseRisorse(data);
}

/**
 * Carica i dati di ciclatura dal server
 * @returns
 */
export async function loadDatiCiclatura() {
    let data = await CiclaturaService.getDatiCiclatura();
    // let dati = JSON.parse(data.eventi);
    let dati = data;
    return parseEventiServer(dati);
}

/**
 * Salva gli eventi del schedular sul server
 * @param {*} dati
 * @returns
 */
export async function save(eventi, workload) {
    let dati = {
        eventi: eventi
        // workload: workload
    };
    let result = await CiclaturaService.saveDatiCiclatura(dati);
    return result;
}
