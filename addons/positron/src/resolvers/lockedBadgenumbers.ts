import * as GQL from "type-graphql"
import LockedBadgenumbers from "@positron/models/lockedBadgenumbers"

@GQL.Resolver(of => LockedBadgenumbers)
export default class LockedBadgenumbersResolver {

	@GQL.Query(returns => Boolean)
	public async LockedBadgenumbers(
		@GQL.Arg("badgenumber") badgenumber: number
	) {
		let result =  LockedBadgenumbers.find({ where: { badgenumber: badgenumber } })
		return result !== undefined
	}

	@GQL.Mutation(returns => LockedBadgenumbers)
	public async addLockedBadgenumber(
		@GQL.Arg("badgenumber") badgenumber: number,
	) {
		let lockedBadgenumbers = new LockedBadgenumbers()
		lockedBadgenumbers.badgenumber = badgenumber

		await lockedBadgenumbers.save()
		return lockedBadgenumbers
	}
}