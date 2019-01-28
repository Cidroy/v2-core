import * as GQL from "type-graphql"
import BookingType from "@positron/models/bookingType"

@GQL.Resolver(of => BookingType)
export default class BookingTypeResolver{
	@GQL.Mutation(returns => BookingType)
	public async addBookingType(
		@GQL.Arg("user") user : string,
		@GQL.Arg("name") name : string,
		@GQL.Arg("slotDuration") slotDuration: number,
		@GQL.Arg("slotStart") slotStart: Date,
		@GQL.Arg("slotEnd") slotEnd: Date,
		@GQL.Arg("description", { nullable: true }) description?: string,
	){
		let bookingType = new BookingType()
		bookingType.user = user
		bookingType.name = name
		if(description) bookingType.description = description
		bookingType.slotDuration = slotDuration
		bookingType.slotStart = slotStart
		bookingType.slotEnd = slotEnd
		
		await bookingType.save()
		return bookingType
	}
}