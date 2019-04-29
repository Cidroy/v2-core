import * as GQL from "type-graphql"
import DoorRules from "@plugins/gymkonnect/model/doorRules"

@GQL.Resolver(of => DoorRules)
export default class DoorRulesResolver {

	@GQL.Query(returns => [DoorRules,])
	public async doorRules() {
		return DoorRules.find({ where: { active: 1 } })
	}
	@GQL.Query(returns => [Number,])
	public async getZones(
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("gymProgramme", { nullable: true }) gymProgramme: number,
		@GQL.Arg("gymPackage", { nullable: true }) gymPackage: number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType: number,
		@GQL.Arg("counsellorType", { nullable: true }) counsellorType: number,
		@GQL.Arg("trainerType", { nullable: true }) trainerType: number,
		@GQL.Arg("timeSlot", { nullable: true }) timeSlot: number,

	) {
		let where = {
			active: 1,
			category: category,
			gymProgramme: gymProgramme,
			gymPackage: gymPackage,
			membershipType: membershipType,
			counsellorType: counsellorType,
			trainerType: trainerType,
			timeSlot: timeSlot,
		}
		Object.keys(where).forEach(key => where[key] === undefined && delete where[key])
		let doorRules = await DoorRules.find({ where })
		if (doorRules === undefined) throw "Invalid zone"
		console.log(doorRules)
		return doorRules[0] === undefined ? 0 : doorRules[0].zoneIds

	}

	@GQL.Mutation(returns => DoorRules)
	public async addDoorRules(
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("gymProgramme", { nullable: true }) gymProgramme: number,
		@GQL.Arg("gymPackage", { nullable: true }) gymPackage: number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType: number,
		@GQL.Arg("counsellorType", { nullable: true }) counsellorType: number,
		@GQL.Arg("trainerType", { nullable: true }) trainerType: number,
		@GQL.Arg("timeSlot", { nullable: true }) timeSlot: number,
		@GQL.Arg("zoneIds", type => [Number,],{ nullable: true }) zoneIds: number[],

	) {
		let doorRules = new DoorRules()
		if (category) doorRules.category = category
		if (gymProgramme) doorRules.gymProgramme = gymProgramme
		if (gymPackage) doorRules.gymPackage = gymPackage
		if (membershipType) doorRules.membershipType = membershipType
		if (counsellorType) doorRules.counsellorType = counsellorType
		if (trainerType) doorRules.trainerType = trainerType
		if (timeSlot) doorRules.timeSlot = timeSlot
		doorRules.zoneIds = zoneIds

		await doorRules.save()
		return doorRules
	}
}