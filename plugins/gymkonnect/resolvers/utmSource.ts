import * as GQL from "type-graphql"
import UTMSource from "@plugins/gymkonnect/model/utmSource"

@GQL.Resolver(of => UTMSource)
export default class UTMSourceResolver {

	@GQL.Query(returns => [UTMSource,])
	public async utmSources() {
		return UTMSource.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => UTMSource)
	public async addUTMSource(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let utmSource = new UTMSource()
		utmSource.name = name
		utmSource.description = description

		await utmSource.save()
		return utmSource
	}
}