import * as GQL from "type-graphql"
import TrainerType from "@positron/models/trainerType"

@GQL.Resolver(of => TrainerType)
export default class TrainerTypeResolver {

	@GQL.Query(returns => [TrainerType,])
	public async trainerTypes() {
		return TrainerType.find()
	}
	
	@GQL.Mutation(returns => TrainerType)
	public async addTrainerType(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let trainerType = new TrainerType()
		trainerType.name = name
		trainerType.description = description

		await trainerType.save()
		return trainerType
	}
}