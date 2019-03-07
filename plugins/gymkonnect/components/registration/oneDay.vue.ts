import { Component, Vue } from "vue-property-decorator"

// @ts-ignore
@Component({})
// @ts-ignore
export default class oneDay extends Vue {

	private email = ""
	private emailRules = [
		(v: string) => (v || "").match(/@/) || "Please enter a valid email",
	]

}
