import { pausa } from '@/shared/util.js';

export async function add_item(key, valore) {
    console.log('add_item:' + key);
    localStorage.setItem(key, valore);
    await pausa(10);
    return valore;
}
export async function get_item(key) {
    console.log('get_item:' + key);
    let dati = localStorage.getItem(key);
    let result = {
        data: dati || []
    };
    await pausa(10);
    console.log(result);
    return result;
}
export async function delete_item(key) {
    console.log('delete_item:' + key);
    localStorage.removeItem(key);
    await pausa(10);
    return true;
}

export class FakeHttpRequest {
    constructor() {}

    setHeader(header) {
        console.log('Set fake headerr');
    }

    getRequest(methodName, data) {
        return get_item(methodName);
    }

    create(methodName, data) {
        return add_item(methodName, data);
    }

    update(methodName, data) {
        return add_item(methodName, data);
    }

    delete(methodName, id) {
        return delete_item(methodName);
    }

    request(type, url, data) {
        let promise = null;
        return promise;
    }
}
