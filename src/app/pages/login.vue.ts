import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import logo from "@/assets/images/splash-logo.png"
import { PASSWORD_PREFERENCE } from "@classes/interface/IUser"
import { UserStore } from "@/state/user"
import { alert } from "@/components/toast"
import { UserClient } from "@/classes/clients/user"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gk/${__filename}`)

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
	created(){
		this.loadUsers()
	}
})
// @ts-ignore
export default class LoginPage extends Vue {
	private logo = logo
	private username = ""
	private password = ""
	private showPassword = false
	private loggingIn = false

	private loadingUsers = false
	private async loadUsers(){
		this.loadingUsers = true
		try {
			await UserStore.InitializeUsers()
		} catch (error) { alert(error.toString(), "error") }
		this.loadingUsers = false
	}

	@Watch("username") private onUsernameChanged(){
		this.passwordPreference = UserStore.USER_PASSWORD_PREFERENCE(this.username)
	}

	private get Usernames(){ return UserStore.USERNAMES }
	// tslint:disable-next-line: semicolon
	private passwordPreference: PASSWORD_PREFERENCE = PASSWORD_PREFERENCE.PASSWORD;
	private get PasswordPrefered(){ return this.passwordPreference===PASSWORD_PREFERENCE.PASSWORD }
	private get PASSWORD_PREFERENCE() { return PASSWORD_PREFERENCE }

	private changeLoginPreferrence(mode: PASSWORD_PREFERENCE){
		this.passwordPreference = mode
		this.password = ""
	}
	private async login(){
		this.loggingIn = true
		try {
			await UserClient.Login(this.username, this.password, this.passwordPreference)
		} catch (error) {
			alert(error.toString(), "error")
		}
		this.loggingIn = false
	}

	private get rules(){
		return {
			password : [ (v: string) => !!v || "Password is Required", ],
			pin : [ (v: string) => !!v || "Pin is Required", ],
			username : [ (v: string) => !!v || "Username is Required", ],
		}
	}
}