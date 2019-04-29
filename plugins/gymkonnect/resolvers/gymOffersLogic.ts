import * as GQL from "type-graphql"
import GymOffersLogic from "@plugins/gymkonnect/model/gymOffersLogic"
@GQL.ObjectType()
class Offer  {
	@GQL.Field(type => Number)
	public offer!: number

	@GQL.Field(type => Number)
	public discountPercentage?: number
}
@GQL.Resolver(of => GymOffersLogic)
export default class GymOffersLogicResolver {

	@GQL.Query(returns => [GymOffersLogic,])
	public async gymOffersLogic() {
		return GymOffersLogic.find({ where: { active: 1 } })
	}

	@GQL.Query(returns => [Offer,])
	public async getOffer(
		@GQL.Arg("programme", { nullable: true }) programme: number,
		@GQL.Arg("packages", { nullable: true }) packages: number,
		@GQL.Arg("group", { nullable: true }) group: number,
		@GQL.Arg("category", { nullable: true }) category: number,
		@GQL.Arg("membershipType", { nullable: true }) membershipType: number,
	){
		let where = {
			active: 1,
			category: category,
			group: group,
			programme: programme,
			packages: packages,
			membershipType: membershipType,
		}

		Object.keys(where).forEach(key => where[key] === undefined && delete where[key])
		let gymOffers = await GymOffersLogic.find({ where })
		if (gymOffers === undefined) throw "Invalid offer"
		console.log(gymOffers)
		let i
		let offers: Offer[] = []
		for(i in gymOffers){
			offers.push({ offer:gymOffers[i].offer, discountPercentage: gymOffers[i].discountPercentage })
		}
		return gymOffers[0] === undefined ? [] : offers
	}

	@GQL.Mutation(returns => GymOffersLogic)
	public async addGymOffersLogic(
		@GQL.Arg("offer") offer: number,
		@GQL.Arg("programme", {nullable :true}) programme: number,
		@GQL.Arg("packages", {nullable :true}) packages: number,
		@GQL.Arg("group", {nullable :true}) group: number,
		@GQL.Arg("membershipType", {nullable :true}) membershipType: number,
		@GQL.Arg("category", {nullable :true}) category: number,
		@GQL.Arg("discountPercentage", {nullable :true}) discountPercentage: number,
	) {

		let gymOffersLogic = new GymOffersLogic()
		gymOffersLogic.offer = offer
		if(programme)gymOffersLogic.programme = programme
		if(packages)gymOffersLogic.packages = packages
		if(group)gymOffersLogic.group = group
		if(membershipType)gymOffersLogic.membershipType = membershipType
		if(category)gymOffersLogic.category = category
		if(discountPercentage)gymOffersLogic.discountPercentage = discountPercentage

		await gymOffersLogic.save()
		return gymOffersLogic
	}
}