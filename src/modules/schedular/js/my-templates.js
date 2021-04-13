import { myScheduler } from './my-lib.js';
import { ricavaNomeCaricoDaId } from './my-func.js';
/**
 * Crea il template per evento quando è mostrato nella pagina
 * @param {*} start
 * @param {*} end
 * @param {*} event
 * @returns
 */
export function creaTestoBarraEvento(start, end, event) {
    // let testo = '';
    // let carico =
    //     event.idCarico != undefined ? ricavaNomeCaricoDaId(event.idCarico) : '';
    // let corrente = event.corrente + 'A';
    // testo = `<div class='txt_ev'>${carico} <br> ${corrente}</div>`;
    // return testo;
    return event.text;
}

//Formatta data testo evento
let formattaData = myScheduler.date.date_to_str('%d %M %Y');

/**
 * Imposta i valori delle colonne per le risorse
 * @param {*} key : id risorsa
 * @param {*} label : nome risorsa
 * @param {*} risorsa : oggetto con tutti i valori della risorsa
 * @returns
 */
export function creaTemplateColonneRisorse(key, label, risorsa) {
    // let stallo = risorsa.stallo;
    return [
        // '<div class=\'timeline_item_cell\'>' + key + '</div>',
        // '<div class=\'timeline_item_separator\'></div>',
        "<div class='timeline_item_cell'>" + label + '</div>'
        // '<div class=\'timeline_item_separator\'></div>',
        // '<div class=\'timeline_item_cell\'>' + stallo + '</div>'
    ].join('');
}

/**
 * Crea il tepmplate per grafica tooltip
 * @param {*} start
 * @param {*} end
 * @param {*} event
 * @returns
 */
export function creaTempateTooltip(start, end, event) {
    // var room = getRoom(event.room) || { label: '' };
    let html = [];
    html.push('<b>' + event.progetto + '</b>');
    // html.push('Room: <b>' + room.label + '</b>');
    html.push('' + event.descrizione + '');
    // html.push(
    //   getBookingStatus(event.status) + ', ' + getPaidStatus(event.is_paid)
    // );
    return html.join('<br>');
}

/**
 * Crea la classe css per evento
 * @param {*} start
 * @param {*} end
 * @param {*} event
 * @returns
 */
export function creaTemplateClasseEvento(start, end, event) {
    return 'carico_' + (event.idCarico || '');
}
