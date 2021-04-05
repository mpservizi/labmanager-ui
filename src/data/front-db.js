const STATI_RICHIESTE = [
    {id:1,label:'To plan'},
    {id:2,label:'Planned'},
    {id:3,label:'In progress'},
    {id:4,label:'Done'},
];

export function getStatoById(idStato){
    const index = STATI_RICHIESTE.map(item => item.id).indexOf(idStato);
    return STATI_RICHIESTE[index].label;
}