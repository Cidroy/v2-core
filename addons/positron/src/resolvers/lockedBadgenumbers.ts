import * as GQL from "type-graphql"
import LockedBadgenumbers from "@positron/models/lockedBadgenumbers"

@GQL.Resolver(of => LockedBadgenumbers)
export default class LockedBadgenumbersResolver {

	@GQL.Query(returns => Boolean)
	public async LockedBadgenumbers() {
		let result =  LockedBadgenumbers.find({ where: { badgenumber: "9" } })
		return result !== undefined
	}

	@GQL.Mutation(returns => LockedBadgenumbers)
	public async addLockedBadgenumber(
		@GQL.Arg("badgenumber") badgenumber: string,
	) {
		let lockedBadgenumbers = new LockedBadgenumbers()
		lockedBadgenumbers.badgenumber = badgenumber

		await lockedBadgenumbers.save()
		return lockedBadgenumbers
	}
}