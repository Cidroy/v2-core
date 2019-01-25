import { default as Vue } from "vue"
import Vuetify from "vuetify"

import { theme } from "@@/config/theme"
import App from "@@/splashscreen/App.vue"

import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify, { theme })

const app = new Vue({
	render: h => h(<any>App),
}).$mount("#app")
