import {getListaRisorse} from '@/shared/liste/risorse-ciclatura.js'
export class MyGruppi {
    constructor(myGantt) {
        this.gantt = myGantt;
        this.risorse = getListaRisorse();
    }
    groupByCarico() {
        console.log('Group by carico');
        let listaCarichi = [
            {key:'1',label:'19.1', idCarico:4},
            {key:'2',label:'19.2'},
            {key:'3',label:'19.3'},
            {key:'4',label:'L180'},
        ]
        creaGruppo(this.gantt,listaCarichi,'idCarico')
    }
    groupByRisorse() {
        console.log(this.risorse);     
        let macchine = this.risorse.map(item=>{
            return {key:item.id,label:item.nome_macchina + '-' + item.stallo}
        })   
        let listaRisorse = [
            {key:'L180',label:'Macchina L180', macchina:5},
            {key:'L232',label:'1Macchina L232',macchina:5},
            {key:'L2020',label:'Macchina L2020',macchina:6},
            {key:'5',label:'19.1'},
            {key:'6',label:'19.2'},
            {key:'7',label:'19.3'},
        ]
        creaGruppo(this.gantt,listaRisorse,'macchina')
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