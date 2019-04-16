import * as GQL from "type-graphql"
import TaxRules from "@positron/models/taxRules"
import { TAX_TYPE, SERVICE_TYPE } from "@classes/enum/misc"

@GQL.Resolver(of => TaxRules)
export default class TaxRulesResolver {

	@GQL.Query(returns => [TaxRules,])
	public async taxRules() {
		return TaxRules.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => TaxRules)
	public async addTaxRules(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
		@GQL.Arg("taxType", type => TAX_TYPE) taxType: TAX_TYPE,
		@GQL.Arg("magnitude") magnitude: number,
		@GQL.Arg("serviceType", type => SERVICE_TYPE) serviceType: SERVICE_TYPE,
		@GQL.Arg("isInclusive", { nullable: true }) isInclusive: boolean,
		@GQL.Arg("showExplicitly", { nullable: true }) showExplicitly: boolean,

	) {
		
		let taxRules = new TaxRules()
		taxRules.name = name
		description && (taxRules.description = description)
		taxRules.taxType = taxType
		taxRules.magnitude = magnitude
		taxRules.serviceType = serviceType
		isInclusive && (taxRules.isInclusive = isInclusive)
		showExplicitly && (taxRules.showExplicitly = showExplicitly)

		await taxRules.save()
		return taxRules
	}
}