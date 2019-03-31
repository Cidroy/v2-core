import * as GQL from "type-graphql"
import * as DB from "typeorm"
import Freezes from "@positron/models/freezes"
import GymUsers from "@positron/models/gymUsers"
import Transaction from "@positron/models/transaction"
import GymFreezeRules from "@positron/models/freezeRules"
import User from "@positron/models/user"
import moment from "moment"

@GQL.ObjectType()
export class FreezeAvailability  {
	@GQL.Field(type => Number, { nullable: true })
	public freezeCountAvailable?: number

	@GQL.Field(type => Number, { nullable: true })
	public freezeDaysAvailable?: number
}
@GQL.Resolver(of => Freezes)
export default class FreezeResolver{

	@GQL.Query(returns => [Freezes,])
	public async freezings(
		@GQL.Arg("start", { nullable: true }) start?: string,
		@GQL.Arg("end", { nullable: true }) end?: string,
	) {
		return Freezes.find({
			createdAt: DB.Between(start, end ? end : new Date().toJSON().slice(0, 10).replace(/-/g, "/"))
		})
	}

	@GQL.FieldResolver(returns => GymUsers, { nullable: true })
	public async userDetails(@GQL.Root() freeze: Freezes) {
		return GymUsers.findOne({ where: { active: 1, id: freeze.user } })
	}
	@GQL.FieldResolver(returns => Boolean)
	public async paid(@GQL.Root() freeze: Freezes) {
		return freeze.payment !== 0
	}

	@GQL.FieldResolver(returns => FreezeAvailability, { nullable: true })
	public async freezeAvailability(@GQL.Root() freeze: Freezes) {
		//FIXME: Nikhil [ad freezerule.prograamme = transaction.progrmame]
		const user = await Transaction.createQueryBuilder("transaction")
			.innerJoinAndSelect(GymUsers, "gymUser","gymUser.transaction = transaction.id")
			.innerJoinAndSelect(User, "user","user.id = gymUser.userid")
			.innerJoinAndSelect(GymFreezeRules, "freezeRules", "freezeRules.packages = transaction.packages and freezeRules.membershipType = transaction.membershipType and  freezeRules.category = user.category")
			.select(["if(`freezeRules`.`count` is null, 0, (`freezeRules`.`count` - `transaction`.`freezeCount`)) as freezeCountAvailable",
				"if(`freezeRules`.`count` is null, (`freezeRules`.`maxDays` -isnull(`transaction`.`freezeDays`)) , (freezeRules.count*freezeRules.maxDays - isnull(`transaction`.`freezeDays`))) as freezeDaysAvailable ",])
			.groupBy("transaction.id")
			.where({ freezeId: freeze.id })
			.execute()
		return user[0]
	}

	@GQL.Query(returns => Freezes)
	public async userFreezeDetails(
		@GQL.Arg("user") user: number
	) {
		let gymUser = await GymUsers.findOne({ where: { active: 1, userId : user } })
		if (gymUser === undefined) throw "Invalid user"
		return Freezes.findOne({ where: { active: 1 , transaction: gymUser.transaction, user: gymUser.id} })
	}

	@GQL.Query(returns => Number)
	public async freezeAmount(
		@GQL.Arg("user") user: number,
		@GQL.Arg("from") from: string,
		@GQL.Arg("to") to: string
	) {
		return 0
	}

	// @GQL.Query(returns => Boolean)
	// public async memberFreezeDetails() {
	// 	let payment = await Freezes.createQueryBuilder("freezes")
	// 		.leftJoinAndSelect(Address, 'address', 'user.addressId = address.id')
	// 		.where({ id: paymentId })
	// 		.execute()
	// 	console.log(payment)
	// }

	@GQL.Mutation(returns => Freezes)
	public async Unfreeze(
		@GQL.Arg("user") user: number,
		@GQL.Arg("payment", { nullable: true }) payment?: number,
	) {
		let userData = await GymUsers.findOne({ where: { active: 1, userId: user } })
		if (userData === undefined) throw "User doesn't exist"
		let transaction = await Transaction.findOne({where : {active: 1, id: userData.transaction}})
		if (transaction === undefined) throw "transaction doesn't exist"
		let freeze =await Freezes.findOne({ where: { active: 1, id:transaction.freezeId } })
		if (freeze === undefined) throw "Freeze doesn't exist"
		if(payment) freeze.payment = payment
		freeze.end = new Date()
		transaction.freezeCount = (transaction.freezeCount ? transaction.freezeCount: 0) +1
		transaction.freezeDays = (transaction.freezeDays ? transaction.freezeDays : 0) + moment().diff(freeze.start, "days")
		transaction.save()
		freeze.save()

		return freeze
	}

	@GQL.Mutation(returns => Freezes)
	public async addFreeze(
		@GQL.Arg("user") user : number,
		@GQL.Arg("start") start: Date,
		@GQL.Arg("count", { nullable: true }) count? : number,
		@GQL.Arg("end", { nullable: true }) end? : Date,
		@GQL.Arg("payment", { nullable: true }) payment? : number,
		@GQL.Arg("days", { nullable: true }) days? : number,
	){
		let freezes = new Freezes()
		freezes.user = user
		freezes.start = start
		if(count) freezes.count = count
		if(end) freezes.end = end
		if(payment) freezes.payment = payment
		let userData = await GymUsers.findOne({ where: { active: 1, userId: user } })
		if(userData === undefined) throw "User doesn't exist"
		freezes.transaction = userData.transaction
		if(days) freezes.days = days

		await freezes.save()
		return freezes
	}
}