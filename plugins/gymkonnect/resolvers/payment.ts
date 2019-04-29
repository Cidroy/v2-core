import * as GQL from "type-graphql"
import Payments from "@plugins/gymkonnect/model/payments"
import User from "@plugins/core/model/user"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`payment/gql-resolver`)
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
		@GQL.Arg("description", { nullable: true }) description: string,
		@GQL.Arg("note", { nullable: true }) note: string,
		@GQL.Arg("serviceType", { nullable: true }) serviceType: string,
		@GQL.Arg("taxAmount", { nullable: true }) taxAmount: number,
		@GQL.Arg("taxType", { nullable: true }) taxType: number,
	) {
		let payment = new Payments()
		payment.mode = mode
		payment.receipt = receipt
		payment.amount = amount
		payment.description = description
		payment.note = note
		payment.serviceType = serviceType
		payment.taxAmount = taxAmount
		payment.taxType = taxType
		if(transactionId) payment.transacionId = transactionId
		payment.adjustment = adjustment

		await payment.save()
		return payment
	}

	@GQL.Mutation(returns => Boolean)
	public async linkPaymentUser(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("paymentId") paymentId: number,
	) {
		try {
			let user = await User.findOne({ where: { id: userId } })
			if(!user) throw "Invalid User"

			let payment = await Payments.findOne({ where: { id: paymentId } })
			if(!payment) throw "Invalid Payment"

			payment.userId = user.id

			await payment.save()
			return true
		} catch (error) {
			return false
		}
	}
}