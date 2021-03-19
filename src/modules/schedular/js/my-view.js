import { myScheduler } from './my-lib.js';
import { VIEW_TIMELINE, SCALA_MENSILE, SCALA_SETTIMANALE } from './costanti.js';
import {
  getparametriScala,
  calcolaColonneView,
  getScalaAttiva
} from './my-func.js';

import { getGiorniDelMese } from './util.js';

/**
 * Imposta la scala mensile per timeline view
 */
export function setScalaMensile() {
  myScheduler.myConfig.paramScala.scala = SCALA_MENSILE;
  myScheduler.myConfig.paramScala.scalaSecondaria = 'month';
  myScheduler.myConfig.paramScala.unitIncremento = 'month';
  aggiornaScala();
}

/**
 * Imposta la scala settimanale per timeline view
 */
export function setScalaSettimanale() {
  myScheduler.myConfig.paramScala.scala = SCALA_SETTIMANALE;
  myScheduler.myConfig.paramScala.scalaSecondaria = 'week';
  myScheduler.myConfig.paramScala.unitIncremento = 'day';
  aggiornaScala();
}

/**
 * Aggiorna la scala del timeline in base ai parametri grobali
 */
function aggiornaScala() {
  let params = getparametriScala();
  let view = myScheduler.getView(VIEW_TIMELINE);
  //I giorni da mostrare sono modifcati dal evento onBeforeViewChange con metodo calcolaColonneView
  // view.x_size = params.giorniView;
  view.second_scale.x_unit = params.scalaSecondaria;
  myScheduler.setCurrentView();
}

/**
 * Impostare qui i parametri custom da gestire ne codice
 */
export function creaParamteriCustom(ObjSchedular) {
  ObjSchedular.myConfig = {
    //Tutte le info riguardo al cambio scala
    paramScala: {
      scala: SCALA_SETTIMANALE, // id scala attiva
      giorniView: 14, //numero dei giorni da mostrare in view, di default
      scalaSecondaria: 'week', //Scala secondaria timeline
      unitIncremento: 'day', //di quale unità spostare con tasti navigazione

      // calcola il primo giorno da mostrare in view
      getPrimoGiorno: aggiornaViewAttiva
    }
  };
}

/**
 * Aggiorna la view del schedular dopo un cambiamento
 * Imposto il numero delle colonne da mostrare in base alla scala
 * @param {*} data : data passata dal evento schedular: myScheduler.date.timeline_start. primo giorno del view
 * @returns
 */
function aggiornaViewAttiva(data) {
  //Di default lascio la data calcolata in automatico
  let result = data;
  //in caso di scala mensile, imposto il primo giorno del mese come prima colonna
  let params = getparametriScala();
  if (params.scala == SCALA_MENSILE) {
    result = myScheduler.date.month_start(data);
  }

  //Imposto il numero delle colonne da mostrare in base alla scala attiva
  let timeline = myScheduler.getView(VIEW_TIMELINE);
  timeline.x_size = calcolaColonneView(data);
  return result;
}

/**
 * Centra la visuale del timeline introno alla data corrente
 * @returns
 */
export function centraViewOggi() {
  let oggi = new Date();
  let inizio, fine;
  //Con scala mensile Imposto in range tra primo e ultimo giorno
  if (getScalaAttiva() == SCALA_MENSILE) {
    inizio = myScheduler.date.month_start(oggi);
    let giorniMese = getGiorniDelMese(oggi);
    fine = myScheduler.date.add(inizio, giorniMese, 'day');
  } else {
    //scala settimanale range tra -1 e +1 settinama rispetto alla data odierna
    inizio = myScheduler.date.add(oggi, -1, 'week');
    fine = myScheduler.date.add(oggi, 1, 'week');
  }
  let view = myScheduler.getView(VIEW_TIMELINE);
  view.setRange(inizio, fine);
}
