import { default as Vue } from "vue"
import Vuetify from "vuetify"
import Axios from "axios"

import "vuetify/dist/vuetify.min.css"
import "@/components/app.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/css/brands.min.css"

import { MainProcess } from "@/MainProcess"

// Don't warn about using the dev version of Vue in development
Vue.config["productionTip"] = process.env.NODE_ENV === "production"
Vue["http"] = Vue.prototype.$http = Axios

Vue.use(Vuetify)

MainProcess.main()