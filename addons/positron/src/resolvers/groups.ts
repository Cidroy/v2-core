import * as GQL from "type-graphql"
import Groups from "@positron/models/groups"

@GQL.Resolver(of => Groups)
export default class GroupsResolver {

	@GQL.Query(returns => [Groups,])
	public async Groups() {
		return Groups.find()
	}

	@GQL.Mutation(returns => Groups)
	public async addGroups(
		@GQL.Arg("groupingId") groupingId: number,
		@GQL.Arg("groupCount") groupCount: number,
		@GQL.Arg("groupName") groupName: string,
	) {
		
		let groups = new Groups()
		groups.groupingId = groupingId
		groups.groupName = groupName
		groups.groupCount = groupCount

		await groups.save()
		return groups
	}
}