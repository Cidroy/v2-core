import * as GQL from "type-graphql"
import CounsellorType from "@plugins/gymkonnect/model/counsellorType"

@GQL.Resolver(of => CounsellorType)
export default class CounsellorTypeResolver {

	@GQL.Query(returns => [CounsellorType,])
	public async counsellorTypes() {
		return CounsellorType.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => CounsellorType)
	public async addCounsellorType(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let counsellorType = new CounsellorType()
		counsellorType.name = name
		counsellorType.description = description

		await counsellorType.save()
		return counsellorType
	}
}
