import { default as Vue } from "vue"
import Vuetify from "vuetify"
import { ObserveVisibility } from "vue-observe-visibility"
import Axios from "axios"

import "vuetify/dist/vuetify.min.css"
import "@/components/app.css"
import "@/assets/fonts/icons/material-icons.css"
import "@/assets/fonts/fontawesome/all.css"
import "@/assets/fonts/fontawesome/brands.css"

import { MainProcess } from "@/MainProcess"
import { theme } from "@@/config/theme"
import { Permission } from "@classes/Permission"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`vue`)
// Don't warn about using the dev version of Vue in development
Vue.config["productionTip"] = process.env.NODE_ENV === "production"
Vue["http"] = Vue.prototype.$http = Axios
Vue["permission"] = Vue.prototype.$permission = Permission
Vue.config.performance = process.env.NODE_ENV !== "production"
Vue.config.errorHandler = (err, vm, info) => { Console.error(err,vm, info) }
Vue.config.warnHandler = (msg, vm, trace) => { Console.warn(msg, vm, trace) }

Vue.use(Vuetify, { theme })
Vue.directive("observe-visibility", ObserveVisibility)

MainProcess.main()