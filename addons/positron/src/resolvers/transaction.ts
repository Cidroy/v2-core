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
		@GQL.Arg("packages") packages: number,
		@GQL.Arg("packageMagnitude") packageMagnitude: number,
		@GQL.Arg("start") start: Date,
		@GQL.Arg("gymUser", { nullable: true }) gymUser? : number,
		@GQL.Arg("offer", { nullable: true }) offer? : number,
		@GQL.Arg("addon", type => [Number,], { nullable: true, }) addon? : number[],
		@GQL.Arg("payment", {nullable:true}) payment?: number,
		@GQL.Arg("membershipType", {nullable:true}) membershipType?: number,
		@GQL.Arg("programme", type => [Number,], {nullable:true}) programme?: number[],
		@GQL.Arg("purpose", type => [Number,], {nullable:true}) purpose?: number[],
	){
		let transaction = new Transaction()
		transaction.packages = packages
		transaction.packageMagnitude = packageMagnitude
		if(!start)transaction.start = new Date()
		else transaction.start = start
		if(offer)transaction.offer = offer
		if(gymUser)transaction.gymUser = gymUser
		if(payment)transaction.payment = payment
		if(membershipType)transaction.membershipType = membershipType
		if(addon) transaction.addon = addon
		if(programme) transaction.programme = programme
		if(purpose) transaction.purpose = purpose
		// FIXME:
		transaction.end = start
		transaction.endExtendedDate = start
		await transaction.save()
		return transaction
	}
}
