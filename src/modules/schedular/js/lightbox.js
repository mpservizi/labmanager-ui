import {
    LISTA_CARICHI,
    LISTA_SELEZIONE_RISORSE,
    LISTA_STATI
} from './costanti.js';

export function initLightbox(myScheduler) {
    myScheduler.config.lightbox.sections = [
        {
            map_to: 'progetto',
            name: 'progetto',
            type: 'textarea',
            height: 30
        },
        {
            map_to: 'descrizione',
            name: 'descrizione',
            type: 'textarea',
            height: 30
        },
        {
            map_to: 'idCarico',
            name: 'carico',
            type: 'radio',
            options: LISTA_CARICHI,
            height: 30
        },
        {
            map_to: 'idRisorsa',
            name: 'risorsa',
            type: 'select',
            options: myScheduler.serverList(LISTA_SELEZIONE_RISORSE),
            height: 30
        },
        {
            map_to: 'stato',
            name: 'stato',
            type: 'select',
            options: LISTA_STATI,
            height: 30
        },

        {
            map_to: 'text',
            name: 'sample',
            type: 'textarea',
            height: 30
        },
        {
            map_to: 'time',
            name: 'time',
            type: 'calendar_time',
            height: 30
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
    myScheduler.locale.labels.section_time = 'Data';

    //Disabilito i campi nel lightbox
    myScheduler.attachEvent('onLightbox', function(task_id) {
        document.getElementsByTagName('textarea')[0].disabled = true;
        document.getElementsByTagName('textarea')[1].disabled = true;
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
