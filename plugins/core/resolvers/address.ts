import * as GQL from "type-graphql"
import Address from "@plugins/core/model/address"
import { ADDRESS_TYPE } from "@plugins/core/enum/misc"

@GQL.Resolver(of => Address)
export default class AddressResolver {

	@GQL.Query(returns => [Address,])
	public async addresses() {
		return Address.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Address)
	public async addAddress(
		@GQL.Arg("receiver") receiver: string,
		@GQL.Arg("contact") contact: string,
		@GQL.Arg("house") house: string,
		@GQL.Arg("city") city: string,
		@GQL.Arg("state") state: string,
		@GQL.Arg("country") country: string,
		@GQL.Arg("pincode") pincode: string,
		@GQL.Arg("type", type => ADDRESS_TYPE) type: ADDRESS_TYPE,
		@GQL.Arg("user", { nullable: true }) user: number,
		@GQL.Arg("locality", { nullable: true }) locality: string,
		@GQL.Arg("landmark", { nullable: true }) landmark: string,
	) {
		let address = new Address()
		address.receiver = receiver
		address.contact = contact
		address.house = house
		address.city = city
		address.state = state
		address.country = country
		address.pincode = pincode
		address.type = type
		if(user)address.user = user
		address.locality = locality
		address.landmark = landmark

		await address.save()
		return address
	}
}