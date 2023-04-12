//import store from './store'
import vClickOutside from 'click-outside-vue3';
import {createPinia} from 'pinia';
import {createApp} from 'vue';
import App from './App.vue';

const store = createPinia();
const app = createApp(App)

app.use(store)
app.use(vClickOutside)


app.mount('#app')

//Vue.config.productionTip = false
//Vue.directive('autofocus', {
//  inserted(el) {
//    el.focus();
//  }
//})
//Vue.filter('convert_rank', function (val) {
//  let rankPower = [
//    '',
//    'R',
//    'AM',
//    'SM',
//    'M',
//    'ME',
//    'STAR',
//    '1S',
//    '2S',
//    'DS',
//    'DT',
//    'DT1',
//    'DT2',
//    'DT3',
//    'DT4',
//    'DT5'
//  ]
//  if (!val) return '';
//  return rankPower[val];
//},)
//
//new Vue({
//  store,
//  render: h => h(App)
//}).$mount('#app')
