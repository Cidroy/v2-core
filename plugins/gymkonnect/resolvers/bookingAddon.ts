import * as GQL from "type-graphql"
import BookingAddon from "@plugins/gymkonnect/model/bookingAddon"

@GQL.Resolver(of => BookingAddon)
export default class BookingAddonResolver {

	@GQL.Query(returns => [BookingAddon,])
	public async bookingAddons() {
		return BookingAddon.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => BookingAddon)
	public async addBookingAddon(
		@GQL.Arg("name") name: string,
		@GQL.Arg("description", { nullable: true }) description: string,
	) {
		let bookingAddon = new BookingAddon()
		bookingAddon.name = name
		if(description)bookingAddon.description = description

		await bookingAddon.save()
		return bookingAddon
	}
}