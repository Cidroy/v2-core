import * as GQL from "type-graphql"
import PaymentMode from "@plugins/gymkonnect/model/paymentMode"

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
		@GQL.Arg("requireTransactionId", {nullable :true}) requireTransactionId: boolean,
	) {
		let paymentMode = new PaymentMode()
		paymentMode.name = name
		if(description)paymentMode.description = description
		if(requireTransactionId)paymentMode.requireTransactionId = requireTransactionId

		await paymentMode.save()
		return paymentMode
	}
}