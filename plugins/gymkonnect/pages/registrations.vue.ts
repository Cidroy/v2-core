import { Component, Vue } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import PersonalTrainingRegistration from "../components/registration/personal-training.vue"
import OneDayRegistration from "../components/registration/one-day.vue"
import FitnessCounselingRegistration from "../components/registration/fitness-counseling.vue"

@Component({
	// @ts-ignore
	components: {
		Layout,
		PersonalTrainingRegistration,
		OneDayRegistration,
		FitnessCounselingRegistration,
	},
})
// @ts-ignore
export default class RegistrationPage extends Vue {
	private printingBlank = false
	private printBlank() {
		// TODO:
	}

	// TODO: [Karthik] Icons
	private get RegistrationTypes(): Record<string, { name: string, slug: string, icon?: string }> {
		return {
			PERSONAL_TRAINING: { name: "Personal Training", slug: "personal-training", icon: "apps" },
			ONE_DAY: { name: "One Day", slug: "one-day", icon: "apps" },
			FITNESS_COUNSELING: { name: "Fitness Counseling", slug: "fitness-counseling", icon: "apps" },
		}
	}

	private bookingTab = Object.values(this.RegistrationTypes)[0].slug
}