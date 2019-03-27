import * as GQL from "type-graphql"
import * as DB from "typeorm"
import GymUsers from "@positron/models/gymUsers"
import GymUserMode from "@positron/models/gymUserMode"
import User from "@positron/models/user"
import Transaction from "@positron/models/transaction"
import { Logger } from "@classes/CONSOLE"
import Groups from "@positron/models/groups"
import GroupMap from "@positron/models/groupMap"
import {getWdmsIdForUserId} from "@positron/resolvers/user"
import DoorRules from "@positron/models/doorRules"
import ZonesAvailable from "@positron/models/zonesAvailable"
import Member from "@positron/Biometric/Member"

const Console = new Logger(`gql-resolver/gymUsers`)

@GQL.Resolver(of => GymUsers)
export default class GymUsersResolver {
	@GQL.FieldResolver(returns => Groups, { nullable: true })
	public async userGroupDetails(@GQL.Root() gymUser: GymUsers) {
		if (gymUser.isGrouped) {
			let groupMap = await GroupMap.findOne({ where: { active: 1, gymUserId: gymUser.id } })
			if (groupMap === undefined) throw "No group found for this user"
			return Groups.findOne({ where: { active: 1, gymUserId: groupMap.groupId } })
		} else {
			return null
		}
	}

	@GQL.FieldResolver(returns => Boolean, { nullable: true })
	public async enrolled(@GQL.Root() gymUser: GymUsers) {
		// let user = await User.findOne({ where: { active: 1, id: gymUser.userId } })
		let zone = await ZonesAvailable.findOne({ where: { active: 1, zoneName: "Unfreezed" } })
		if( zone=== undefined )throw "zone does not exist"
		let userinfoId = await getWdmsIdForUserId(gymUser.userId, zone.zoneId)
		if (userinfoId === 0) return false
		let entityManager = DB.getManager()
		let userinfo = await entityManager.query("select IF(COUNT(template.userid)>0 , true,false) as enrolled_status from userinfo LEFT JOIN template on template.userid = userinfo.userid where userinfo.userid = ?",
			[userinfoId,])
		console.log(userinfo[0].enrolled_status,"========================================================================")
		console.log(userinfo[0])
		return !!parseInt(userinfo[0].enrolled_status)
		// return Math.random() >= 0.5
	}

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

	@GQL.Query(returns => GymUsers)
	public async gymUserDetails(
		@GQL.Arg("userId") userId: number
	) {
		return GymUsers.findOne({ where: { active: 1, userId: userId} })
	}

	@GQL.Mutation(returns => Boolean)
	public async activateGymUsers(
		@GQL.Arg("userIDs", type => [Number,]) userIDs: number[],
	){
		try{
			for (let i in userIDs){
				let gymUser = await GymUsers.findOne({ where: { userId: userIDs[i] } })
				let user = await User.findOne({ where: { id: userIDs[i] } })
				if(user === undefined) throw "User doesnt exist"
				if (gymUser === undefined) throw "gym User doesnt exist"
				let transaction = await Transaction.findOne({ where: { id: gymUser.transaction } })
				if (transaction === undefined) throw "User's transaction doesnt exist"
				let where = {
					active: 1,
					category: user.category,
					gymProgramme: transaction.programme,
					gymPackage: transaction.packages,
					membershipType: transaction.membershipType,
					// counsellorType: gymUser.co,
					// trainerType: transaction.trai,
					timeSlot: gymUser.timeSlot,
				}
				Object.keys(where).forEach(key => where[key] === undefined && delete where[key])
				let doorRules = await DoorRules.find({ where })
				if (doorRules === undefined) throw "Invalid zone"
				console.log(doorRules)
				let zoneIds = doorRules[0] === undefined ? [0,] : doorRules[0].zoneIds
				// FIXME: [Vicky]
				let unfreezedZone = await ZonesAvailable.findOne({ where: { active: 1, zoneName: "Unfreezed" } })
				if (unfreezedZone === undefined) throw "Undefined zone"
				let unfreezedId = await getWdmsIdForUserId(userIDs[i], unfreezedZone.zoneId)
				for( let zoneId in zoneIds){
					let zone = await ZonesAvailable.findOne({ where: { active: 1, zoneId: zoneId} })
					if(zone=== undefined) throw "Undefined zone"
					if(zone.zoneName== "Unfreezed") continue
					// Member.AddMemberZone(unfreezedId, unfreezedZone)
					// Member.AddMemberZone()
				}
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
		@GQL.Arg("timeSlot", { nullable: true }) timeSlot?: number,
		@GQL.Arg("agreement", { nullable: true }) agreement?: number,
		@GQL.Arg("doj", { nullable: true }) doj?: Date,
	) {
		let userMode = await GymUserMode.findOne({where: {name: "TEMPORARY"}})
		if(userMode == undefined) throw " Mode doesn't exist"
		let gymUsers = new GymUsers()
		gymUsers.userId = userId
		gymUsers.mode = (mode) ? mode : userMode.id
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
		if (timeSlot) gymUsers.timeSlot = timeSlot
		if (agreement) gymUsers.agreement = agreement
		if (doj) gymUsers.doj = doj

		await gymUsers.save()
		return gymUsers
	}
}