import { myScheduler } from './my-lib.js';
import MyDate from 'date-and-time';
import { getGiorniDelMese } from './util.js';

import {
    LISTA_RISORSE,
    LISTA_RISORSE_FILTRATA,
    LISTA_CARICHI,
    SCALA_MENSILE
} from './costanti.js';

/** Filtra le risorse
 * Riceve il parametro dal componente filtro
 */
export function filtraRisorse(valore) {
    let risorse = myScheduler.serverList(LISTA_RISORSE);
    let itemsFiltrati;
    if (valore == 'all') {
        itemsFiltrati = risorse.slice();
    } else {
        itemsFiltrati = risorse.filter(function(room) {
            return room.label == valore;
        });
    }

    myScheduler.updateCollection(LISTA_RISORSE_FILTRATA, itemsFiltrati);
}

export function strToDate(strDate) {
    let data = MyDate.parse(strDate, 'DD/MM/YYYY');
    return data;
}

export function dateToStr(data) {
    let str = MyDate.format(data, 'DD/MM/YYYY');
    return str;
}

/**
 * Ricava id del carico in base al nome
 * @param {*} carico : nome del carico 19.1, 19.2 19.3
 * @returns valore numerico in base alla lista carichi
 */
export function ricavaIdCarico(carico) {
    for (let i = 0; i < LISTA_CARICHI.length; i++) {
        const item = LISTA_CARICHI[i];
        if (item.label == carico) {
            return item.key;
        }
    }
}
/**
 * Ricava il nome del carico in base al id
 * @param {*} carico : valore numerico in base alla lista carichi
 * @returns  nome del carico 19.1, 19.2 19.3
 */
export function ricavaNomeCaricoDaId(id) {
    for (let i = 0; i < LISTA_CARICHI.length; i++) {
        const item = LISTA_CARICHI[i];
        if (item.key == id) {
            return item.label;
        }
    }
}

/**
 * Restituisce la differenza in giorni tra le date indicate
 * @param {*} start : data inizio
 * @param {*} end : data fine
 */
export function calcolaDifferenzaDateInGiorni(start, end) {
    return Math.floor(MyDate.subtract(end, start).toDays());
}

export function getparametriScala() {
    return myScheduler.myConfig.paramScala;
}

export function getScalaAttiva() {
    return myScheduler.myConfig.paramScala.scala;
}

/**
 * Calcola il numero delle colonne da mostrare in timeline view
 * @param {*} start : data view schedular
 * @returns
 */
export function calcolaColonneView(date) {
    let giorniView = 14; //2 settimane
    // imposta le colonne del timeline, in base ai giorni del mese
    if (getScalaAttiva() == SCALA_MENSILE) {
        giorniView = getGiorniDelMese(date);
    }
    return giorniView;
}

export function showMessage(testo, tipo) {
    dhtmlx.message({
        type: tipo,
        text: testo
    });
}
