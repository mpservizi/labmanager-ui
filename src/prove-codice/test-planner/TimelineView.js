import { NOME_LISTA_RISORSE, CAMPO_RISORSA, CAMPO_STATO } from './costanti.js';
export class TimelineView {
    constructor(myScheduler) {
        this.ms = myScheduler;
    }
    creaView() {
        creaTimelineView(this.ms);
    }
    onCellDblClick(callback) {
        let ms = this.ms;
        ms.attachEvent('onCellDblClick', function (x_ind, y_ind, x_val, y_val, e) {
            if (callback) {
                let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
                let risorsa = listaRisorse[y_ind];
                let obj = {
                    data_inzio: x_val,
                    risorsa: risorsa
                }
                callback(obj);
            }
        });
    }
}

function creaTimelineView(ms) {
    let listaRisorse = ms.serverList(NOME_LISTA_RISORSE);
    ms.createTimelineView({
        name: 'timeline',
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: 21,
        section_autoheight: false,
        y_unit: listaRisorse,
        y_property: CAMPO_RISORSA,
        render: 'bar',
        round_position: true,
        dy: 40,
        event_dy: 'full',
        second_scale: {
            x_unit: 'week',
            x_date: '%F, %Y'
        }
    });
}