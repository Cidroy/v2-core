import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import { TUserStoreUsers, TUserStoreUser } from "@/classes/types/user"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"
import { alert } from "@/components/toast"
import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`user/core-store`)
let CORE_loggedin = false
let users: TUserStoreUsers[] = []
let CORE_user: TUserStoreUser | 0 = 0
@Module({ dynamic: true, store, name: "User" })
class User extends VuexModule {
	private CORE_loggedin = CORE_loggedin
	public get USER_LOGGEDIN() { return this.CORE_loggedin }
	@MutationAction({ mutate: ["CORE_loggedin",] }) private async CORE_setLoggedIn(payload: boolean) {
		CORE_loggedin = payload
		return { CORE_loggedin }
	}

	private CORE_user = CORE_user
	public get USER() { return this.CORE_user }
	@MutationAction({ mutate: ["CORE_user",] }) private async CORE_setUser(payload: TUserStoreUser | 0) {
		CORE_user = payload
		return { CORE_user: payload }
	}

	@Action({}) public async Login() {
		Console.verbose("set login info")
		let response = await GQLClient.query<{ user: TUserStoreUser }>(gql`
			query whoAmI{ user: whoAmI{
				id
				username
				permissions
				name: username
				# FIXME: get remaining data
			} }
		`)
		try {
			if (response.errors) throw response.errors
			CORE_user = { ...response.data.user, userType: "God" }
			CORE_loggedin = true
		} catch (error) {
			Console.error("Login()", error)
			await GQLClient.query<{ logout: boolean }>(gql`query { logout }`, {})
		}
		await Promise.all([
			this.CORE_setLoggedIn(CORE_loggedin),
			this.CORE_setUser(CORE_user),
		])
		return { CORE_loggedin, CORE_user }
	}

	@MutationAction({ mutate: ["CORE_loggedin", "user",] }) public async Logout() {
		CORE_loggedin = false
		this.CORE_user = 0
		return { CORE_loggedin, user: CORE_user }
	}

	private users = users
	@MutationAction({ mutate: ["users",] }) public async InitializeLoginUsers() {
		try {
			let response = await GQLClient.query<{ users: { name: string, preference: PASSWORD_PREFERENCE }[] }>(gql`
				query users{
					users: loginUsers{ name: username, preference: passwordPreference }
				}
			`)
			if (response.errors) throw response.errors
			users = response.data.users
		} catch (error) {
			alert(error.toString(), "error")
			users = []
		}
		return { users }
	}
	public get USERNAMES() { return this.users.map(user => user.name) }
	public get USER_PASSWORD_PREFERENCE() {
		return (username: string) => {
			let user = users.find(_user => _user.name === username)
			if (!user) return PASSWORD_PREFERENCE.PASSWORD
			return user.preference
		}
	}
}

export const UserStore = getModule(User)