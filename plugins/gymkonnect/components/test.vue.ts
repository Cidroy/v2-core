import { Component, Vue } from "vue-property-decorator"
import ProfileModal from "./member/profile/profile-modal.vue"
import testuserprofile from "../pages/user-profile.vue"
import uuid from "uuid"

let profileModal: ProfileModal & Vue.default | undefined = undefined

// @ts-ignore
@Component({
	components: {
		ProfileModal,
	},
})
export default class Test extends Vue.default {
	private profile = false

	private async showProfile(){
		if(profileModal === undefined){
			let ProfileModalClass = Vue.default.extend(ProfileModal)
			profileModal = new ProfileModalClass<ProfileModal>({
				propsData: { value: true }
			})
			profileModal.$mount()
			this.$el.appendChild(profileModal.$el)
			console.log(profileModal)
			profileModal.dummy = 12
		}
		// @ts-ignore
		profileModal.showModal = true
		profileModal.dummy = 13
	}
}
