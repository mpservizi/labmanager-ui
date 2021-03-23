const json = [
    {
        id: 1,
        id_macchina: 1,
        nome_macchina: 'L180',
        stallo: 6
    },
    {
        id: 2,
        id_macchina: 1,
        nome_macchina: 'L180',
        stallo: 7
    },
    {
        id: 3,
        id_macchina: 1,
        nome_macchina: 'L180',
        stallo: 8
    },
    {
        id: 4,
        id_macchina: 1,
        nome_macchina: 'L180',
        stallo: 9
    },
    {
        id: 5,
        id_macchina: 2,
        nome_macchina: 'L232',
        stallo: 6
    },
    {
        id: 6,
        id_macchina: 2,
        nome_macchina: 'L232',
        stallo: 7
    },
    {
        id: 7,
        id_macchina: 2,
        nome_macchina: 'L232',
        stallo: 8
    },
    {
        id: 8,
        id_macchina: 2,
        nome_macchina: 'L232',
        stallo: 9
    },
    {
        id: 9,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 1
    },
    {
        id: 10,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 2
    },
    {
        id: 11,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 3
    },
    {
        id: 12,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 4
    },
    {
        id: 13,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 5
    },
    {
        id: 14,
        id_macchina: 3,
        nome_macchina: 'L2020',
        stallo: 6
    }
];

const listaCarichi = {
    1: '19.1',
    2: '19.2',
    3: '19.3'
};

export function getListaRisorse() {
    // let str  = JSON.stringify(json);
    // return JSON.parse(str);
    return json;
}
export function getMacchinaDaIdRisorsa(idRisorsa) {
    let risorsa = getRisorsaById(idRisorsa);
    return risorsa.nome_macchina;
}

export function getRisorsaById(idRisorsa) {
    let lista = json;
    let result = lista.find(item => {
        return item.id == idRisorsa;
    });

    return result;
}

export function getTestoCaricoDaId(idCarico) {
    let txt = listaCarichi[idCarico] || '';
    return txt;
}
