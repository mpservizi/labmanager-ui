import {myScheduler} from 'Moduli/schedular/js/my-lib.js'
class TestPlanner{
    constructor(){
        this.lib = myScheduler;
    }
    init(container){
        prova(this.lib);
        // this.lib.init(container);
        this.lib.init(container,new Date(),'timeline');
    }
}

function prova(ms){
    ms.locale.labels.timeline_tab = 'Timeline';
    ms.locale.labels.section_risorsa='Risorsa';
    ms.config.details_on_dblclick=true;

    //No creazione con drag e doppio click
    ms.config.dblclick_create = false;
    ms.config.drag_create = false;
    
    //Numero massimo di task in un slot
    ms.config.collision_limit = 4;    
    //===============
    //Configuration
    //===============
    const sections=[
        { key: 1, label: 'To Plan'},
        { key: 2, label: 'L180-6+7' },
        { key: 3, label: 'L180-8+9' },
        { key: 4, label: 'L232-6+7'},
        { key: 5, label: 'L232-8+9'},
        { key: 6, label: 'L2020-1+2' },
        { key: 7, label: 'L2020-3+4' },
        { key: 8, label: 'L2020-5+6'}
    ];

    ms.serverList('risorse',sections);
    ms.createTimelineView({
        name: 'timeline',
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: 21,
        section_autoheight: false,
        y_unit: ms.serverList('risorse'),
        y_property: 'idRisorsa',
        render: 'bar',
        round_position: true,
        dy: 40,
        event_dy: 'full', //altezza evento nella riga risorsa
        second_scale: {
            x_unit: 'week',
            x_date: '%F, %Y'
        }
    });
    //===============
    //Data loading
    //===============
    ms.config.lightbox.sections=[
        {name:'description', height:50, map_to:'text', type:'textarea' , focus:true},
        {name:'risorsa', height:30, type:'select', options:sections, map_to:'idRisorsa' },
        {name:'time', height:72, type:'time', map_to:'auto'}
    ];

    ms.attachEvent('onCellDblClick', function (x_ind, y_ind, x_val, y_val, e){
        // console.log(x_ind, y_ind, x_val, y_val);
        // console.log(y_ind);
        let task=creaTask(y_ind,x_val);
        ms.addEvent(task);
    });

    function creaTask(indexRisorsa,data){
        let durata = 2;
        let dataFine = ms.date.add(data,durata,'day');
        let risorsa = sections[indexRisorsa];
        let task = {
            start_date:data,
            idRisorsa:risorsa.key,
            end_date:dataFine,
            text:'From code'
        }
        return task;   
    }
    
}

export const MyPlanner = new TestPlanner();