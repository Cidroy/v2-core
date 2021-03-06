import * as GQL from "type-graphql"
import Organization from "@plugins/gymkonnect/model/organization"

@GQL.Resolver(of => Organization)
export default class OrganizationResolver {

	@GQL.Query(returns => [Organization,])
	public async organizations() {
		return Organization.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Organization)
	public async addOrganization(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let organization = new Organization()
		organization.name = name
		organization.description = description

		await organization.save()
		return organization
	}
}
