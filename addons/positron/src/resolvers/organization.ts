import * as GQL from "type-graphql"
import Organization from "@positron/models/organization"

@GQL.Resolver(of => Organization)
export default class OrganizationResolver {
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