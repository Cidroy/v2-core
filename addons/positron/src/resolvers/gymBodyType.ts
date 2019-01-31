import * as GQL from "type-graphql"
import GymBodyType from "@positron/models/gymBodyType"

@GQL.Resolver(of => GymBodyType)
export default class GymBodyTypeResolver {

	@GQL.Query(returns => [GymBodyType,])
	public async gymBodyTypes() {
		return GymBodyType.find()
	}

	@GQL.Mutation(returns => GymBodyType)
	public async addGymBodyType(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let gymBodyType = new GymBodyType()
		gymBodyType.name = name
		gymBodyType.description = description

		await gymBodyType.save()
		return gymBodyType
	}
}