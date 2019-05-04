import * as GQL from "type-graphql"
import Booking from "@plugins/gymkonnect/model/booking"

@GQL.Resolver(of => Booking)
export default class BookingResolver {

	@GQL.Query(returns => [Booking,])
	public async bookings() {
		let bookings = await Booking.find({ where: { active: 1 } })
		return bookings
	}

	@GQL.Mutation(returns => Booking)
	public async addBooking(
	@GQL.Arg("user") user: number,
	@GQL.Arg("bookingType") bookingType: number,
	@GQL.Arg("start") start: Date,
	@GQL.Arg("end") end: Date,
	@GQL.Arg("bookingPackage", { nullable: true }) bookingPackage?: number,
	@GQL.Arg("bookingAddons", type 	=> [ Number, ], { nullable: true, }) bookingAddons?: number[],
	@GQL.Arg("payment", { nullable: true }) payment?: number
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
