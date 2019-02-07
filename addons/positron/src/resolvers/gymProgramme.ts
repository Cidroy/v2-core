import * as GQL from "type-graphql"
import GymProgramme from "@positron/models/gymProgramme"

@GQL.Resolver(of => GymProgramme)
export default class GymProgrammeResolver {

	@GQL.Query(returns => [GymProgramme,])
	public async gymProgrammes() {
		return GymProgramme.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymProgramme)
	public async addGymProgramme(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let gymProgramme = new GymProgramme()
		gymProgramme.name = name
		gymProgramme.description = description

		await gymProgramme.save()
		return gymProgramme
	}
}