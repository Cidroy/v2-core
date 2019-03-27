import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import ProfileModal from "./member/profile/profile-modal.vue"
import testuserprofile from "../pages/user-profile.vue"
@Component({
	// @ts-ignore
	components: {
		empty,
		testuserprofile,
		ProfileModal,
	},
})
// @ts-ignore
export default class Test extends Vue {
	private profile = false
}