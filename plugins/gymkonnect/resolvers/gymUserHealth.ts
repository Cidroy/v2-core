import * as GQL from "type-graphql"
import GymUserHealth from "@plugins/gymkonnect/model/gymUserHealth"
import GymUsers from "@plugins/gymkonnect/model/gymUsers"

@GQL.Resolver(of => GymUserHealth)
export default class GymUserHealthResolver {

	// @GQL.Query(returns => [GymUserHealth,])
	// public async gymUserHealth() {
	// 	return GymUserHealth.find({ where: { active: 1 } })
	// }
	@GQL.Mutation(returns => Boolean)
	public async linkHealthGymUser(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("healthId") healthId: number,
	) {
		try {
			let gymuser = await GymUsers.find({ where: { userId: userId } })
			if (gymuser.length == 0) throw "Invalid user"
			let gymUserId = gymuser[0].id

			let gymUserHealth = await GymUserHealth.createQueryBuilder()
				.update(GymUserHealth)
				.set({ gymUser: gymUserId })
				.where({ id: healthId })
				.execute()
			if (gymUserHealth === undefined) throw "Invalid health"

			let gymUser = await GymUsers.createQueryBuilder()
				.update(GymUsers)
				.set({ healthJoining: healthId })
				.where({ id: gymUserId })
				.execute()

			return true
		} catch (error) {
			return false
		}
	}
	@GQL.Mutation(returns => Boolean)
	public async linkCurrentHealthGymUser(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("healthId") healthId: number,
	) {
		try {
			let gymuser = await GymUsers.find({ where: { userId: userId } })
			if (gymuser.length == 0) throw "Invalid user"
			let gymUserId = gymuser[0].id

			let gymUser = await GymUsers.createQueryBuilder()
				.update(GymUsers)
				.set({ healthCurrent: healthId })
				.where({ id: gymUserId })
				.execute()

			return true
		} catch (error) {
			return false
		}
	}

	@GQL.Mutation(returns => GymUserHealth)
	public async addGymUserHealth(
		@GQL.Arg("weight") weight: number,
		@GQL.Arg("height") height: number,
		@GQL.Arg("bodyType") bodyType: number,
		@GQL.Arg("bloodGroup", { nullable: true }) bloodGroup: number

	) {
		let gymUserHealth = new GymUserHealth()
		gymUserHealth.weight = weight
		gymUserHealth.height = height
		gymUserHealth.bodyType = bodyType
		bloodGroup && (gymUserHealth.bodyType = bodyType)

		await gymUserHealth.save()
		return gymUserHealth
	}
}