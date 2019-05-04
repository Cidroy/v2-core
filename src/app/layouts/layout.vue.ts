import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
})
export default class Layout extends Vue.default {

}
