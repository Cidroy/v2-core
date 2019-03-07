import * as GQL from "type-graphql"
import Groups from "@positron/models/groups"
import GroupMap from "@positron/models/groupMap"
import GymUsers from "@positron/models/gymUsers"

@GQL.Resolver(of => Groups)
export default class GroupsResolver {

	@GQL.Query(returns => [Groups,])
	public async Groups() {
		return Groups.find({ where: { active: 1 } })
	}
	@GQL.Mutation(returns => Groups)
	public async createGroupGymUsers(
		@GQL.Arg("groupingId") groupingId: number,
		@GQL.Arg("userIDs", type => [Number,]) userIDs: number[],
	) {
		try{
			let group = new Groups()
			group.groupingId = groupingId
			group.groupCount = userIDs.length
			await group.save()

			for (let i in userIDs){
				let gymuser = await GymUsers.find({ where: { userId: userIDs[i] } })
				if ( gymuser.length == 0) throw "Invalid user"
				let gymUserId = gymuser[0].id

				let gymUser = await GymUsers.createQueryBuilder()
					.update(GymUsers)
					.set({ isGrouped: true })
					.where({ id: gymUserId})
					.execute()
					
				let groupMap = new GroupMap()
				groupMap.gymUserId = gymUserId
				groupMap.groupId = group.id
				await groupMap.save()
				
			}
			
			return group
		}
		catch(error){
			return {}
	}
	}
	@GQL.Mutation(returns => Groups)
	public async addGroups(
		@GQL.Arg("groupingId") groupingId: number,
		@GQL.Arg("groupCount") groupCount: number,
	) {

		let groups = new Groups()
		groups.groupingId = groupingId
		groups.groupCount = groupCount

		await groups.save()
		return groups
	}
}