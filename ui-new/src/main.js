import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BIcon, BIconChevronDown, BIconChevronUp, BIconToggleOff, BIconToggleOn, BIconPlay, BIconHeartFill } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconChevronDown', BIconChevronDown)
Vue.component('BIconChevronUp', BIconChevronUp)
Vue.component('BIconToggleOff', BIconToggleOff)
Vue.component('BIconToggleOn', BIconToggleOn)
Vue.component('BIconPlay', BIconPlay)
Vue.component('BIconHeartFill', BIconHeartFill)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
