import { default as Vue } from "vue"

import "@/components"
import "@/components/install"
import "@plugins/core/layouts"

import { vI18n } from "@/i18n"
import store from "@plugins/core/state/store"
import router from "@/routes/install"

import App from "@/install.vue"

const app = new Vue({
	router,
	store,
	i18n: vI18n,
	render: h => h(<any>App),
}).$mount("#app")
