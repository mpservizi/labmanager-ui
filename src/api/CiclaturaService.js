import { HttpRequest } from '@/shared/http_request';

//I dati sono salvati sotto un unico record
//Cambiare id del record quando diventeranno troppi dati
//Soluzione temporanea, da sistemare dopo
const DB_VERSION = 'db1';
const URL_RISORSE = 'risorse';
const URL_DATI_CICLATURA_GET = 'dati_ciclatura/' + DB_VERSION;
const URL_DATI_CICLATURA = 'dati_ciclatura';

let risorse_cache;
let dati_cache;
class CiclaturaProvider extends HttpRequest {
    async getRisorse() {
        // if (risorse_cache) return risorse_cache;
        let response = await this.getRequest(URL_RISORSE);
        risorse_cache = response.data;
        return risorse_cache;
    }
    async getDatiCiclatura() {
        // if (dati_cache) return dati_cache;
        let response = await this.getRequest(URL_DATI_CICLATURA_GET);
        dati_cache = response.data;
        return dati_cache;
    }
    async saveDatiCiclatura(payload) {
        payload._id = DB_VERSION;
        // let response = await this.create(URL_DATI_CICLATURA, payload);
        let response = await this.update(URL_DATI_CICLATURA, payload);
        dati_cache = null;
        return response.data;
    }
}

export const CiclaturaService = new CiclaturaProvider('CiclaturaProvider');
