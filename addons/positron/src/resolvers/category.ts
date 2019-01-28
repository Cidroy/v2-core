import * as GQL from "type-graphql"
import Category from "@positron/models/category"

@GQL.Resolver(of => Category)
export default class CategoryResolver {
	@GQL.Mutation(returns => Category)
	public async addCategory(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let category = new Category()
		category.name = name
		category.description = description

		await category.save()
		return category
	}
}