import Vue from 'vue';

class MyEventBus {
    constructor() {
        this.bus = new Vue();
    }
    emit(event, payload) {
        this.bus.$emit(event, payload);
    }
    on(event, callback) {
        this.bus.$on(event, callback);
    }
}

export const EventBus = new MyEventBus();
