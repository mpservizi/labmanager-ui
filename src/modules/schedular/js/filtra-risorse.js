import { MyPlanner } from 'Moduli/schedular/js/my-planner.js';

export function filtraByCarico(idCarico){
    console.log('Filtrare i carichi : ' + idCarico);

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