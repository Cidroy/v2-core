import * as GQL from "type-graphql"
import PaymentMode from "@positron/models/paymentMode"

@GQL.Resolver(of => PaymentMode)
export default class PaymentModeResolver {

	@GQL.Query(returns => [PaymentMode,])
	public async paymentModes() {
		return PaymentMode.find({ where: { active: 1 } })
	}
	
	@GQL.Mutation(returns => PaymentMode)
	public async addPaymentMode(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
	) {
		let paymentMode = new PaymentMode()
		paymentMode.name = name
		paymentMode.description = description

		await paymentMode.save()
		return paymentMode
	}
}