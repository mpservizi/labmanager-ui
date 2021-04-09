import { EventBus } from '@/shared/event-bus.js';
import {
    creaTestoBarraEvento,
    creaTemplateColonneRisorse,
    creaTempateTooltip,
    creaTemplateClasseEvento
} from './my-templates.js';

import { filtraRisorse, showMessage } from './my-func.js';
import { centraViewOggi } from './my-view.js';
import { LISTA_RISORSE, LISTA_RISORSE_FILTRATA } from './costanti.js';
import MyDate from '@/shared/my-date.js';
export function initEventi(myScheduler) {
    /** Default values per new event */
    myScheduler.attachEvent('onEventCreated', handleNewEvento);

    /** Dopo il parsing dei dati */
    myScheduler.attachEvent('onParse', function() {
        filtraRisorse('all');
    });

    /** Prima di cambiare view*/
    // myScheduler.attachEvent('onBeforeViewChange', function(
    //     old_mode,
    //     old_date,
    //     mode,
    //     date
    // ) {
    //     return true;
    // });

    /** Collisione eventi */
    myScheduler.attachEvent('onEventCollision', handleEventCollsion);

    //** Quando i templates sono pronti. Definire qui i custom templates */
    myScheduler.attachEvent('onTemplatesReady', function() {
        //
        //Templates
        //
        myScheduler.templates.timeline_scale_label = creaTemplateColonneRisorse;

        /** Classe css per evento */
        myScheduler.templates.event_class = creaTemplateClasseEvento;
        /** Testo del evento in bar mode*/
        myScheduler.templates.event_bar_text = creaTestoBarraEvento;

        /** testo tooltip */
        myScheduler.templates.tooltip_text = creaTempateTooltip;

        // myScheduler.templates.timeline_scalex_class = function(date){
        //     return 'S1';
        // };
        // myScheduler.templates.timeline_second_scalex_class  = function(date){
        //     return 'S2';
        // };
        /** Titolo finestra lightbox */
        myScheduler.templates.lightbox_header = function(start, end, ev) {
            // var formatFunc = myScheduler.date.date_to_str('%d.%m.%Y');
            // return formatFunc(start) + ' - ' + formatFunc(end);
            return 'Detail prova';
        };
    });

    /** Fine drag task, eseguo arrotondamento della data */
    myScheduler.attachEvent('onDragEnd', function(id, mode, e) {
        let event_obj = scheduler.getEvent(id);

        //Calcolo la durata in giorni del task
        let durata = MyDate.calcolaDifferenzaDateInGiorni(
            event_obj.start_date,
            event_obj.end_date
        );
        //Cre o la data di inizio con l'orario a 0:00
        let sd = myScheduler.date.copy(
            myScheduler.date.date_part(event_obj.start_date)
        );
        //Calcola la data di fine sommando la durata
        let ed = myScheduler.date.add(sd, durata, 'day');
        event_obj.start_date = sd;
        event_obj.end_date = ed;
        event_obj.time = {
            start_date: sd,
            end_date: ed
        };
        //Aggiorno evento
        myScheduler.updateEvent(id);
    });

    myScheduler.attachEvent('onDblClick', function(id, e) {
        console.log('dbl click');
        //any custom logic here
        return true;
    });

    /**
     * Al click sul tasto Today
     */
    myScheduler.attachEvent('onBeforeTodayDisplayed', function() {
        centraViewOggi();
        return false; //diabilito comportamento di default
    });

    /** Al clik su taso save in lightbox */
    myScheduler.attachEvent('onEventSave', function(id, ev, is_new) {
        //impoposto l'orario per la data di inizio e fine
        ev.start_date.setHours(2);
        ev.end_date.setHours(23);
        // console.log(ev);
        return true; // Con true prosegue le azioni di default
    });

    myScheduler.attachEvent('onCellDblClick', function(
        x_ind,
        y_ind,
        x_val,
        y_val,
        e
    ) {
        console.log('Col: ' + x_ind);
        // console.log('Data: ' + x_val);
        // let listaRisorse = myScheduler.serverList(LISTA_RISORSE);
        let listaRisorse = myScheduler.serverList(LISTA_RISORSE_FILTRATA);
        let risorsa = listaRisorse[y_ind];
        let obj = {
            data_inzio: x_val,
            risorsa: risorsa
        };
        EventBus.emit('cell_click', obj);
    });

    /**
     * Gestore per evento onEventCreated
     * @param {*} event_id
     */
    function handleNewEvento(event_id) {
        console.log('New event');
        //  Imposto i valori di default per nuovo evento
        let ev = myScheduler.getEvent(event_id);
        // console.log(ev);
        ev.text = 'New test';
    }
}

function handleEventCollsion(ev, evs) {
    for (var i = 0; i < evs.length; i++) {
        if (ev.idRisorsa != evs[i].idRisorsa) continue;
        showMessage('Stallo già occupato', 'error');
    }
    return true;
}
