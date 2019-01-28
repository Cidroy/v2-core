import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IBookingAddon from "@classes/interface/IBookingAddon"

@DB.Entity()
@GQL.ObjectType()
export default class BookingAddon extends Base implements IBookingAddon {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public bookingType!: string

}