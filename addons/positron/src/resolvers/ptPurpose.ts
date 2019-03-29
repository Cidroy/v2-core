import * as GQL from "type-graphql"
import PTPurpose from "@positron/models/ptPurpose"

@GQL.Resolver(of => PTPurpose)
export default class PTPurposeResolver {

	@GQL.Query(returns => [PTPurpose,])
	public async ptPurposes() {
		return PTPurpose.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => PTPurpose)
	public async addPTPurpose(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let ptPurpose = new PTPurpose()
		ptPurpose.name = name
		ptPurpose.description = description

		await ptPurpose.save()
		return ptPurpose
	}
}