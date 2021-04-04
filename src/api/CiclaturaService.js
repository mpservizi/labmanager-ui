import {HttpRequest} from '@/shared/http_request';

const URL_RISORSE = 'risorse';
const URL_DATI_CICLATURA = 'ciclatura';

class CiclaturaProvider extends HttpRequest {
    async getRisorse() {
        let response = await this.getRequest(URL_RISORSE);
        return response.data;
    }
    async getDatiCiclatura() {
        let response = await this.getRequest(URL_DATI_CICLATURA);
        return response.data;
    }
    async saveDatiCiclatura(payload) {
        let response = await this.create(URL_DATI_CICLATURA, payload);
        return response.data;
    }
}

export const CiclaturaService = new CiclaturaProvider('CiclaturaProvider');
