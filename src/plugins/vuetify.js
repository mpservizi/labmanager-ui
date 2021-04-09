import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5D4037',//Navigation bar
        secondary: '#9E9E9E',//Secondario
        accent: '#8BC34A',//Bottoni chiave
        minfo:'#d6cfcf',//Bottoni info
        msfondo:'#e8e8e8',//al posto dello sfondo bianco
        error: '#b71c1c',
      },
    },
  },
});
