import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import actions from "@/store"

Vue.prototype.$actions = actions
Vue.config.productionTip = false

Vue.use(require('vue-session'))

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
