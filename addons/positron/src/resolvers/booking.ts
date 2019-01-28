import * as GQL from "type-graphql"
import Booking from "@positron/models/booking"

@GQL.Resolver(of => Booking)
export default class BookingResolver {

	@GQL.Query(returns => [Booking,])
	public async bookings() {
		return Booking.find()
	}

	@GQL.Mutation(returns => Booking)
	public async addBooking(
		@GQL.Arg("user") user: string,
		@GQL.Arg("bookingType") bookingType: string,
		@GQL.Arg("start") start: Date,
		@GQL.Arg("end") end: Date,
		@GQL.Arg("bookingPackage", { nullable: true }) bookingPackage?: string,
		@GQL.Arg("bookingAddons", type => [ String, ], { nullable: true, }) bookingAddons?: string[],
		@GQL.Arg("payment", { nullable: true }) payment?: string
	) {

		let booking = new Booking()
		booking.user = user
		booking.bookingType = bookingType
		booking.start = start
		booking.end = end
		if (bookingPackage) booking.bookingPackage = bookingPackage
		if (bookingAddons) booking.bookingAddons = bookingAddons
		if (payment) booking.payment = payment

		await booking.save()
		return booking
	}
}