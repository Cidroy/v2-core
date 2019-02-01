import * as GQL from "type-graphql"
import CounsellorType from "@positron/models/counsellorType"

@GQL.Resolver(of => CounsellorType)
export default class CounsellorTypeResolver {

	@GQL.Query(returns => [CounsellorType,])
	public async counsellorTypes() {
		return CounsellorType.find()
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