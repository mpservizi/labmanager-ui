import { gantt } from '../libs/gantt/dhtmlxgantt.js';
import { LISTA_CARICHI, NOME_LISTA_CARICHI } from '../costanti.js';
import { parseDatiServer } from './data-parser.js';
import { MyGruppi } from './gruppi.js';
import { MyEventi } from './my-eventi.js';
import { MyConfig } from './my-config.js';
import { MyTemplates } from './my-templates.js';

let myGruppi;
let myEventi;
let myConfig;
let myTemplates;

function init(divContainer) {
    myGruppi = new MyGruppi(gantt);
    myEventi = new MyEventi(gantt);
    myConfig = new MyConfig(gantt);
    myTemplates = new MyTemplates(gantt);

    myConfig.init();
    myEventi.init();
    myTemplates.init();

    gantt.serverList(NOME_LISTA_CARICHI, LISTA_CARICHI);
    gantt.init(divContainer);
}

function raggruppa() {
    // myGruppi.groupByRisorse();
    myGruppi.groupByCarico();
}

function raggruppa1(gruppoAttivo) {
    if (gruppoAttivo) {
        gantt.groupBy(false);
    } else {
        gantt.groupBy({
            groups: gantt.serverList(LISTA_CARICHI),
            relation_property: 'idCarico',
            group_id: 'key',
            group_text: 'label'
        });
        // gantt.sort('start_date');
    }

    gantt.render();
}

function parseDati(dati) {
    let dataParsed = parseDatiServer(dati);
    gantt.parse(dataParsed);
}
function render() {
    gantt.render();
}
export default {
    init,
    raggruppa,
    parseDati,
    render
};
