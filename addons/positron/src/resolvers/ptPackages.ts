import * as GQL from "type-graphql"
import PTPackages from "@positron/models/ptPackages"

@GQL.Resolver(of => PTPackages)
export default class PTPackagesResolver {

	@GQL.Query(returns => [PTPackages,])
	public async ptPackages() {
		return PTPackages.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => PTPackages)
	public async addPTPackages(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let ptPackages = new PTPackages()
		ptPackages.name = name
		ptPackages.description = description

		await ptPackages.save()
		return ptPackages
	}
}