import {
  creaTestoBarraEvento,
  creaTemplateColonneRisorse,
  creaTempateTooltip,
  creaTemplateClasseEvento
} from './my-templates.js';

import { filtraRisorse, showMessage } from './my-func.js';
import { centraViewOggi } from './my-view.js';

export function initEventi(myScheduler) {
  /** Default values per new event */
  myScheduler.attachEvent('onEventCreated', handleNewEvento);

  /** Dopo il parsing dei dati */
  myScheduler.attachEvent('onParse', function() {
    filtraRisorse('all');
  });

  /** Prima di cambiare view*/
  myScheduler.attachEvent('onBeforeViewChange', function(
    old_mode,
    old_date,
    mode,
    date
  ) {
    // let oggiStr = new Date().toLocaleDateString();
    // let dateStr = date != undefined ? date.toLocaleDateString() : '';
    // console.log(oggiStr + ' == ' + dateStr);
    return true;
  });

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

    /** Titolo finestra lightbox */
    myScheduler.templates.lightbox_header = function(start, end, ev) {
      var formatFunc = myScheduler.date.date_to_str('%d.%m.%Y');
      return formatFunc(start) + ' - ' + formatFunc(end);
    };
  });

  /**
   * Al click sul tasto Today
   */
  myScheduler.attachEvent('onBeforeTodayDisplayed', function() {
    centraViewOggi();
    return false; //diabilito comportamento di default
  });

  /**
   * Gestore per evento onEventCreated
   * @param {*} event_id
   */
  function handleNewEvento(event_id) {
    //  Imposto i valori di default per nuovo evento
    let ev = myScheduler.getEvent(event_id);
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
