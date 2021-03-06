import * as GQL from "type-graphql"
import GymFreezeRules from "@plugins/gymkonnect/model/freezeRules"

@GQL.Resolver(of => GymFreezeRules)
export default class FreezeRulesResolver{

	@GQL.Query(returns => [GymFreezeRules,])
	public async gymFreezeRules() {
		return GymFreezeRules.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymFreezeRules)
	public async addFreezeRules(
		@GQL.Arg("packages") packages : number,
		@GQL.Arg("category") category : number,
		@GQL.Arg("grouping", { nullable: true }) grouping : number,
		@GQL.Arg("programme", { nullable: true }) programme : number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType : number,
		@GQL.Arg("count", { nullable: true }) count : number,
		@GQL.Arg("minDays") minDays : number,
		@GQL.Arg("maxDays") maxDays : number
	){
		let gymFreezeRules = new GymFreezeRules()
		gymFreezeRules.packages = packages
		gymFreezeRules.category = category
		gymFreezeRules.programme = programme
		count && (gymFreezeRules.count = count)
		membershipType && (gymFreezeRules.membershipType = membershipType)
		grouping && (gymFreezeRules.grouping = grouping)
		gymFreezeRules.minDays = minDays
		gymFreezeRules.maxDays = maxDays

		await gymFreezeRules.save()
		return gymFreezeRules
	}
}
