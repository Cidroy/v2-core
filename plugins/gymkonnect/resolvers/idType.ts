import * as GQL from "type-graphql"
import IDType from "@plugins/gymkonnect/model/idType"

@GQL.Resolver(of => IDType)
export default class IDTypeResolver {

	@GQL.Query(returns => [IDType,])
	public async IDTypes() {
		return IDType.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => IDType)
	public async addIDType(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let idType = new IDType()
		idType.name = name
		idType.description = description

		await idType.save()
		return idType
	}
}