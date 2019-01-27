import * as GQL from "type-graphql"
import PriceList from "@positron/models/priceList"

@GQL.Resolver(of => PriceList)
export default class PriceListResolver {
	@GQL.Mutation(returns => PriceList)
	public async addPrice(
		@GQL.Arg("typeName") typeName: string,
		@GQL.Arg("typeId") typeId: string,
		@GQL.Arg("organization") organization: string,
		@GQL.Arg("price") price: number,
	) {
		let priceList = new PriceList()
		priceList.typeName = typeName
		priceList.typeId = typeId
		priceList.organization = organization
		priceList.price = price

		await priceList.save()
		return priceList
	}
}