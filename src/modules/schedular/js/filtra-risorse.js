import { MyPlanner } from 'Moduli/schedular/js/my-planner.js';

function filtraRisorse(valore) {
    let risorse = MyPlanner.getListaRisorse();
    let itemsFiltrati;
    if (valore == 'all') {
        itemsFiltrati = risorse;
    } else {
        itemsFiltrati = risorse.filter(function(room) {
            return room.label.includes(valore);
        });
    }

    MyPlanner.setListaFiltrata(itemsFiltrati);    
}
