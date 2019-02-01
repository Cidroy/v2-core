import * as GQL from "type-graphql"
import GymPackage from "@positron/models/gymPackage"

@GQL.Resolver(of => GymPackage)
export default class GymPackageResolver {

	@GQL.Query(returns => [GymPackage,])
	public async gymPackages() {
		return GymPackage.find()
	}
	
	@GQL.Mutation(returns => GymPackage)
	public async addGymPackage(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let gymPackage = new GymPackage()
		gymPackage.name = name
		gymPackage.description = description

		await gymPackage.save()
		return gymPackage
	}
}