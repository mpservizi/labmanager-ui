export const ENUM_STATI_RICHIESTE = {
    TO_PLAN: 1,
    PLANNED: 2,
    IN_PROGRESS: 3,
    DONE: 4
};
export const LISTA_LABEL_PRIO = ['High', 'Medium', 'Low'];
export const LISTA_ID_PRIO = [1, 2, 3];
export const LISTA_LABEL_STATI = ['To plan', 'Planned', 'In progress', 'Done','Cancelled'];
export const LISTA_ID_STATI = [1, 2, 3, 4,5];

export function getStatoById(idStato) {
    const index = LISTA_ID_STATI.indexOf(idStato);
    return LISTA_LABEL_STATI[index];
}
export function getPrioById(idPrio) {
    const index = LISTA_ID_PRIO.indexOf(idPrio);
    return LISTA_LABEL_PRIO[index];
}

export function getStatoIdByLabel(label) {
    const index = LISTA_LABEL_STATI.indexOf(label);
    return LISTA_ID_STATI[index];
}
export function getPrioIdBylabel(label) {
    const index = LISTA_LABEL_PRIO.indexOf(label);
    return LISTA_ID_PRIO[index];
}
