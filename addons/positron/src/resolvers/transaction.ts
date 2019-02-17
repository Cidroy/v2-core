import * as GQL from "type-graphql"
import Transaction from "@positron/models/transaction"
import Payment from "@positron/models/payments"
import * as DB from "typeorm"
import GymUsers from "@positron/models/gymUsers"

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

	@GQL.Mutation(returns => String)
	public async linkTransactionPay(
		@GQL.Arg("paymentId") paymentId: number,
		@GQL.Arg("transactionId") transactionId: number,
	){
		try{
			let payment = await Payment.createQueryBuilder()
				.select(["id", "receipt", "amount",])
				.where({ id: paymentId })
				.execute()
			console.log(payment)
			if(payment===undefined) throw "Invalid Payment"

			let transaction = await Transaction.createQueryBuilder()
								.update(Transaction)
				.set({ amount: payment[0].amount, receipt: payment[0].receipt  })
				.where({id: transactionId})
				.execute()
			if (transaction === undefined) throw "Invalid trsancation"
		}catch(error){
			throw "Linking Transaction to pay error"
		}
	}
	@GQL.Mutation(returns => Boolean)
	public async linkTransactionGymUser(
		@GQL.Arg("gymUserId") gymUserId: number,
		@GQL.Arg("transactionId") transactionId: number,
	){
		try{
			
			let transaction = await Transaction.createQueryBuilder()
								.update(Transaction)
								.set({ gymUser: gymUserId })
								.where({id: transactionId})
								.execute()
			if (transaction === undefined) throw "Invalid trsancation"

			let gymUser = await GymUsers.createQueryBuilder()
				.update(GymUsers)
				.set({ transaction: transactionId })
				.where({ id: gymUserId})
				.execute()
			if (gymUser === undefined) throw "Invalid Gym User"
			return true
		}catch(error){
			return false
			
		}
	}
}
