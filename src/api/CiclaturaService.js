import {HttpRequest} from '@/shared/http_request';

//I dati sono salvati sotto un unico record
//Cambiare id del record quando diventeranno troppi dati
//Soluzione temporanea, da sistemare dopo
const DB_VERSION = 'db1';
const URL_RISORSE = 'risorse';
const URL_DATI_CICLATURA_GET = 'dati_ciclatura/'+DB_VERSION;
const URL_DATI_CICLATURA = 'dati_ciclatura';

class CiclaturaProvider extends HttpRequest {
    async getRisorse() {
        let response = await this.getRequest(URL_RISORSE);
        return response.data;
    }
    async getDatiCiclatura() {
        let response = await this.getRequest(URL_DATI_CICLATURA_GET);
        return response.data;
    }
    async saveDatiCiclatura(payload) {
        payload._id=DB_VERSION;
        // let response = await this.create(URL_DATI_CICLATURA, payload);
        let response = await this.update(URL_DATI_CICLATURA, payload);
        return response.data;
    }
}

export const CiclaturaService = new CiclaturaProvider('CiclaturaProvider');
