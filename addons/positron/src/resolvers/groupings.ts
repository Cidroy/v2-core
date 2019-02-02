import * as GQL from "type-graphql"
import Groupings from "@positron/models/groupings"

@GQL.Resolver(of => Groupings)
export default class GroupingsResolver {

	@GQL.Query(returns => [Groupings,])
	public async groupings() {
		return Groupings.find()
	}

	@GQL.Mutation(returns => Groupings)
	public async addGroupings(
		@GQL.Arg("name") name: string,
		@GQL.Arg("defaultCount") defaultCount: number,
		@GQL.Arg("minCount") minCount: number,
		@GQL.Arg("maxCount") maxCount: number,
		
	) {
		let groupings = new Groupings()
		groupings.name = name
		groupings.defaultCount = defaultCount
		groupings.minCount = minCount
		groupings.maxCount = maxCount
		
		await groupings.save()
		return groupings
	}
}