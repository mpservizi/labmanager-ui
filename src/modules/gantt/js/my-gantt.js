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

function parseDati(dati) {
    let dataParsed = parseDatiServer(dati);
    gantt.parse(dataParsed);
    // myGruppi.groupByCarico();
}
function render() {
    gantt.render();
}

function creaTask(params) {
    let taskId = gantt.addTask({
        text: params.text,
        start_date: params.start_date,
        duration: params.durata
    });
    return taskId;
}

export default {
    init,
    parseDati,
    render,
    creaTask
};
