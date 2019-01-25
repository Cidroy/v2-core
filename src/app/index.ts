import { default as Vue } from "vue"
import Vuetify from "vuetify"
import Axios from "axios"

import "vuetify/dist/vuetify.min.css"
import "@/components/app.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/css/brands.min.css"

import * as util from "@@/config/util"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("browser")

// Don't warn about using the dev version of Vue in development
// @ts-ignore
Vue.config["productionTip"] = process.env.NODE_ENV === "production"
// @ts-ignore
Vue.http = Vue.prototype.$http = <any>Axios

// @ts-ignore
Vue.use(Vuetify)

if(util.isNotInstalled()){
	Console.info("rendering installer")
	require("@/app.installer")
}
else {
	Console.info("rendering main app")
	require("@/app.main")
}