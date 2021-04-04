import { LISTA_CARICHI, LISTA_SELEZIONE_RISORSE } from './costanti.js';
export function initLightbox(myScheduler) {
    myScheduler.config.lightbox.sections = [
        {
            map_to: 'progetto',
            name: 'progetto',
            type: 'textarea',
            height: 30
        },
        // {
        //     map_to: 'idRequest',
        //     name: 'request',
        //     type: 'textarea',
        //     height: 30
        // },
        {
            map_to: 'idCarico',
            name: 'carico',
            type: 'radio',
            options: LISTA_CARICHI
        },
        {
            map_to: 'idRisorsa',
            name: 'risorsa',
            type: 'select',
            options: myScheduler.serverList(LISTA_SELEZIONE_RISORSE)
        },

        {
            map_to: 'text',
            name: 'sample',
            type: 'textarea',
            height: 30
        }
        // {
        //   map_to: "is_paid",
        //   name: "is_paid",
        //   type: "checkbox",
        //   checked_value: true,
        //   unchecked_value: false,
        // },
        // {
        //     map_to: 'time',
        //     name: 'time',
        //     type: 'calendar_time'
        // }
    ];

    //labels
    myScheduler.locale.labels.section_progetto = 'Progetto';
    myScheduler.locale.labels.section_carico = 'Carico';
    // myScheduler.locale.labels.section_request = 'Test request';
    myScheduler.locale.labels.section_risorsa = 'Risorsa';
    myScheduler.locale.labels.section_sample = 'Sample code';
    // myScheduler.locale.labels.section_time = 'Time';

    //Disabilito i campi nel lightbox
    myScheduler.attachEvent('onLightbox', function(task_id) {
        document.getElementsByTagName('textarea')[0].disabled = true;
        // document.getElementsByTagName('textarea')[1].disabled = true;
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
