import * as GQL from "type-graphql"
import GymPrices from "@positron/models/doorRules"

@GQL.Resolver(of => GymPrices)
export default class GymPricesResolver {

	@GQL.Query(returns => [GymPrices,])
	public async doorRules() {
		return GymPrices.find({ where: { active: 1 } })
	}
	@GQL.Query(returns => Number)
	public async getPrice(
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("name", { nullable: true }) name: string,
		@GQL.Arg("group", { nullable: true }) group: number,
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
			group: group,
			gymProgramme: gymProgramme,
			gymPackage: gymPackage,
			membershipType: membershipType,
			counsellorType: counsellorType,
			trainerType: trainerType,
			timeSlot: timeSlot,
			name: name,
		}
		Object.keys(where).forEach(key => where[key] === undefined && delete where[key])
		let doorRules = await GymPrices.find({ where })
		if (doorRules === undefined) throw "Invalid Price"
		console.log(doorRules)
		return doorRules[0] === undefined ? 0 : doorRules[0]
		// .price
	}

	@GQL.Mutation(returns => GymPrices)
	public async addGymPrice(
		@GQL.Arg("name", { nullable: true }) name: string,
		@GQL.Arg("price") price: number,
		@GQL.Arg("description", { nullable: true }) description: string,
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("group", { nullable: true }) group: number,
		@GQL.Arg("gymProgramme", { nullable: true }) gymProgramme: number,
		@GQL.Arg("gymPackage", { nullable: true }) gymPackage: number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType: number,
		@GQL.Arg("counsellorType", { nullable: true }) counsellorType: number,
		@GQL.Arg("trainerType", { nullable: true }) trainerType: number,
		@GQL.Arg("timeSlot", { nullable: true }) timeSlot: number,

	) {
		let doorRules = new GymPrices()
		// if (name) doorRules.name = name
		// doorRules.price = price
		// if (description) doorRules.description = description
		// if (category) doorRules.category = category
		// if (group) doorRules.group = group
		if (gymProgramme) doorRules.gymProgramme = gymProgramme
		if (gymPackage) doorRules.gymPackage = gymPackage
		if (membershipType) doorRules.membershipType = membershipType
		if (counsellorType) doorRules.counsellorType = counsellorType
		if (trainerType) doorRules.trainerType = trainerType
		if (timeSlot) doorRules.timeSlot = timeSlot

		await doorRules.save()
		return doorRules
	}
}