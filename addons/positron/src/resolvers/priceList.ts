import * as GQL from "type-graphql"
import PriceList from "@positron/models/priceList"

@GQL.Resolver(of => PriceList)
export default class PriceListResolver {

	@GQL.Query(returns => [PriceList,])
	public async priceList() {
		return PriceList.find()
	}
	
	@GQL.Mutation(returns => PriceList)
	public async addPrice(
		@GQL.Arg("typeName") typeName: string,
		@GQL.Arg("typeId") typeId: number,
		@GQL.Arg("organization") organization: number,
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