import {myScheduler} from 'Moduli/schedular/js/my-lib.js'
class TestPlanner{
    constructor(){
        this.lib = myScheduler;
    }
    init(container){
        prova(this.lib);
        // this.lib.init(container);
        this.lib.init(container,new Date(2017,5,30),"timeline");
    }
}

function prova(ms){
    ms.locale.labels.timeline_tab = "Timeline";
    ms.locale.labels.section_custom="Section";
    ms.config.details_on_create=true;
    ms.config.details_on_dblclick=true;

    //===============
    //Configuration
    //===============
    var sections=[
        { key: 1, label: 'L180-6+7' },
        { key: 2, label: 'L180-8+9' },
        { key: 3, label: 'L232-6+7'},
        { key: 4, label: 'L232-8+9'},
        { key: 5, label: 'L2020-1+2' },
        { key: 6, label: 'L2020-3+4' },
        { key: 7, label: 'L2020-5+6'}
    ];

    // ms.createTimelineView({
    //     name:	"timeline",
    //     x_unit:	"minute",
    //     x_date:	"%H:%i",
    //     x_step:	30,
    //     x_size: 24,
    //     x_start: 16,
    //     x_length:	48,
    //     y_unit:	sections,
    //     y_property:	"section_id",
    //     render:"bar"
    // });

    ms.createTimelineView({
        name: 'timeline',
        x_unit: 'day',
        x_date: '%j',
        x_step: 1,
        x_size: 30,
        section_autoheight: false,
        y_unit: sections,
        y_property: 'key',
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
        {name:"description", height:50, map_to:"text", type:"textarea" , focus:true},
        {name:"custom", height:30, type:"select", options:sections, map_to:"section_id" },
        {name:"time", height:72, type:"time", map_to:"auto"}
    ];
}
export const MyPlanner = new TestPlanner();