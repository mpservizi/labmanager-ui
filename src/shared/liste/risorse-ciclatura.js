/**
 * Dati per le macchine di ciclatura
 */

export function getListaRisorse() {
    //La lista delle risorse per la ciclatura
    const LISTA_RISORSE_CICLATURA = [
        { _id: 1, label: 'L180-6', id_macchina: 1, nome_macchina: 'L180', stallo: '6' },
        { _id: 2, label: 'L180-7', id_macchina: 1, nome_macchina: 'L180', stallo: '7' },
        { _id: 3, label: 'L180-8', id_macchina: 1, nome_macchina: 'L180', stallo: '8' },
        { _id: 4, label: 'L180-9', id_macchina: 1, nome_macchina: 'L180', stallo: '9' },
        { _id: 5, label: 'L232-6', id_macchina: 2, nome_macchina: 'L232', stallo: '6' },
        { _id: 6, label: 'L232-7', id_macchina: 2, nome_macchina: 'L232', stallo: '7' },
        { _id: 7, label: 'L232-8', id_macchina: 2, nome_macchina: 'L232', stallo: '8' },
        { _id: 8, label: 'L232-9', id_macchina: 2, nome_macchina: 'L232', stallo: '9' },
        { _id: 9, label: 'L2020-1', id_macchina: 3, nome_macchina: 'L2020', stallo: '1' },
        { _id: 10, label: 'L2020-2', id_macchina: 3, nome_macchina: 'L2020', stallo: '2' },
        { _id: 11, label: 'L2020-3', id_macchina: 3, nome_macchina: 'L2020', stallo: '3' },
        { _id: 12, label: 'L2020-4', id_macchina: 3, nome_macchina: 'L2020', stallo: '4' },
        { _id: 13, label: 'L2020-5', id_macchina: 3, nome_macchina: 'L2020', stallo: '5' },
        { _id: 14, label: 'L2020-6', id_macchina: 3, nome_macchina: 'L2020', stallo: '6' }
    ];
    return LISTA_RISORSE_CICLATURA;
}

export function getMacchinaDaIdRisorsa(idRisorsa) {
    let risorsa = getRisorsaById(idRisorsa);
    return risorsa.nome_macchina;
}

export function getRisorsaById(idRisorsa) {
    let lista = getListaRisorse();
    let result = lista.find(item => {
        return item._id == idRisorsa;
    });

    return result;
}

export function getTestoCaricoDaId(idCarico) {
    const LISTA_CARICHI = {
        1: '19.1',
        2: '19.2',
        3: '19.3'
    };
    let txt = LISTA_CARICHI[idCarico] || '';
    return txt;
}

export function getGruppiCiclatura() {
    //Indica come sono composti i vari gruppi di ciclatura
    const gruppiCiclatura = [
        { id: 1, label: 'L180-6+7', idsRisorse: [1, 2] },
        { id: 2, label: 'L180-8+9', idsRisorse: [3, 4] },
        { id: 3, label: 'L232-6+7', idsRisorse: [5, 6] },
        { id: 4, label: 'L232-8+9', idsRisorse: [7, 8] },
        { id: 5, label: 'L2020-1+2', idsRisorse: [9, 10] },
        { id: 6, label: 'L2020-3+4', idsRisorse: [11, 12] },
        { id: 7, label: 'L2020-5+6', idsRisorse: [13, 14] }
    ];
    return gruppiCiclatura;
}
