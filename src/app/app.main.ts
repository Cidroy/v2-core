import { default as Vue} from "vue"

import "@plugins/core/layouts"
import "@/components"
import store from "@plugins/core/state/store"
import router from "@/routes"

import App from "@/app.vue"

const app = new Vue({
	router,
	store,
	render: h => h(<any>App),
}).$mount("#app")
