import { PASSWORD_PREFERENCE } from "@classes/interface/IUser"
import { UserStore } from "@/state/user"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { ApplicationStore } from "@/state/application"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gk/user`)
export class UserClient{
	public static async Login(username: string, password: string, preference: PASSWORD_PREFERENCE){
		// TODO: login logic
		await UserStore.Login()
		let result = await Promise.all([
			GymkonnectStore.GK_Initialize(),
			ApplicationStore.InitializeAppMenu(),
		])
		Console.log(result)
	}

	public static async Logout(){
		// TODO: logout logic
		await UserStore.Logout()
	}
}