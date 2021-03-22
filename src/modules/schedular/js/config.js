/**
 * Dati da configurare prima di chiamare init schedular
 */
import { EV_ID_RISORSA, LISTA_RISORSE_FILTRATA } from './costanti.js';
import { getparametriScala } from './my-func.js';

export function initPreConfig(myScheduler) {
    myScheduler.locale.labels.timeline_tab = 'Timeline';
    myScheduler.locale.labels.section_custom = 'Section';

    //Titolo colonne risorse
    var headerHTML =
        '<div class=\'timeline_item_cell\'>Id</div>' +
        '<div class=\'timeline_item_separator\'></div>' +
        '<div class=\'timeline_item_cell\'>Macchina</div>' +
        '<div class=\'timeline_item_separator\'></div>' +
        '<div class=\'timeline_item_cell\'>Stallo</div>';

    myScheduler.locale.labels.timeline_scale_header = headerHTML;

    //configurazioni globali
    myScheduler.config.drag_create = true; //diabilito creazioen eventi con mouse drag
    myScheduler.config.dblclick_create = true; //diabilito creazioen eventi con doppio click
    myScheduler.config.start_on_monday = true;
    // myScheduler.config.drag_resize = false;
    // myScheduler.config.details_on_create = true;
    // myScheduler.config.details_on_dblclick = true;

    //
    //Creazione views
    //
    let paramsScala = getparametriScala();
    myScheduler.createTimelineView({
        name: 'timeline',
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: paramsScala.giorniView,
        section_autoheight: false,
        y_unit: myScheduler.serverList(LISTA_RISORSE_FILTRATA),
        y_property: EV_ID_RISORSA,
        render: 'bar',
        round_position: true,
        dy: 40,
        event_dy: 'full', //altezza evento nella riga risorsa
        second_scale: {
            x_unit: paramsScala.scalaSecondaria,
            x_date: '%F, %Y'
        }
    });
    //
    //parametri
    //
    //Giorno iniziale di timeline
    myScheduler.date.timeline_start = paramsScala.getPrimoGiorno;
    /**
     * Aggiornameto view dopo il click del tasto avanti e indietro
     * @param {*} date
     * @param {*} step
     * @returns
     */
    myScheduler.date.add_timeline = function(date, step) {
        if (step > 0) {
            step = 1;
        } else if (step < 0) {
            step = -1;
        }
        let params = getparametriScala();
        return myScheduler.date.add(date, step, params.unitIncremento);
    };

    /** Evidenzia i giorni del calendario */
    myScheduler.addMarkedTimespan({
        days: [0, 6],
        zones: 'fullday',
        css: 'timeline_weekend'
    });
}
