import * as GQL from "type-graphql"
import AdminUsers from "@positron/models/adminUsers"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

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
		@GQL.Arg("pin", { nullable: true }) pin: string,
		@GQL.Arg("type", {nullable: false}) type: PASSWORD_PREFERENCE,
	) {
		if(type == PASSWORD_PREFERENCE.PASSWORD){
			return undefined !== await AdminUsers.findOne({ where: { active: 1, password: password , username: username} })
		}else{
			return undefined !== await AdminUsers.findOne({ where: { active: 1, pin: pin, username: username } })
		}
		
	}
	@GQL.Query(returns => Boolean)
	public async logout(
	) {
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