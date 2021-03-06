import * as GQL from "type-graphql"
import GymPackage from "@plugins/gymkonnect/model/gymPackage"
import { DURATION } from "@plugins/gymkonnect/enum/misc"

@GQL.Resolver(of => GymPackage)
export default class GymPackageResolver {

	@GQL.Query(returns => [GymPackage,])
	public async gymPackages() {
		return GymPackage.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymPackage)
	public async addGymPackage(
		@GQL.Arg("name") name: string,
		@GQL.Arg("count") count: number,
		@GQL.Arg("duration", type => DURATION) duration: DURATION,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let gymPackage = new GymPackage()
		gymPackage.name = name
		gymPackage.count = count
		gymPackage.duration = duration
		gymPackage.description = description

		await gymPackage.save()
		return gymPackage
	}
}
