import { myScheduler } from "./my-lib.js";

import { initLightbox } from "./lightbox.js";
import { initEventi } from "./ev-manager.js";
import { initPreConfig } from "./config.js";
import { filtraRisorse } from "./my-func.js";

import {
  creaParamteriCustom,
  centraViewOggi,
  setScalaSettimanale,
  setScalaMensile
} from "./my-view.js";

import { save, loadRisorse, loadDatiCiclatura } from "./api.js";
import { eventiToJson } from "./data-parser.js";

import { LISTA_RISORSE, SCALA_MENSILE } from "./costanti.js";

function initPlanner(container, dataInizio, view) {
  creaParamteriCustom(myScheduler);
  initPreConfig(myScheduler); //Configuration
  initLightbox(myScheduler); //Lightbox
  initEventi(myScheduler); //Eventi

  //Init schedular
  myScheduler.init(container, new Date(), "timeline");
  centraViewOggi();
}

// Salva i dati sul server
async function saveDati() {
  try {
    let json = eventiToJson(myScheduler._get_serializable_data());
    let result = await save(json);
    return result;
  } catch (error) {
    console.log(error);
    console.log("Errore salvataggio dati");
    return null;
  }
}

// carica i dati dal server
async function loadDati() {
  try {
    let risorse = await loadRisorse();
    myScheduler.serverList(LISTA_RISORSE, risorse);
    filtraRisorse();

    let eventi = await loadDatiCiclatura();
    myScheduler.parse(eventi);
    return true;
  } catch (error) {
    console.log(error);
    console.log("Errore caricamento dati");
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
