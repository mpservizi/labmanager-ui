import { pausa } from '@/shared/util.js';
import { loadDatiCiclatura } from 'Moduli/schedular/js/api.js';
// Caricare i dati del gantt dal server
async function getAll() {
    // let lista = {
    //     data: [
    //         {
    //             id: 1,
    //             text: 'Task #1',
    //             start_date: '2020-01-17',
    //             end_date: '2020-01-20',
    //             progress: 0.6
    //         },
    //         {
    //             id: 2,
    //             text: 'Task #2',
    //             start_date: '2020-01-21',
    //             end_date: '2020-01-25',
    //             progress: 0.4
    //         }
    //     ],
    //     links: [{ id: 1, source: 1, target: 2, type: '0' }]
    // };
    let dati = await loadDatiCiclatura();
    let result = {
        data: dati.map(item => {
            return {
                id: item.id,
                start_date: item.start_date,
                end_date: item.end_date,
                idRequest: item.idRequest,
                idRisorsa: item.idRisorsa,
                idCarico: item.idCarico,
                text: item.text + ' - ' + item.idCarico,
                // readonly: true,
                // editable: false,
                fromServer: true
            };
        }),
        links: []
    };
    // console.log(result);
    await pausa(10);
    return result;
}
export default {
    getAll
};
