import * as GQL from "type-graphql"
import GymFreezeRules from "@positron/models/freezeRules"

@GQL.Resolver(of => GymFreezeRules)
export default class FreezeRulesResolver{
	
	@GQL.Query(returns => [GymFreezeRules,])
	public async gymFreezeRules() {
		return GymFreezeRules.find()
	}

	@GQL.Mutation(returns => GymFreezeRules)
	public async addFreezeRules(
		@GQL.Arg("packages") packages : number,
		@GQL.Arg("category") category : number,
		@GQL.Arg("grouping") grouping : number,
		@GQL.Arg("programme") programme : number,
		@GQL.Arg("count") count : number,
		@GQL.Arg("minDays") minDays : number,
		@GQL.Arg("maxDays") maxDays : number
	){
		let gymFreezeRules = new GymFreezeRules()
		gymFreezeRules.packages = packages
		gymFreezeRules.category = category
		gymFreezeRules.grouping = grouping
		gymFreezeRules.programme = programme
		gymFreezeRules.count = count
		gymFreezeRules.minDays = minDays
		gymFreezeRules.maxDays = maxDays

		await gymFreezeRules.save()
		return gymFreezeRules
	}
}
