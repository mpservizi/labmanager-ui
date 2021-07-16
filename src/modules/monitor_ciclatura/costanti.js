export const NOME_MODULO = 'MonitorCiclatura';

export const UPDATE_UI_SECONDS = 30; //Ogni quanti secondi aggiornare ui
export const DURATA_CACHE_SECONDS = 50; //Dopo quanti secondi aggiornare la cache
//  Elenco dei possibili stati per gli stalli
export const LISTA_STATI = [
    'Avaliable', //0
    'Ready', //1
    'In progress', //2
    'Error', //3
    'Safety block', //4
    'End ok', //5
    'Waiting', //6
    'Manual stop' //7
];
export const LISTA_ID_STATI = [0, 1, 2, 3, 4, 5, 6, 7];

export function getLabelStatoById(id) {
    let pos = LISTA_ID_STATI.indexOf(id);
    return LISTA_STATI[pos];
}
export function getIdStatoByLabel(label) {
    let pos = LISTA_STATI.indexOf(label);
    return LISTA_ID_STATI[pos];
}

export const ENUM_STATI_STALLI = {
    IN_PROGRESS: LISTA_STATI[2],
    WAITING: LISTA_STATI[6],
    END_OK: LISTA_STATI[5],
    MANUAL_STOP: LISTA_STATI[7],
    SAFETY_BLOCK: LISTA_STATI[4],
    ERROR: LISTA_STATI[3],
    READY: LISTA_STATI[1]
};
export const TIPI_PRODOTTO = {
    SWITCH: 'Switch',
    SOCKET: 'Socket'
};
