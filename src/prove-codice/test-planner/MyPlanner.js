import {myScheduler} from 'Moduli/schedular/js/my-lib.js'
const NOME_LISTA_RISORSE = 'risorse';
const CAMPO_RISORSA = 'idRisorsa';
const CAMPO_STATO = 'stato';
class TestPlanner{
    constructor(){
        this.lib = myScheduler;
    }
    init(container){
        myConfig(this.lib);
        this.lib.init(container,new Date(),'timeline');
    }
}

function myConfig(ms){
    setConfig(ms);    
    const listaRisorse=creaListaRisorse();
    ms.serverList(NOME_LISTA_RISORSE,listaRisorse);
    creaView(ms);
    setLightbox(ms, listaRisorse);
    handleEventi(ms, listaRisorse);
}

export const MyPlanner = new TestPlanner();

function handleEventi(ms) {
    let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    ms.attachEvent('onCellDblClick', function (x_ind, y_ind, x_val, y_val, e) {
        // console.log(x_ind, y_ind, x_val, y_val);
        // console.log(y_ind);
        let task = creaTask(ms,y_ind, x_val);
        ms.addEvent(task);
    });
}

function creaTask(ms,indexRisorsa, data_inizio) {
    let durata = 2;
    let dataFine = ms.date.add(data_inizio, durata, 'day');
    let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    let risorsa = listaRisorse[indexRisorsa];
    let task = {
        start_date: data_inizio,
        [CAMPO_RISORSA]: risorsa.key,
        end_date: dataFine,
        [CAMPO_STATO]:1,
        text: 'From code'
    };
    return task;
}


function setLightbox(ms, listaRisorse) {
    let listaStati = [
        {key:1,label:'Pianificato'},
        {key:2,label:'In corso'},
        {key:3,label:'Finito'},
    ];
    ms.config.lightbox.sections = [
        { name: 'risorsa', height: 30, type: 'select', options: listaRisorse, map_to: CAMPO_RISORSA,focus: true },
        { name: 'stato', height: 30, type: 'select', options: listaStati, map_to: CAMPO_STATO }
    ];
}

function creaView(ms) {
    let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    ms.createTimelineView({
        name: 'timeline',
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: 21,
        section_autoheight: false,
        y_unit: listaRisorse,
        y_property: CAMPO_RISORSA,
        render: 'bar',
        round_position: true,
        dy: 40,
        event_dy: 'full',
        second_scale: {
            x_unit: 'week',
            x_date: '%F, %Y'
        }
    });
}

function creaListaRisorse() {
    return [
        { key: 1, label: 'To Plan' },
        { key: 2, label: 'L180-6+7' },
        { key: 3, label: 'L180-8+9' },
        { key: 4, label: 'L232-6+7' },
        { key: 5, label: 'L232-8+9' },
        { key: 6, label: 'L2020-1+2' },
        { key: 7, label: 'L2020-3+4' },
        { key: 8, label: 'L2020-5+6' }
    ];
}

function setConfig(ms) {
    setLabels(ms);
    ms.config.details_on_dblclick = true;

    //No creazione con drag e doppio click
    ms.config.dblclick_create = false;
    ms.config.drag_create = false;

    //Numero massimo di task in un slot
    ms.config.collision_limit = 4;
}

function setLabels(ms) {
    ms.locale.labels.timeline_tab = 'Timeline';
    ms.locale.labels.section_risorsa = 'Risorsa';
    ms.locale.labels.section_stato = 'Stato prova';
}

