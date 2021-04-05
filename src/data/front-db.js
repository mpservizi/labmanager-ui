export const ENUM_STATI_RICHIESTE = {
    TO_PLAN: 1,
    PLANNED: 2,
    IN_PROGRESS: 3,
    DONE: 4,
}

export function getStatoById(idStato) {
    const STATI_RICHIESTE = [
        { id: 1, label: 'To plan' },
        { id: 2, label: 'Planned' },
        { id: 3, label: 'In progress' },
        { id: 4, label: 'Done' },
    ];
    const index = STATI_RICHIESTE.map(item => item.id).indexOf(idStato);
    return STATI_RICHIESTE[index].label;
}