import Vue from "vue"

import "@/components"
import "@/components/install"
import "@/layouts"

import { vI18n } from "@/i18n"
import store from "@/state/store"
import router from "@/routes/install"

import App from "@/install.vue"

const app = new Vue({
	router,
	store,
	i18n: vI18n,
	render: h => h(App),
}).$mount("#app")
