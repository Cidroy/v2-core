import * as GQL from "type-graphql"
import Amenities from "@plugins/gymkonnect/model/amenities"
import ServicesAvailable from "@plugins/gymkonnect/model/servicesAvailable"
import { SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

@GQL.Resolver(of => Amenities)
export default class AmenitiesResolver {

	@GQL.Query(returns => [Amenities,])
	public async amenities(
		@GQL.Arg("service", type => SERVICE_TYPE, { nullable: true }) service: SERVICE_TYPE,
	) {
		if (service) {
			let serviceType = await ServicesAvailable.findOne({ where: { active: 1, name: service } })
			if (serviceType === undefined) throw "service unavailable"
			return Amenities.find({ where: { active: 1, serviceType: serviceType.id } })
		} else {
			return Amenities.find({ where: { active: 1 } })
		}
	}

	@GQL.Mutation(returns => Amenities)
	public async addAmenities(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
		@GQL.Arg("serviceType") serviceType: number,
	) {
		let amenities = new Amenities()
		amenities.name = name
		amenities.description = description
		amenities.serviceType = serviceType

		await amenities.save()
		return amenities
	}
}
