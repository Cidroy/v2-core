import * as GQL from "type-graphql"
import * as DB from "typeorm"
import Transaction from "@positron/models/transaction"
import Payment from "@positron/models/payments"
import GymUsers from "@positron/models/gymUsers"
import GymUserMode from "@positron/models/gymUserMode"
import GymPackage from "@positron/models/gymPackage"
import moment from "moment"
import MembershipType from "@positron/models/membershipType"
import { Logger } from "@classes/CONSOLE"
import Freezes from "@positron/models/freezes"
import { FreezeAvailability } from "./freezes"
import User from "@positron/models/user"
import GymFreezeRules from "@positron/models/freezeRules"

const Console = new Logger(`gql-resolver/transaction`)
@GQL.Resolver(of => Transaction)
export default class TransactionResolver{

	@GQL.Query(returns => [Transaction,])
	public async transactions() {
		return Transaction.find({ where: { active: 1 } })
	}
	@GQL.FieldResolver(returns => MembershipType, { nullable: true })
	public async membership(@GQL.Root() transaction: Transaction) {
		return MembershipType.findOne({ where: { active: 1, id: transaction.membershipType } })
	}
	@GQL.FieldResolver(returns => GymPackage, { nullable: true })
	public async packagesType(@GQL.Root() transaction: Transaction) {
		return GymPackage.findOne({ where: { active: 1, id: transaction.packages } })
	}

	@GQL.FieldResolver(returns => GymUsers, { nullable: true })
	public async gymUser(@GQL.Root() transaction: Transaction) {
		return GymUsers.findOne({ where: { active: 1, id: transaction.gymUser } })
	}

	@GQL.FieldResolver(returns => FreezeAvailability, { nullable: true })
	public async freezeAvailability(@GQL.Root() transaction: Transaction) {
		//FIXME: Nikhil [ad freezerule.prograamme = transaction.progrmame]
		const user = await Transaction.createQueryBuilder("transaction")
			.innerJoinAndSelect(GymUsers, "gymUser", "gymUser.transaction = transaction.id")
			.innerJoinAndSelect(User, "user", "user.id = gymUser.userid")
			.innerJoinAndSelect(GymFreezeRules, "freezeRules", "freezeRules.packages = transaction.packages and freezeRules.membershipType = transaction.membershipType and  freezeRules.category = user.category")
			.select(["if(freezeRules.count is null, if(freezeRules.count is null, (freezeRules.maxDays - isnull(`transaction`.`freezeDays`)) , (freezeRules.count*freezeRules.maxDays - isnull(`transaction`.`freezeDays`))), (freezeRules.count - transaction.freezeCount)) as freezeCountAvailable",
				"if(freezeRules.count is null, (freezeRules.maxDays - isnull(`transaction`.`freezeDays`)) , (freezeRules.count*freezeRules.maxDays - isnull(`transaction`.`freezeDays`))) as freezeDaysAvailable",])
			.groupBy("transaction.id")
			.where({ id: transaction.id })
			.execute()
		return user[0]
	}

	@GQL.Query(returns => [Transaction,])
	public async renewals(
		@GQL.Arg("from", { nullable: true }) from?: string,
		@GQL.Arg("to", { nullable: true }) to?: string,
	) {
		return Transaction.find({
			start: DB.Between(from, to ? to : new Date().toJSON().slice(0, 10).replace(/-/g, "/"))
		})
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
		transaction.offer = ~<number>offer && offer || undefined
		if(gymUser)transaction.gymUser = gymUser
		if(payment)transaction.payment = payment
		if(membershipType)transaction.membershipType = membershipType
		if(addon) transaction.addon = addon
		if(programme) transaction.programme = programme
		if(purpose) transaction.purpose = purpose
		if(start && packages && packageMagnitude)transaction.end = await this.getDueDate(packages, packageMagnitude, start)
		if(start && packages && packageMagnitude)transaction.endExtendedDate = transaction.end
		await transaction.save()
		return transaction
	}

	@GQL.Mutation(returns => Boolean)
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
				.set({ amount: payment[0].amount, receipt: payment[0].receipt, payment: paymentId })
				.where({id: transactionId})
				.execute()
			if (transaction === undefined) throw "Invalid trsancation"
			return true
		}catch(error){
			return false
		}
	}
	@GQL.Mutation(returns => Boolean)
	public async linkTransactionUser(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("transactionId") transactionId: number,
	){
		try{
			let gymuser = await GymUsers.find({ where: { userId: userId } })
			if (gymuser.length == 0) throw "Invalid user"
			let gymUserId = gymuser[0].id

			let transaction = await Transaction.createQueryBuilder()
								.update(Transaction)
								.set({ gymUser: gymUserId })
								.where({id: transactionId})
								.execute()
			if (transaction === undefined) throw "Invalid trsancation"

			let userMode = await GymUserMode.find({ where: { name: "PREBOOK" } })
			let gymUser = await GymUsers.createQueryBuilder()
				.update(GymUsers)
				.set({ transaction: transactionId, mode: userMode[0].id})
				.where({ id: gymUserId})
				.execute()
			if (gymUser === undefined) throw "Invalid Gym User"

			return true
		}catch(error){
			return false
		}
	}
	@GQL.Query(returns => Date)
	public async  getTransactionEndDateDry(
		@GQL.Arg("packages") packages : number,
		@GQL.Arg("packageMagnitude") packageMagnitude : number,
		@GQL.Arg("startDate") startDate: Date
	){
		return this.getDueDate(packages,packageMagnitude,startDate)
	}

	public async getDueDate(packages: number,
							packageMagnitude: number,
							startDate: Date
							)
		{
			let pckg = await GymPackage.find({ where: { id: packages } })
			let duration: any = pckg[0].duration
			return moment(startDate).add(packageMagnitude * pckg[0].count , duration).toDate()
		}
}
