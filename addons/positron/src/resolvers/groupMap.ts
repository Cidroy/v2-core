import * as GQL from "type-graphql"
import GroupMap from "@positron/models/groupMap"

@GQL.Resolver(of => GroupMap)
export default class GroupMapResolver {

	@GQL.Query(returns => [GroupMap,])
	public async groupMaps() {
		return GroupMap.find({ where: { active: 1 } })
	}
	
	@GQL.Mutation(returns => GroupMap)
	public async addGroupMap(
		@GQL.Arg("groupId") groupId: number,
		@GQL.Arg("gymUserId") gymUserId: number,
	) {
		let groupMap = new GroupMap()
		groupMap.groupId = groupId
		groupMap.gymUserId = gymUserId

		await groupMap.save()
		return groupMap
	}
}