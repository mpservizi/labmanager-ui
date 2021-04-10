import { myScheduler } from './my-lib.js';

import { initLightbox } from './lightbox.js';
import { initEventi } from './ev-manager.js';
import { initPreConfig } from './config.js';

import {
    creaParamteriCustom,
    centraViewOggi,
    setScalaSettimanale,
    setScalaMensile
} from './my-view.js';

import { save, loadRisorse, loadDatiCiclatura } from './api.js';
import { eventiToJson } from './data-parser.js';
import {filtraByCarico,filtraByNome} from './filtra-risorse';

import {
    LISTA_RISORSE,
    LISTA_RISORSE_FILTRATA,
    SCALA_MENSILE,
    SCALA_SETTIMANALE,
    LISTA_SELEZIONE_RISORSE
} from './costanti.js';

function initPlanner(container, dataInizio, view) {
    //Il componente viene ricilato. Inizializzo solo se non esiste in memoria
    if (!myScheduler.myConfig) {
        // Inizalizzo le liste vuote per le risrose
        myScheduler.serverList(LISTA_SELEZIONE_RISORSE);
        myScheduler.serverList(LISTA_RISORSE);
        //Imposto oggetto myConfig sul schedular
        creaParamteriCustom(myScheduler);
        initPreConfig(myScheduler); //Configuration
        initLightbox(myScheduler); //Lightbox
        initEventi(myScheduler); //Eventi
        myScheduler.xy.scale_height = 30; //Altezza riga scala
    }
    //Init schedular
    myScheduler.init(container, new Date(), 'timeline');
    centraViewOggi();
}

// Salva i dati sul server
async function saveDati() {
    try {
        let datiEv = myScheduler.getEvents();
        let eventi = eventiToJson(datiEv);
        // let workload = workloadToJson(myScheduler, datiEv);
        // let result = await save(eventi, workload);
        //Adesso workload è calcolato in base ai eventi direttamente dal gantt
        let result = await save(eventi);
        return result;
    } catch (error) {
        console.log(error);
        alert('Errore salvataggio dati');
        return null;
    }
}

// carica i dati dal server
async function loadDati() {
    try {
        let risorse = await loadRisorse();
        let listaSelezioneRisorse = risorse.map(item => {
            return { key: item.key, label: item.label };
        });
        myScheduler.updateCollection(LISTA_RISORSE, risorse);

        filtraByNome();

        let eventi = await loadDatiCiclatura();
        //Cancello tutti gli eventi esistenti prima di caricare nuovi dati
        myScheduler.clearAll();
        myScheduler.parse(eventi);

        myScheduler.updateCollection(
            LISTA_SELEZIONE_RISORSE,
            listaSelezioneRisorse
        );
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function cambiaScala(valore) {
    if (valore == SCALA_MENSILE) {
        setScalaMensile();
    } else {
        setScalaSettimanale();
    }
}
function getScalaAttiva() {
    //Se non è ancora inizializzato l'oggetto custom
    if (!myScheduler.myConfig) return SCALA_SETTIMANALE;
    return myScheduler.myConfig.paramScala.scala;
}

function getListaRisorse(){
    let risorse = myScheduler.serverList(LISTA_RISORSE);
    let copia = risorse.slice();
    return copia;
}

function setListaFiltrata(itemsFiltrati){
    myScheduler.updateCollection(LISTA_RISORSE_FILTRATA, itemsFiltrati);
}
function addTask(task){
    myScheduler.addEvent(task);
}

export const MyPlanner = {
    init: initPlanner,
    filtraRisorse:filtraByNome,
    loadDati,
    saveDati,
    cambiaScala,
    getScalaAttiva,
    getListaRisorse,
    setListaFiltrata,
    addTask,
    filtraByCarico,
    //Calcoli sulle date
    date:myScheduler.date
};
