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
		@GQL.Arg("reciept") reciept: string,
		@GQL.Arg("transactionId",{nullable: true}) transactionId: string,
		@GQL.Arg("amount") amount: number,
		@GQL.Arg("adjustment") adjustment: number,
	) {
		let payment = new Payments()
		payment.mode = mode
		payment.reciept = reciept
		payment.amount = amount
		if(transactionId) payment.transacionId = transactionId
		payment.adjustment = adjustment

		await payment.save()
		return payment
	}
}