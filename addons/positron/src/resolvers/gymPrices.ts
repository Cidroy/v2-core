import * as GQL from "type-graphql"
import GymPrices from "@positron/models/gymPrices"

@GQL.Resolver(of => GymPrices)
export default class GymPricesResolver {

	@GQL.Query(returns => [GymPrices,])
	public async gymPrices() {
		return GymPrices.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymPrices)
	public async addGymPrices(
		@GQL.Arg("name") name: string,
		@GQL.Arg("price") price: number,
		@GQL.Arg("description", { nullable: true }) description: string,
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("groupMagnitude", { nullable: true }) groupMagnitude: number,
		@GQL.Arg("couples", { nullable: true }) couples: boolean,
		@GQL.Arg("gymProgramme", { nullable: true }) gymProgramme: number,
		@GQL.Arg("gymPackage", { nullable: true }) gymPackage: number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType: number,
		@GQL.Arg("counsellorType", { nullable: true }) counsellorType: number,
		@GQL.Arg("trainerType", { nullable: true }) trainerType: number,
		
	) {
		let gymPrices = new GymPrices()
		gymPrices.name = name
		gymPrices.price = price
		if(description) gymPrices.description = description
		if(category) gymPrices.category = category
		if(groupMagnitude) gymPrices.groupMagnitude = groupMagnitude
		if(couples) gymPrices.couples = couples
		if(gymProgramme) gymPrices.gymProgramme = gymProgramme
		if(gymPackage) gymPrices.gymPackage = gymPackage
		if(membershipType) gymPrices.membershipType = membershipType
		if(counsellorType) gymPrices.counsellorType = counsellorType
		if(trainerType) gymPrices.trainerType = trainerType
		
		await gymPrices.save()
		return gymPrices
	}
}