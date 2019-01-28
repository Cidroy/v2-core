import * as GQL from "type-graphql"
import BookingAddon from "@positron/models/bookingAddon"

@GQL.Resolver(of => BookingAddon)
export default class BookingAddonResolver {
	
	@GQL.Query(returns => [BookingAddon,])
	public async bookingAddons() {
		return BookingAddon.find()
	}

	@GQL.Mutation(returns => BookingAddon)
	public async addBookingAddon(
		@GQL.Arg("name") name: string,
		@GQL.Arg("bookingType") bookingType: string,
	) {
		let bookingAddon = new BookingAddon()
		bookingAddon.name = name
		bookingAddon.bookingType = bookingType

		await bookingAddon.save()
		return bookingAddon
	}
}