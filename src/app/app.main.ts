import { default as Vue} from "vue"

import "@/layouts"
import "@/components"
import store from "@/state/store"
import router from "@/routes"

import App from "@/app.vue"

const app = new Vue({
	router,
	store,
	render: h => h(<any>App),
}).$mount("#app")