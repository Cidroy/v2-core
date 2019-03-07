import * as GQL from "type-graphql"
import GymUsers from "@positron/models/gymUsers"
import GymUserMode from "@positron/models/gymUserMode"
import User from "@positron/models/user"
import Transaction from "@positron/models/transaction"

@GQL.Resolver(of => GymUsers)
export default class GymUsersResolver {
	@GQL.FieldResolver(returns => User, { nullable: true })
	public async user(@GQL.Root() gymUser: GymUsers) {
		return User.findOne({ where: { active: 1, id: gymUser.userId } })
	}
	@GQL.FieldResolver(returns => GymUserMode, { nullable: true })
	public async mode(@GQL.Root() gymUser: GymUsers) {
		return GymUserMode.findOne({ where: { active: 1, id: gymUser.mode } })
	}
	@GQL.FieldResolver(returns => Transaction, { nullable: true })
	public async transaction(@GQL.Root() gymUser: GymUsers) {
		return Transaction.findOne({ where: { active: 1, id: gymUser.transaction } })
	}

	@GQL.Query(returns => [GymUsers,])
	public async gymUsers() {
		return GymUsers.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => Boolean)
	public async activateGymUsers(
		@GQL.Arg("userIDs", type => [Number,]) userIDs: number[],
	){
		try{
			for (let i in userIDs){
				let gymUser = await GymUsers.findOne({ where: { userId: userIDs[i] } })
				if (gymUser === undefined) throw "invalid user"
				let userMode = await GymUserMode.find({ where: { name: "ACTIVE" } })
				gymUser[0].mode = userMode[0].id
				await gymUser[0].save()
			}
			return true
		}catch(error){
			return false
		}
	}
	
	@GQL.Mutation(returns => GymUsers)
	public async addGymUser(
		@GQL.Arg("userId") userId: number,
		@GQL.Arg("mode", { nullable: true }) mode: number,
		@GQL.Arg("isGrouped", { nullable: true }) isGrouped: boolean,
		@GQL.Arg("enquiryInitial", { nullable: true }) enquiryInitial?: number,
		@GQL.Arg("enquiryRecent", { nullable: true }) enquiryRecent?: number,
		@GQL.Arg("healthJoining", { nullable: true }) healthJoining?: number,
		@GQL.Arg("healthCurrent", { nullable: true }) healthCurrent?: number,
		@GQL.Arg("referredByAdmin", { nullable: true }) referredByAdmin?: number,
		@GQL.Arg("referredByUser", { nullable: true }) referredByUser?: number,
		@GQL.Arg("referredTo",type=> [Number,], { nullable: true }) referredTo?: number[],
		@GQL.Arg("referredOther", { nullable: true }) referredOther?: string,
		@GQL.Arg("transferFrom", { nullable: true }) transferFrom?: number,
		@GQL.Arg("transferTo", { nullable: true }) transferTo?: number,
		@GQL.Arg("balance", { nullable: true }) balance?: number,
		@GQL.Arg("transaction", { nullable: true }) transaction?: number,
		@GQL.Arg("diet", { nullable: true }) diet?: number,
		@GQL.Arg("personalTraining", { nullable: true }) personalTraining?: number,
		@GQL.Arg("counselling", { nullable: true }) counselling?: number,
		@GQL.Arg("preferredTime", { nullable: true }) preferredTime?: string,
		@GQL.Arg("agreement", { nullable: true }) agreement?: number,
		@GQL.Arg("doj", { nullable: true }) doj?: Date,
	) {
		let userMode = await GymUserMode.find({where: {name: "TEMPORARY"}})
		let gymUsers = new GymUsers()
		gymUsers.userId = userId
		gymUsers.mode = (mode) ? mode : userMode[0].id
		if(isGrouped)gymUsers.isGrouped = isGrouped
		if (enquiryInitial) gymUsers.enquiryInitial = enquiryInitial
		if (enquiryRecent) gymUsers.enquiryRecent = enquiryRecent
		if (healthJoining) gymUsers.healthJoining = healthJoining
		if (healthCurrent) gymUsers.healthCurrent = healthCurrent
		if (referredByAdmin) gymUsers.referredByAdmin = referredByAdmin
		if (referredByUser) gymUsers.enquiryInitial = enquiryInitial
		if (referredTo) gymUsers.referredTo = referredTo
		if (referredOther) gymUsers.referredOther = referredOther
		if (transferFrom) gymUsers.transferFrom = transferFrom
		if (transferTo) gymUsers.transferTo = transferTo
		if (balance) gymUsers.balance = balance
		if (transaction) gymUsers.transaction = transaction
		if (diet) gymUsers.diet = enquiryInitial
		if (personalTraining) gymUsers.personalTraining = personalTraining
		if (counselling) gymUsers.counselling = counselling
		if (preferredTime) gymUsers.preferredTime = preferredTime
		if (agreement) gymUsers.agreement = agreement
		if (doj) gymUsers.doj = doj

		await gymUsers.save()
		return gymUsers
	}
}