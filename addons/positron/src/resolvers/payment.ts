import * as GQL from "type-graphql"
import Payments from "@positron/models/payments"

@GQL.Resolver(of => Payments)
export default class PaymentsResolver {

	@GQL.Query(returns => [Payments,])
	public async payments() {
		return Payments.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Payments)
	public async addPayment(
		@GQL.Arg("mode") mode: number,
		@GQL.Arg("receipt") receipt: string,
		@GQL.Arg("transactionId",{nullable: true}) transactionId: number,
		@GQL.Arg("amount") amount: number,
		@GQL.Arg("adjustment") adjustment: number,
	) {
		let payment = new Payments()
		payment.mode = mode
		payment.receipt = receipt
		payment.amount = amount
		if(transactionId) payment.transacionId = transactionId
		payment.adjustment = adjustment

		await payment.save()
		return payment
	}
}