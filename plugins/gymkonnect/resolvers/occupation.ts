import * as GQL from "type-graphql"
import Occupation from "@plugins/gymkonnect/model/occupation"

@GQL.Resolver(of => Occupation)
export default class OccupationResolver {

	@GQL.Query(returns => [Occupation,])
	public async occupations() {
		return Occupation.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Occupation)
	public async addOccupation(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let occupation = new Occupation()
		occupation.name = name
		occupation.description = description

		await occupation.save()
		return occupation
	}
}
