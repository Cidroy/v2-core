import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
})
// @ts-ignore
export default class NavbarSearch extends Vue {
	private search = ""
}