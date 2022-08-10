import Vue from 'vue'
import App from './App.vue'

import { Field, Input, Button, Toast} from 'buefy'
import 'buefy/dist/buefy.css'


Vue.use(Field)
Vue.use(Input)
Vue.use(Button)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
