import { MyEventi } from './my-eventi.js';
import { MyConfig } from './my-config.js';
import { MyTemplates } from './my-templates.js';
import { LISTA_CARICHI, NOME_LISTA_CARICHI,NOME_LISTA_RISORSE,LISTA_RISORSE } from '../../costanti.js';

import {parseDatiServer} from 'Moduli/gantt/js/data-parser.js';
export  function preConfig(myGantt){
    initWorkloadGantt(myGantt);
}
export function parseDati(myGantt,dati){
    let parsedData = parseDatiServer(dati);
    myGantt.parseDati(parsedData);

}
function initWorkloadGantt(myGantt){    
    let myEventi = new MyEventi(myGantt);
    let myConfig = new MyConfig(myGantt);
    let myTemplates = new MyTemplates(myGantt);

    myConfig.init();
    myEventi.init();
    myTemplates.init();

    myGantt.serverList(NOME_LISTA_CARICHI, LISTA_CARICHI);
    myGantt.serverList(NOME_LISTA_RISORSE, LISTA_RISORSE);

}
