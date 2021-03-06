import * as GQL from "type-graphql"
import BookingType from "@plugins/gymkonnect/model/bookingType"

@GQL.Resolver(of => BookingType)
export default class BookingTypeResolver{

	@GQL.Query(returns => [BookingType,])
	public async bookingType() {
		return BookingType.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => BookingType)
	public async addBookingType(
		@GQL.Arg("name") name : string,
		@GQL.Arg("slotDuration") slotDuration: number,
		@GQL.Arg("slotStart") slotStart: Date,
		@GQL.Arg("slotEnd") slotEnd: Date,
		@GQL.Arg("description", { nullable: true }) description?: string,
	){
		let bookingType = new BookingType()
		bookingType.name = name
		if(description) bookingType.description = description
		bookingType.slotDuration = slotDuration
		bookingType.slotStart = slotStart
		bookingType.slotEnd = slotEnd

		await bookingType.save()
		return bookingType
	}
}
