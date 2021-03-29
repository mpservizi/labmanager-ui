import { myScheduler } from 'Moduli/schedular/js/my-lib.js';
import { EventBus } from '@/shared/event-bus.js';
import { NOME_LISTA_RISORSE, CAMPO_RISORSA, CAMPO_STATO } from './costanti.js';
import { TimelineView } from './TimelineView.js';
import {
    save,
    loadRisorse,
    loadDatiCiclatura
} from 'Moduli/schedular/js/api.js';
const ms = myScheduler;
let timelineView;

class TestPlanner {
    constructor() {}
    async init(container) {
        myConfig();
        let listaSelezioneRisorse = await loadDatiRisorse();
        ms.serverList(NOME_LISTA_RISORSE, listaSelezioneRisorse);

        initTimelineView();
        ms.init(container, new Date(), 'timeline');

        let eventi = await loadEventi();
        ms.parse(eventi);
    }
    creaTaskProva(params) {
        let task = creaTask(params);
        ms.addEvent(task);
        return task;
    }
}
export const MyPlanner = new TestPlanner();

async function loadDatiRisorse() {
    try {
        let risorse = await loadRisorse();
        let listaSelezioneRisorse = risorse.map(item => {
            return { key: item.key, label: item.label + ' - ' + item.stallo };
        });
        return listaSelezioneRisorse;
    } catch (error) {
        console.log(error);
        alert('Errore caricamento dati');
        return false;
    }
}

async function loadEventi() {
    try {
        let eventi = await loadDatiCiclatura();
        return eventi;
    } catch (error) {
        console.log(error);
        alert('Errore caricamento dati');
        return false;
    }
}

function myConfig() {
    setConfig();
    setLabels();
    setLightbox();
}

function initTimelineView() {
    const listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    timelineView = new TimelineView(ms);
    timelineView.setListaRiosrse(listaRisorse);
    timelineView.setCampoRisorsa(CAMPO_RISORSA);
    timelineView.creaView();
    timelineView.onCellDblClick(function(task) {
        EventBus.emit('cell_click', task);
    });
    timelineView.evidenziaWeekends();
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

/**
 * Configura il lightbox
 */
function setLightbox() {
    const listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    let listaStati = [
        { key: 1, label: 'Pianificato' },
        { key: 2, label: 'In corso' },
        { key: 3, label: 'Finito' }
    ];
    ms.config.lightbox.sections = [
        {
            name: 'risorsa',
            height: 30,
            type: 'select',
            options: listaRisorse,
            map_to: CAMPO_RISORSA,
            focus: true
        },
        {
            name: 'stato',
            height: 30,
            type: 'select',
            options: listaStati,
            map_to: CAMPO_STATO
        }
    ];
}

/**
 * Imposta i parametri del schedular
 */
function setConfig() {
    ms.config.details_on_dblclick = true;

    //No creazione con drag e doppio click
    ms.config.dblclick_create = false;
    ms.config.drag_create = false;

    //Numero massimo di task in un slot
    ms.config.collision_limit = 4;
    ms.config.start_on_monday = true;
}

/**
 * Imposta tutte le labels
 */
function setLabels() {
    ms.locale.labels.timeline_tab = 'Timeline';
    ms.locale.labels.section_risorsa = 'Risorsa';
    ms.locale.labels.section_stato = 'Stato prova';
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
