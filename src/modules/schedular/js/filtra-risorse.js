import { MyPlanner } from 'Moduli/schedular/js/my-planner.js';
// import { getListaRisorse } from '@/shared/liste/risorse-ciclatura.js';

/**
 * Filtra gli stalli di ciclatura compatibili con il tipo di carico indicato
 * @param {Number} idCarico : 1 = 19.1 ; 2= 19.2 ; 3 = 19.3
 */

export function filtraByCarico(idCarico) {
    //Se carico non valido mostro tutte le risors
    if (!idCarico) {
        filtraByNome();
        return;
    }
    /**
     * 19.1
     * L180 - 8,9
     * L232 - 6,7,8,9
     * L2020 - 1,2
     */
    const STALLI_19_1 = [3, 4, 5, 6, 7, 8, 9, 10];

    /**
     * 19.2
     * L180 - 6,7
     * L232 - 6,7,8,9
     */
    const STALLI_19_2 = [1, 2, 5, 6, 7, 8];

    /**
     * 19.3
     * L180 - 6,7
     * L232 - 6,7,8,9
     * L2020 - 3,4,5,6
     */
    const STALLI_19_3 = [1, 2, 5, 6, 7, 8, 11, 12, 13, 14];

    const ElencoListe = [STALLI_19_1, STALLI_19_2, STALLI_19_3];
    //In base al id del carico seleziono la lista id stalli.
    //tolgo 1 dal id per trasformarlo in indice della matrice
    let listaIds = ElencoListe[idCarico - 1];
    let itemsFiltrati;
    let risorse = MyPlanner.getListaRisorse();
    itemsFiltrati = risorse.filter(function(item) {
        return listaIds.includes(item.key);
    });

    MyPlanner.setListaFiltrata(itemsFiltrati);
}
/** Filtra le risorse
 * Riceve il parametro dal componente filtro
 */
export function filtraByNome(valore) {
    let risorse = MyPlanner.getListaRisorse();
    let itemsFiltrati;
    if (!valore || valore == 'all') {
        itemsFiltrati = risorse;
    } else {
        itemsFiltrati = risorse.filter(function(item) {
            return item.label.includes(valore);
        });
    }

    MyPlanner.setListaFiltrata(itemsFiltrati);
}

/**
 * Indica se mostrare oppure no il task in base ai criteri indicati
 * @param {*} task : task del schedular
 * @param {*} criterio : criteri per il confornto
 * @returns {Boolean} true mostrare, false nascondere il task
 */
export function filtraTask(task, criterio) {
    //estraggo i campi del task dove eseguire la ricerca
    let valori = [task.descrizione, task.progetto, task.text];
    let strValori = valori.join(';').toLowerCase();
    //console.log(task);
    // console.log(strValori, criterio);
    if (strValori.indexOf(criterio) !== -1) {
        return true;
    }
    return false;
}
