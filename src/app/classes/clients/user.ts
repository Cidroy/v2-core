import { PASSWORD_PREFERENCE } from "@classes/enum/misc"
import { UserStore } from "@/state/user"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { ApplicationStore } from "@/state/application"
import { Logger } from "@classes/CONSOLE"
import router from "@/routes"
import GQLClient, { gql } from "@/utils/graphql"

const Console = new Logger(`gk/user`)
export class UserClient{
	public static async Login(username: string, password: string, preference: PASSWORD_PREFERENCE, redirectTo: string = "index"){
		Console.verbose("try login")
		let response
		try {
			response = await GQLClient.query<{ login: boolean }>(
				gql`
				query login(
					$username: String!
					$password: String!
					$preference: PASSWORD_PREFERENCE!
				){
					login(username: $username, password: $password, type: $preference)
				}
			`,
				{
					username,
					password,
					preference,
				},
				{ fetchPolicy: "network-only" }
			)
		} catch (error) {
			Console.error(error)
			throw "Invalid Username or Password"
		}
		if(!response.data.login) throw "Could not login"
		Console.verbose("login init")
		await UserStore.Login()
		await Promise.all([
			GymkonnectStore.GK_Initialize(),
			ApplicationStore.InitializeAppMenu(),
		])
		router.push({ name: redirectTo })
	}

	public static async Logout(){
		let response = await GQLClient.query<{ logout: boolean }>(gql`query Login{ logout }`,{})
		try {
			if (response.errors) throw response.errors[0].message
			if (!response.data.logout) throw "Could not logout"
		} catch (error) {
			Console.error("logout failed", error)
			Console.warn("ignoring errors and logging out")
		}

		await UserStore.Logout()
		router.push({ name: "logout" })
	}
}