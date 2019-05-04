import * as GQL from "type-graphql"
import GymUserMode from "@plugins/gymkonnect/model/gymUserMode"

@GQL.Resolver(of => GymUserMode)
export default class GymUserModeResolver {

	@GQL.Query(returns => [GymUserMode,])
	public async gymUserModes() {
		return GymUserMode.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymUserMode)
	public async addGymUserMode(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let gymUserMode = new GymUserMode()
		gymUserMode.name = name
		gymUserMode.description = description

		await gymUserMode.save()
		return gymUserMode
	}
}
