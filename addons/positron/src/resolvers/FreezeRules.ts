import * as GQL from "type-graphql"
import GymFreezeRules from "@positron/models/freezeRules"

@GQL.Resolver(of => GymFreezeRules)
export default class FreezeRulesResolver{
	@GQL.Mutation(returns => GymFreezeRules)
	public async addFreezeRules(
		@GQL.Arg("packages") packages : string,
		@GQL.Arg("count") count : number,
		@GQL.Arg("minDays") minDays : number,
		@GQL.Arg("maxDays") maxDays : number
	){
		let gymFreezeRules = new GymFreezeRules()
		gymFreezeRules.packages = packages
		gymFreezeRules.count = count
		gymFreezeRules.minDays = minDays
		gymFreezeRules.maxDays = maxDays

		await gymFreezeRules.save()
		return gymFreezeRules
	}
}
