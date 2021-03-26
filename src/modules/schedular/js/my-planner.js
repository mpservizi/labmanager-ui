import { myScheduler } from './my-lib.js';

import { initLightbox } from './lightbox.js';
import { initEventi } from './ev-manager.js';
import { initPreConfig } from './config.js';
import { filtraRisorse } from './my-func.js';

import {
    creaParamteriCustom,
    centraViewOggi,
    setScalaSettimanale,
    setScalaMensile
} from './my-view.js';

import { save, loadRisorse, loadDatiCiclatura } from './api.js';
import { eventiToJson, workloadToJson } from './data-parser.js';

import {
    LISTA_RISORSE,
    SCALA_MENSILE,
    LISTA_SELEZIONE_RISORSE
} from './costanti.js';

function initPlanner(container, dataInizio, view) {
    // Inizalizzo le liste vuote per le risrose
    myScheduler.serverList(LISTA_SELEZIONE_RISORSE);
    myScheduler.serverList(LISTA_RISORSE);
    creaParamteriCustom(myScheduler);
    initPreConfig(myScheduler); //Configuration
    initLightbox(myScheduler); //Lightbox
    initEventi(myScheduler); //Eventi

    //Init schedular
    myScheduler.init(container, new Date(), 'timeline');
    centraViewOggi();
}

// Salva i dati sul server
async function saveDati() {
    try {
        let datiEv = myScheduler.getEvents();
        let eventi = eventiToJson(datiEv);
        let workload = workloadToJson(myScheduler, datiEv);
        let result = await save(eventi, workload);
        return result;
        return true;
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
            return { key: item.key, label: item.label + ' - ' + item.stallo };
        });
        myScheduler.updateCollection(LISTA_RISORSE, risorse);

        filtraRisorse();

        let eventi = await loadDatiCiclatura();
        myScheduler.parse(eventi);

        myScheduler.updateCollection(
            LISTA_SELEZIONE_RISORSE,
            listaSelezioneRisorse
        );
        return true;
    } catch (error) {
        console.log(error);
        alert('Errore caricamento dati');
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
export const MyPlanner = {
    init: initPlanner,
    filtraRisorse,
    loadDati,
    saveDati,
    cambiaScala
};
