import Vue from 'vue';
import App from './App.vue';
import store from './store';
import alphaSignature from './filters/alphaSignature';
import './styles/base.scss';

Vue.config.productionTip = false;
Vue.filter('alphaSignature', alphaSignature);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
