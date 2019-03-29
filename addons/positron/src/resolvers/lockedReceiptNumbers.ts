import * as GQL from "type-graphql"
import LockedReceiptNumbers from "@positron/models/lockedReceiptNumbers"

@GQL.Resolver(of => LockedReceiptNumbers)
export default class LockedReceiptNumbersResolver {

	@GQL.Query(returns => Boolean)
	public async lockedReceiptNumbers(
		@GQL.Arg("receiptNumber") receiptNumber: number
	) {
		let result = LockedReceiptNumbers.find({ where: { receiptNumber: receiptNumber } })
		return result !== undefined
	}
	@GQL.Mutation(returns => Boolean)
	public async removeLockedReceiptNumbers(
		@GQL.Arg("receiptNumber") receiptNumber: number,
	) {
		try {
			let lockedReceiptNumber = await LockedReceiptNumbers.findOne({ where: { receiptNumber: receiptNumber } })
			if (lockedReceiptNumber === undefined) throw "no such receiptNumber exists"
			lockedReceiptNumber.remove()
			return true
		} catch(error) {
			throw error
		}
	}
	@GQL.Mutation(returns => LockedReceiptNumbers)
	public async addLockedReceiptNumber(
		@GQL.Arg("receiptNumber") receiptNumber: number,
	) {
		let lockedReceiptNumber = new LockedReceiptNumbers()
		lockedReceiptNumber.receiptNumber = receiptNumber

		await lockedReceiptNumber.save()
		return lockedReceiptNumber
	}
}