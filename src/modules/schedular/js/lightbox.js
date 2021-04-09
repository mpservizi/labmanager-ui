import {
    LISTA_CARICHI,
    LISTA_SELEZIONE_RISORSE,
    LISTA_STATI
} from './costanti.js';

const ALTEZZZA_CAMPO = 27;
export function initLightbox(myScheduler) {
    myScheduler.config.lightbox.sections = [
        {
            map_to: 'progetto',
            name: 'progetto',
            type: 'textarea',
            height: ALTEZZZA_CAMPO
        },
        {
            map_to: 'descrizione',
            name: 'descrizione',
            type: 'textarea',
            height: ALTEZZZA_CAMPO
        },
        {
            map_to: 'idCarico',
            name: 'carico',
            type: 'radio',
            options: LISTA_CARICHI,
            height: ALTEZZZA_CAMPO
        },
        {
            map_to: 'idRisorsa',
            name: 'risorsa',
            type: 'select',
            options: myScheduler.serverList(LISTA_SELEZIONE_RISORSE),
            height: ALTEZZZA_CAMPO
        },
        {
            map_to: 'stato',
            name: 'stato',
            type: 'select',
            options: LISTA_STATI,
            height: ALTEZZZA_CAMPO
        },

        {
            map_to: 'text',
            name: 'sample',
            type: 'textarea',
            height: ALTEZZZA_CAMPO
        },
        {
            map_to: 'time',
            name: 'time',
            type: 'calendar_time',
            height: ALTEZZZA_CAMPO
        }
    ];

    //labels
    myScheduler.locale.labels.section_progetto = 'Progetto';
    myScheduler.locale.labels.section_descrizione = 'Descrizione';
    myScheduler.locale.labels.section_carico = 'Carico';
    myScheduler.locale.labels.section_stato = 'Stato';
    // myScheduler.locale.labels.section_request = 'Test request';
    myScheduler.locale.labels.section_risorsa = 'Risorsa';
    myScheduler.locale.labels.section_sample = 'Sample code';
    myScheduler.locale.labels.section_time = 'Data inizio';

    //Disabilito i campi nel lightbox
    myScheduler.attachEvent('onLightbox', function(task_id) {
        for (let index = 0; index < 2; index++) {
            let el=document.getElementsByTagName('textarea')[index];
            el.disabled = true;
            el.classList.add('sololettura');            
        }
    });

    // myScheduler.attachEvent('onBeforeLightbox', function(id) {
    //   //any custom logic here
    //   // let ev = myScheduler.getEvent(id);
    //   // ev.id_carico = ricavaIdCarico(ev.carico);
    //   // return true;
    // });
}

function getLista(myScheduler) {
    let lista = myScheduler.serverList(LISTA_SELEZIONE_RISORSE);
    console.log(myScheduler);
    return [];
}
