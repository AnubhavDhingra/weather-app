import Vue from 'vue'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { Laue } from 'laue';

Vue.use(Laue);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

// weather-man.surge.sh