import { myScheduler } from 'Moduli/schedular/js/my-lib.js';
import { EventBus } from '@/shared/event-bus.js';

const NOME_LISTA_RISORSE = 'risorse';
const CAMPO_RISORSA = 'idRisorsa';
const CAMPO_STATO = 'stato';

const ms = myScheduler;
class TestPlanner {
    constructor() {
    }
    init(container) {
        myConfig();
        ms.init(container, new Date(), 'timeline');
    }
    creaTaskProva(params) {
        let task = creaTask(params);
        ms.addEvent(task);
        return task;
    }
}
export const MyPlanner = new TestPlanner();

function myConfig() {
    setConfig(ms);
    const listaRisorse = creaListaRisorse();
    ms.serverList(NOME_LISTA_RISORSE, listaRisorse);
    creaView();
    setLightbox(listaRisorse);
    handleEventi(listaRisorse);
}

function handleEventi() {
    ms.attachEvent('onCellDblClick', function (x_ind, y_ind, x_val, y_val, e) {
        let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
        let risorsa = listaRisorse[y_ind];
        let obj = {
            data_inzio: x_val,
            risorsa: risorsa
        }
        EventBus.emit('cell_click', obj);
    });
}

function creaTask(payload) {
    let data_inizio = payload.data_inzio;
    let durata = payload.durata;
    let idRisorsa = payload.risorsa.key;
    let testo = payload.label;
    let dataFine = calcolaDataFine(data_inizio, durata);

    let task = {
        start_date: data_inizio,
        end_date: dataFine,
        [CAMPO_RISORSA]: idRisorsa,
        [CAMPO_STATO]: 1,
        text: testo
    };
    return task;
}

function calcolaDataFine(data_inizio, durata) {
    let dataFine = ms.date.add(data_inizio, durata, 'day');
    return dataFine;
}

function setLightbox(listaRisorse) {
    let listaStati = [
        { key: 1, label: 'Pianificato' },
        { key: 2, label: 'In corso' },
        { key: 3, label: 'Finito' },
    ];
    ms.config.lightbox.sections = [
        { name: 'risorsa', height: 30, type: 'select', options: listaRisorse, map_to: CAMPO_RISORSA, focus: true },
        { name: 'stato', height: 30, type: 'select', options: listaStati, map_to: CAMPO_STATO }
    ];
}

function creaView() {
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
        { key: 2, label: 'L180-6' },
        { key: 3, label: 'L180-7' },
        { key: 4, label: 'L180-8' },
        { key: 5, label: 'L180-9' },

        { key: 6, label: 'L232-6' },
        { key: 7, label: 'L232-7' },
        { key: 8, label: 'L232-8' },
        { key: 9, label: 'L232-9' },

        { key: 10, label: 'L2020-1' },
        { key: 11, label: 'L2020-2' },
        { key: 12, label: 'L2020-3' },
        { key: 13, label: 'L2020-4' },
        { key: 14, label: 'L2020-5' },
        { key: 15, label: 'L2020-6' }
    ];
}

function setConfig() {
    setLabels();
    ms.config.details_on_dblclick = true;

    //No creazione con drag e doppio click
    ms.config.dblclick_create = false;
    ms.config.drag_create = false;

    //Numero massimo di task in un slot
    ms.config.collision_limit = 4;
}

function setLabels() {
    ms.locale.labels.timeline_tab = 'Timeline';
    ms.locale.labels.section_risorsa = 'Risorsa';
    ms.locale.labels.section_stato = 'Stato prova';
}

