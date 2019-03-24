import * as GQL from "type-graphql"
import AdminUsers from "@positron/models/adminUsers"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gql-resolvers/admin-users`)
let userType = {
	3000 : "GymKonnect Admin",
	2000 : "Gym Admin",
	1000 : "Trainer"
}
@GQL.Resolver(of => AdminUsers)
export default class AdminUsersResolver {

	@GQL.Query(returns => [AdminUsers,])
	public async loginUsers() {
		return AdminUsers.find({ where: { active: 1 } })
	}

	@GQL.Query(returns => Boolean)
	public async login(
		@GQL.Arg("username") username: string,
		@GQL.Arg("password", { nullable: true }) password: string,
		@GQL.Arg("type", type => PASSWORD_PREFERENCE) type: PASSWORD_PREFERENCE,
		@GQL.Ctx() { session } : GQLContext
	) {
		let user = await AdminUsers.findOne({
			where: {
				active: 1,
				username,
				[type.toLowerCase()]: password,
			},
		})
		if (!user) throw `Invalid Username or ${type.toLowerCase()}`
		session.user = { id: user.id }
		if (user.passwordPreference!==type){
			user.passwordPreference = type
			user.save()
		}
		return true
	}

	@GQL.FieldResolver(returns => String, { nullable: true })
	public async access(@GQL.Root() user: AdminUsers) {
		return userType[user.access]
	}

	@GQL.Query(returns => AdminUsers, { nullable: true })
	public async whoAmI( @GQL.Ctx() { session } : GQLContext ){
		if(session.user && session.user.id){
			let user = await AdminUsers.findOne(session.user.id)
			if(user) return user
		}
		throw "You are not Loggedin"
	}

	@GQL.Query(returns => Boolean)
	public async logout( @GQL.Ctx() { session } : GQLContext ) {
		delete session["user"]
		session.destroy(err => {})
		return true
	}

	@GQL.Mutation(returns => AdminUsers)
	public async addAdminUsers(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("username") username: string,
		@GQL.Arg("password",{nullable: true}) password: string,
		@GQL.Arg("pin", { nullable: true }) pin: string,
		@GQL.Arg("passwordPreference") passwordPreference: PASSWORD_PREFERENCE,
		@GQL.Arg("access") access: number,
		@GQL.Arg("referredToUsers",type => [Number,],{nullable: true}) referredToUsers: number[],
		// @GQL.Arg("permissions", { nullable: true }) permissions: object,
	) {
		let adminUser = new AdminUsers()
		adminUser.userId = userId
		adminUser.username = username
		password && (adminUser.password = password)
		pin && (adminUser.pin = pin)
		adminUser.passwordPreference = passwordPreference
		adminUser.access = access
		// adminUser.referredToUsers = referredToUsers
		// adminUser.permissions = permissions

		await adminUser.save()
		return adminUser
	}
}