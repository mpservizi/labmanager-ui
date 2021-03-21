import {getListaRisorse} from '@/shared/liste/risorse-ciclatura.js'
export class MyGruppi {
    constructor(myGantt) {
        this.gantt = myGantt;
        this.risorse = getListaRisorse();
    }
    groupByCarico() {
        let listaCarichi = [
            {key:'L180-C1',label:'L180 - 19.1'},
            {key:'L180-C2',label:'L180 - 19.2'},
            {key:'L180-C3',label:'L180 - 19.3'},

            {key:'L232-C1',label:'L232 - 19.1'},
            {key:'L232-C2',label:'L232 - 19.2'},
            {key:'L232-C3',label:'L232 - 19.3'},

            {key:'L2020-C1',label:'L2020 - 19.1'},
            {key:'L2020-C2',label:'L2020 - 19.2'},
            {key:'L2020-C3',label:'L2020 - 19.3'},
        ]
        creaGruppo(this.gantt,listaCarichi,'gr_macchina_carico')
    }
}

function rimuoviGruppi(myGantt) {
    myGantt.groupBy(false);
}
function creaGruppo(myGantt, listaValori, campoTask) {
    myGantt.groupBy({
        groups: listaValori,
        relation_property: campoTask,
        group_id: 'key',
        group_text: 'label'
    });

    // myGantt.render();
}