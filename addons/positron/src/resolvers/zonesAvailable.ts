import * as GQL from "type-graphql"
import ZonesAvailable from "@positron/models/zonesAvailable"

@GQL.Resolver(of => ZonesAvailable)
export default class ZonesAvailableResolver {

	@GQL.Query(returns => [ZonesAvailable,])
	public async zonesAvailable() {
		return ZonesAvailable.find({ where: { active: 1 } })
	}
	
	@GQL.Mutation(returns => ZonesAvailable)
	public async addZonesAvailable(
		
		@GQL.Arg("name") name: string,
		@GQL.Arg("zoneName") zoneName: string,
		@GQL.Arg("zoneId") zoneId: number,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let zonesAvailable = new ZonesAvailable()
		zonesAvailable.name = name
		zonesAvailable.zoneName = zoneName
		zonesAvailable.zoneId = zoneId
		zonesAvailable.description = description

		await zonesAvailable.save()
		return zonesAvailable
	}
}