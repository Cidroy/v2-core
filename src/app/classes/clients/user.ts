import { PASSWORD_PREFERENCE } from "@classes/enum/misc"
import { UserStore } from "@/state/user"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { ApplicationStore } from "@/state/application"
import { Logger } from "@classes/CONSOLE"
import router from "@/routes"

const Console = new Logger(`gk/user`)
export class UserClient{
	public static async Login(username: string, password: string, preference: PASSWORD_PREFERENCE, redirectTo: string = "index"){
		// TODO: login logic
		await UserStore.Login()
		await Promise.all([
			GymkonnectStore.GK_Initialize(),
			ApplicationStore.InitializeAppMenu(),
		])
		router.push({ name: redirectTo })
	}

	public static async Logout(){
		// TODO: logout logic
		await UserStore.Logout()
		router.push({ name: "logout" })
	}
}