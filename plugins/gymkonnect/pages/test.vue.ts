import { Component, Vue } from "vue-property-decorator"
import tester from "../components/test.vue"

@Component({
	// @ts-ignore
	components: { tester, },
})
// @ts-ignore
export default class TestPage extends Vue { }