import * as GQL from "type-graphql"
import MembershipType from "@positron/models/membershipType"

@GQL.Resolver(of => MembershipType)
export default class MembershipTypeResolver {

	@GQL.Query(returns => [MembershipType,])
	public async membershipTypes() {
		return MembershipType.find()
	}

	@GQL.Mutation(returns => MembershipType)
	public async addMembershipType(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let membershipType = new MembershipType()
		membershipType.name = name
		membershipType.description = description

		await membershipType.save()
		return membershipType
	}
}