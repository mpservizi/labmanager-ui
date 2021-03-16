import HttpRequest from '@/shared/http_request';

class PersonProvider extends HttpRequest {
    createUser(data) {
        return this.create('', data);
    }
}

export default PersonProvider;
