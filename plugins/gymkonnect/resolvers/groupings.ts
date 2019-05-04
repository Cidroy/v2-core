import * as GQL from "type-graphql"
import Groupings from "@plugins/gymkonnect/model/groupings"
import ServicesAvailable from "@plugins/gymkonnect/model/servicesAvailable"
import { SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

@GQL.Resolver(of => Groupings)
export default class GroupingsResolver {

	@GQL.Query(returns => [Groupings,])
	public async groupings(
		@GQL.Arg("service", type => SERVICE_TYPE, { nullable: true }) service: SERVICE_TYPE,
	) {
		if(service){
			let serviceType = await ServicesAvailable.findOne({ where: { active: 1, name: service  } })
			if (serviceType === undefined) throw "service unavailable"
			return Groupings.find({ where: { active: 1, serviceType: serviceType.id } })
		} else{
			return Groupings.find({ where: { active: 1 } })
		}
	}

	@GQL.Mutation(returns => Groupings)
	public async addGroupings(
		@GQL.Arg("name") name: string,
		@GQL.Arg("defaultCount") defaultCount: number,
		@GQL.Arg("minCount") minCount: number,
		@GQL.Arg("maxCount") maxCount: number,
		@GQL.Arg("serviceType") serviceType: number,

	) {
		let groupings = new Groupings()
		groupings.name = name
		groupings.defaultCount = defaultCount
		groupings.minCount = minCount
		groupings.maxCount = maxCount
		groupings.serviceType = serviceType

		await groupings.save()
		return groupings
	}
}
