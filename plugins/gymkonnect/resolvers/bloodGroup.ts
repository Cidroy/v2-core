import * as GQL from "type-graphql"
import BloodGroup from "@plugins/gymkonnect/model/bloodGroup"

@GQL.Resolver(of => BloodGroup)
export default class BloodGroupResolver {

	@GQL.Query(returns => [BloodGroup,])
	public async bloodGroups() {
		return BloodGroup.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => BloodGroup)
	public async addBloodGroup(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let bloodGroup = new BloodGroup()
		bloodGroup.name = name
		bloodGroup.description = description

		await bloodGroup.save()
		return bloodGroup
	}
}