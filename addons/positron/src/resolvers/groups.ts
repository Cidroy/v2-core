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
	@GQL.Mutation(returns => [GroupMap,])
	public async createGroupGymUsers(
		@GQL.Arg("groupingId") groupingId: number,
		@GQL.Arg("gymUserIDs", type => [Number,]) gymUserIDs: number[],
	) {
		let group = new Groups()
		group.groupingId = groupingId
		group.groupCount = gymUserIDs.length
		await group.save()

		let groupMaps: GroupMap[] = []
		console.log("before for each")
		let i
		for(i in gymUserIDs){
			let gymUser = await GymUsers.createQueryBuilder()
				.update(GymUsers)
				.set({ isGrouped: true })
				.where({ id: gymUserIDs[i] })
				.execute()
			if (gymUser === undefined) throw "Invalid user"
			let groupMap = new GroupMap()
			groupMap.gymUserId = gymUserIDs[i]
			groupMap.groupId = group.id
			await groupMap.save()
			
			groupMaps.push(groupMap)
		}
		// FIXME:
		console.log("after for each")
		return groupMaps
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