import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#182a48',
                secondary: '#ababaa',
                accent: '#b85861',
                error: '#b71c1c',
            },
        },
    },
});
