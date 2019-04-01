import * as GQL from "type-graphql"
import * as DB from "typeorm"
import Freezes from "@positron/models/freezes"
import GymUsers from "@positron/models/gymUsers"
import Transaction from "@positron/models/transaction"
import GymFreezeRules from "@positron/models/freezeRules"
import User from "@positron/models/user"

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
		const user = await Transaction.createQueryBuilder("transaction")
			.innerJoinAndSelect(GymUsers, "gymUser","gymUser.transaction = transaction.id")
			.innerJoinAndSelect(User, "user","user.id = gymUser.userid")
			.innerJoinAndSelect(GymFreezeRules, "freezeRules", "freezeRules.packages = transaction.packages and freezeRules.programme = transaction.programme and  freezeRules.category = user.category")
			.select(["if(freezeRules.count is null, null, (freezeRules.count - transaction.freezeCount)) as freezeCountAvailable",
					"if(freezeRules.count is null, (freezeRules.maxDays - transaction.freezeDays) , (freezeRules.count*freezeRules.maxDays - transaction.freezeDays)) as freezeDaysAvailable",])
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
	public async addFreeze(
		@GQL.Arg("user") user : number,
		@GQL.Arg("start") start: Date,
		@GQL.Arg("count", { nullable: true }) count? : number,
		@GQL.Arg("end", { nullable: true }) end? : Date,
		@GQL.Arg("payment", { nullable: true }) payment? : number,
		@GQL.Arg("transaction", { nullable: true }) transaction? : number,
		@GQL.Arg("days", { nullable: true }) days? : number,
	){
		let freezes = new Freezes()
		freezes.user = user
		freezes.start = start
		if(count) freezes.count = count
		if(end) freezes.end = end
		if(payment) freezes.payment = payment
		if(transaction) freezes.transaction = transaction
		if(days) freezes.days = days

		await freezes.save()
		return freezes
	}
}