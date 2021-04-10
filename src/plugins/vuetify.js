import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#5D4037',//Navigation bar
        // secondary: '#9E9E9E',//Secondario
        // accent: '#8BC34A',//Bottoni chiave
        // msfondo:'#e8e8e8',//al posto dello sfondo bianco
        primary: '#8BC34A',//Navigation bar
        secondary: '#009688',//Secondario
        accent: '#FF8A65',//Bottoni chiave
        msfondo:'#FFFFFF',//al posto dello sfondo bianco
        error: '#b71c1c',
      },
    },
  },
});
