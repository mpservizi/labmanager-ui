import { getGruppiCiclatura } from '@/shared/liste/risorse-ciclatura.js'
export const NOME_MODULO = 'GanttModule';

export const NOME_LISTA_CARICHI = 'carichi';
export const NOME_LISTA_RISORSE = 'risorse';

export const LISTA_CARICHI = [
    { key: 1, label: '19.1' },
    { key: 2, label: '19.2' },
    { key: 3, label: '19.3' }
];

export const LISTA_RISORSE =(function () {
    let lista = getGruppiCiclatura().map(item => {
        return {
            key: item.id,
            lable: item.label
        }
    }
    )
    return lista;
})();