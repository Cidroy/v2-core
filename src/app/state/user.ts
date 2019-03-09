import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import { TUserStoreUsers } from "@/classes/types/user"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

let loggedin = false
let users: TUserStoreUsers[] = []

@Module({ dynamic: true, store, name: "User" })
class User extends VuexModule {
	private loggedin = loggedin
	public get USER_LOGGEDIN() { return this.loggedin }

	@MutationAction({ mutate: ["loggedin",] }) public async Login() {
		loggedin = true
		// FIXME: more logic, fetch user details, login preference etc.
		return { loggedin }
	}

	@MutationAction({ mutate: [ "loggedin", ] }) public async Logout() {
		loggedin = false
		// FIXME: log the fuck out
		return { loggedin }
	}

	private users = users
	@MutationAction({ mutate: [ "users", ] }) public async InitializeUsers() {
		users = [
			{
				name: "Rinzler",
				preference: PASSWORD_PREFERENCE.PASSWORD
			},
			{
				name: "Nigga",
				preference: PASSWORD_PREFERENCE.PIN
			},
			{
				name: "Bugdaddi",
				preference: PASSWORD_PREFERENCE.PASSWORD
			},
		]
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