/**
 * Esegue il parsing dei dati ricevuti dal server
 */
export function parseDatiServer(dati){
    let result = {
        data:[],
        links:[]
    }
    result.data = dati.data.map(item=>{
        item.readonly=true;
        item.editable=false;
        item.fromServer=true;
        return item;
    });
    return result;
}