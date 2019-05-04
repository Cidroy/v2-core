import * as GQL from "type-graphql"
import ServicesAvailable from "@plugins/gymkonnect/model/servicesAvailable"
import { SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

@GQL.Resolver(of => ServicesAvailable)
export default class ServicesAvailableResolver {

	@GQL.Query(returns => [ServicesAvailable,])
	public async servicesAvailable() {
		return ServicesAvailable.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => ServicesAvailable)
	public async addServices(
		@GQL.Arg("name", type => SERVICE_TYPE) name: SERVICE_TYPE,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let servicesAvailable = new ServicesAvailable()
		servicesAvailable.name = name
		servicesAvailable.description = description

		await servicesAvailable.save()
		return servicesAvailable
	}
}
