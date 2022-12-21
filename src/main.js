import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueSession from 'vue-session'
import actions from "@/store";

Vue.prototype.$axios = axios
Vue.prototype.$actions = actions
Vue.config.productionTip = false

Vue.use(VueSession)

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
