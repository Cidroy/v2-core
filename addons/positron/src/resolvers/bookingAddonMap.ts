import * as GQL from "type-graphql"
import BookingAddonMap from "@positron/models/bookingAddonMap"

@GQL.Resolver(of => BookingAddonMap)
export default class BookingAddonMapResolver {

	@GQL.Query(returns => [BookingAddonMap,])
	public async bookingAddonMaps() {
		return BookingAddonMap.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => BookingAddonMap)
	public async addBookingAddonMap(
		@GQL.Arg("bookingType") bookingType: number,
		@GQL.Arg("bookingAddon", { nullable: true }) bookingAddon: number,
	) {
		let bookingAddonMap = new BookingAddonMap()
		bookingAddonMap.bookingType = bookingType
		bookingAddonMap.bookingAddon = bookingAddon

		await bookingAddonMap.save()
		return bookingAddonMap
	}
}