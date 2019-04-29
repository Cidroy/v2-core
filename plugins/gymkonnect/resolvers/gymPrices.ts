import * as GQL from "type-graphql"
import GymPrices from "@plugins/gymkonnect/model/gymPrices"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gymPrices/gk-resolver`)
@GQL.Resolver(of => GymPrices)
export default class GymPricesResolver {

	@GQL.Query(returns => [GymPrices,])
	public async gymPrices() {
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
			name : name,
		}
		Object.keys(where).forEach(key => where[key] === undefined && delete where[key])
		let gymPrices = await GymPrices.find({ where })
		if(gymPrices === undefined || gymPrices.length===0 ) throw "This Combination is not supported"
		Console.verbose(gymPrices)
		return gymPrices[0] === undefined ? 0 : gymPrices[0].price
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
		let gymPrices = new GymPrices()
		if(name)gymPrices.name = name
		gymPrices.price = price
		if(description) gymPrices.description = description
		if(category) gymPrices.category = category
		if(group) gymPrices.group = group
		if(gymProgramme) gymPrices.gymProgramme = gymProgramme
		if(gymPackage) gymPrices.gymPackage = gymPackage
		if(membershipType) gymPrices.membershipType = membershipType
		if(counsellorType) gymPrices.counsellorType = counsellorType
		if(trainerType) gymPrices.trainerType = trainerType
		if(timeSlot) gymPrices.timeSlot = timeSlot

		await gymPrices.save()
		return gymPrices
	}
}