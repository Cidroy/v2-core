import * as GQL from "type-graphql"
import Transaction from "@positron/models/transaction"

@GQL.Resolver(of => Transaction)
export default class TransactionResolver{

	@GQL.Query(returns => [Transaction,])
	public async transactions() {
		return Transaction.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Transaction)
	public async addTransaction(
		@GQL.Arg("gymUser") gymUser : number,
		@GQL.Arg("payment") payment: number,
		@GQL.Arg("start", { nullable: true }) start? : Date,
		@GQL.Arg("end", { nullable: true }) end ?: Date,
		@GQL.Arg("endExtendedDate", { nullable: true }) endExtendedDate? : Date,
		
	){
		let transaction = new Transaction()
		transaction.gymUser = gymUser
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
