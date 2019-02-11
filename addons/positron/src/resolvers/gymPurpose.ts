import * as GQL from "type-graphql"
import GymPurpose from "@positron/models/gymPurpose"

@GQL.Resolver(of => GymPurpose)
export default class GymPurposeResolver {

	@GQL.Query(returns => [GymPurpose,])
	public async gymPurposes() {
		return GymPurpose.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymPurpose)
	public async addGymPurpose(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let gymPurpose = new GymPurpose()
		gymPurpose.name = name
		gymPurpose.description = description

		await gymPurpose.save()
		return gymPurpose
	}
}