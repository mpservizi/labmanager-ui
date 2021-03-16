import Vue from "vue";
import App from "./App.vue";
import Router from "./services/router";
import Store from "./services/store";
import MainModule from "./modules/main/module";
import { RegistraModulo } from "./services/installer";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
initApp();

async function initApp() {
  //  Registro il modulo principale
  let esito = await RegistraModulo(MainModule);
  if (!esito) {
    let box = document.getElementById("app");
    let testo = document.createElement("h1");
    testo.innerHTML = "Errore installazione modulo principale";
    box.appendChild(testo);
  } else {
    new Vue({
      router: Router,
      store: Store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
}
