const TIMELINE_VIEW = 'timeline'; //Nome del view

export class TimelineView {
    constructor(myScheduler) {
        this.ms = myScheduler;
        this.navigationUnit = 'week';
        this.listaRisorse = [];
        this.campoRisorsa = '';
        addNavigationHadler(this);
    }
    creaView() {
        creaTimelineView(this);
    }

    getView() {
        return this.ms.getView(TIMELINE_VIEW);
    }

    setNavigationUnit(unit) {
        this.navigationUnit = unit;
    }
    setListaRiosrse(listaRisorse) {
        this.listaRisorse = listaRisorse;
    }
    setCampoRisorsa(campoRisorsa) {
        this.campoRisorsa = campoRisorsa;
    }

    evidenziaWeekends() {
        evidenziaWeekends(this.ms);
    }

    onCellDblClick(callback) {
        let ms = this.ms;
        let listaRisorse = this.listaRisorse;
        ms.attachEvent('onCellDblClick', function(
            x_ind,
            y_ind,
            x_val,
            y_val,
            e
        ) {
            if (callback) {
                let risorsa = listaRisorse[y_ind];
                let obj = {
                    data_inzio: x_val,
                    risorsa: risorsa
                };
                callback(obj);
            }
        });
    }
}

/**
 * Gestisce la navigazione con tasti avanti e indietro
 * @param {TimelineView} cls : istanza classe TimelineView
 */
function addNavigationHadler(cls) {
    cls.navigationHadler = function(date, step) {
        if (step > 0) {
            step = 1;
        } else if (step < 0) {
            step = -1;
        }
        return cls.ms.date.add(date, step, cls.navigationUnit);
    };
}

function creaTimelineView(cls) {
    let ms = cls.ms;
    let listaRisorse = cls.listaRisorse;
    let campoRiorsa = cls.campoRisorsa;

    ms.createTimelineView({
        name: TIMELINE_VIEW,
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: 2 * 7,
        section_autoheight: false,
        y_unit: listaRisorse,
        y_property: campoRiorsa,
        render: 'bar',
        round_position: true,
        dy: 30,
        event_dy: 'full',
        second_scale: {
            x_unit: 'week',
            x_date: '%F, %Y'
        }
    });

    //Primo giorno di timeline view
    ms.date[TIMELINE_VIEW + '_start'] = ms.date.week_start;
    //Handel click tasto avanti e indietro
    ms.date['add_' + TIMELINE_VIEW] = cls.navigationHadler;
}

/** Evidenzia i giorni del calendario */
function evidenziaWeekends(ms) {
    ms.addMarkedTimespan({
        days: [0, 6],
        zones: 'fullday',
        css: 'timeline_weekend'
    });
}
