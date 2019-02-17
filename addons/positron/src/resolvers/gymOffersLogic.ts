import * as GQL from "type-graphql"
import GymOffersLogic from "@positron/models/gymOffersLogic"

const Offer = {
	offer : Number,
	discountPercentage : Number,
}
@GQL.Resolver(of => GymOffersLogic)
export default class GymOffersLogicResolver {

	@GQL.Query(returns => [GymOffersLogic,])
	public async gymOffersLogic() {
		return GymOffersLogic.find({ where: { active: 1 } })
	}
	
	@GQL.Query(returns => String)
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
		let gymOffer = await GymOffersLogic.find({ where })
		if (gymOffer === undefined) throw "Invalid offer"
		console.log(gymOffer)
		return gymOffer[0] === undefined ? "" : gymOffer[0].discountPercentage
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