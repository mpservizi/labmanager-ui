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
    myScheduler.attachEvent('onParse', function () {
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
    myScheduler.attachEvent('onTemplatesReady', function () {
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
        myScheduler.templates.lightbox_header = function (start, end, ev) {
            // var formatFunc = myScheduler.date.date_to_str('%d.%m.%Y');
            // return formatFunc(start) + ' - ' + formatFunc(end);
            return 'Detail prova';
        };
    });

    /** Doppio click sul evento */
    myScheduler.attachEvent('onDblClick', function (id, e) {
        return true;
    });


    /** Quando cambia Evento con drag, eseguo arrotondamento della data */
    myScheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
        //Se la data viene cambiata in onDragEnd non funziona più il doppio click sul evento
        arrotondaEvento(ev);
        return true;
    });


    // myScheduler.attachEvent('onDragEnd', function (id, mode, e) {
    // });

    /**
     * Al click sul tasto Today
     */
    myScheduler.attachEvent('onBeforeTodayDisplayed', function () {
        centraViewOggi();
        return false; //diabilito comportamento di default
    });

    /** Prima di aprire lightbox */
    myScheduler.attachEvent("onBeforeLightbox", function (id){
        //any custom logic here
        let ev = myScheduler.getEvent(id);
        let durata = MyDate.calcolaDifferenzaDateInGiorni(
            ev.start_date,
            ev.end_date
        );
        //Memorizzo la dura nel evento
        ev.durata = durata;
        return true;
    });

    /** Al clik su taso save in lightbox */
    myScheduler.attachEvent('onEventSave', function (id, ev, is_new) {
        //Ricavo evento orginale. ev contiene i valori inseriti nel lightbox
        let myEv= myScheduler.getEvent(id);
        //resetto l'orario della data inizio
        let sd = myScheduler.date.date_part(ev.start_date);
        //Calcolo la data di fine in base alla durata
        let ed = myScheduler.date.add(sd, myEv.durata, 'day');
        //Imposto la date calcolate
        ev.start_date = sd;
        ev.end_date = ed;
        return true; // Con true prosegue le azioni di default
    });

    myScheduler.attachEvent('onCellDblClick', function (
        x_ind,
        y_ind,
        x_val,
        y_val,
        e
    ) {
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

    /**
 * Arrotonda la data del evento mantenendo la stessa durata
 * @param {*} event_obj : evento da modifiare
 */
    function arrotondaEvento(event_obj) {
        //Calcolo la durata in giorni del task
        let durata = MyDate.calcolaDifferenzaDateInGiorni(
            event_obj.start_date,
            event_obj.end_date
        );
        if(durata<1) durata=1;

        let ore = event_obj.start_date.getHours();
        let sd = event_obj.start_date;
        //Verifico se arrotondare la data d'inizo al giorno successivo
        if(ore>12){
            sd = myScheduler.date.add( event_obj.start_date, 1, 'day')
        }
        //Cre o la data di inizio con l'orario a 0:00
        sd = myScheduler.date.date_part(sd);
        //Calcola la data di fine sommando la durata
        let ed = myScheduler.date.add(sd, durata, 'day');
        //Aggiorna la data sul evento
        event_obj.start_date = sd;
        event_obj.end_date = ed;
    }

}

function handleEventCollsion(ev, evs) {
    for (var i = 0; i < evs.length; i++) {
        if (ev.idRisorsa != evs[i].idRisorsa) continue;
        showMessage('Stallo già occupato', 'error');
    }
    return true;
}
