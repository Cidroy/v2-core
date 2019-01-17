import * as GQL from "type-graphql"
import Transaction from "@positron/models/transaction"

@GQL.Resolver(of => Transaction)
export default class TransactionResolver{
	@GQL.Mutation(returns => Transaction)
	public async addTransaction(
		@GQL.Arg("user") user : string,
		@GQL.Arg("payment") payment: string,
		@GQL.Arg("start", { nullable: true }) start? : Date,
		@GQL.Arg("end", { nullable: true }) end ?: Date,
		@GQL.Arg("endExtendedDate", { nullable: true }) endExtendedDate? : Date,
		
	){
		let transaction = new Transaction()
		transaction.user = user
		transaction.payment = payment
		if(!start)transaction.start = new Date()
		else transaction.start = start
		if (!end) transaction.end = new Date()
		else transaction.end = end
		if (!endExtendedDate) transaction.endExtendedDate = new Date()
		else transaction.endExtendedDate = endExtendedDate
		
		await transaction.save()
		return transaction
	}
}
