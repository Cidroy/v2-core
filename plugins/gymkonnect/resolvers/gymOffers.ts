import * as GQL from "type-graphql"
import GymOffers from "@plugins/gymkonnect/model/gymOffers"

@GQL.Resolver(of => GymOffers)
export default class GymOffersResolver {

	@GQL.Query(returns => [GymOffers,])
	public async gymOffers() {
		return GymOffers.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => GymOffers)
	public async addGymOffer(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", {nullable :true}) description: string,
		@GQL.Arg("startDate", {nullable :true}) startDate: Date,
		@GQL.Arg("endDate", {nullable :true}) endDate: Date,
		@GQL.Arg("isPrebookAvailable", {nullable :true}) isPrebookAvailable: boolean,
		@GQL.Arg("PrebookStartDate", {nullable :true}) PrebookStartDate: Date,
	) {

		let gymOffers = new GymOffers()
		gymOffers.name = name
		gymOffers.description = description
		startDate && (gymOffers.startDate = startDate)
		endDate && (gymOffers.endDate = endDate)
		isPrebookAvailable && (gymOffers.isPrebookAvailable = isPrebookAvailable)
		PrebookStartDate && (gymOffers.PrebookStartDate = PrebookStartDate)

		await gymOffers.save()
		return gymOffers
	}
}