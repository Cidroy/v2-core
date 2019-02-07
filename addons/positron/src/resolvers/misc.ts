import * as GQL from "type-graphql"
import * as DB from "typeorm"

@GQL.Resolver()
export default class miscResolver {

	@GQL.Query(returns =>Boolean)
	public async isBadgenumberValid(
		@GQL.Arg("badgenumber") badgenumber: string,
	) {
		try{
			const user = await DB.getConnectionManager.query("")
			return true
		}
		catch(error){
			console.log(error)
			return false
		}
	}

	// @GQL.Mutation(returns => )
	// public async addCategory(
	// 	@GQL.Arg("name") name: string,
	// 	@GQL.Arg("description", { nullable: true }) description: string,
	// ) {
	// 	let category = new Category()
	// 	category.name = name
	// 	category.description = description

	// 	await category.save()
	// 	return category
	// }
}