import * as GQL from "type-graphql"
import Amenities from "@positron/models/amenities"
import ServicesAvailable from "@positron/models/servicesAvailable"

@GQL.Resolver(of => Amenities)
export default class AmenitiesResolver {

	@GQL.Query(returns => [Amenities,])
	public async amenities(
		@GQL.Arg("service", { nullable: true }) service: string,
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