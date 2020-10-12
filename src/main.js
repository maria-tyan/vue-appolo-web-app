import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createProvider } from './vue-apollo';
import App from './App.vue';

library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
