import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IBookingAddonMap from "@plugins/gymkonnect/interfaces/IBookingAddonMap"

@DB.Entity()
@GQL.ObjectType()
export default class BookingAddonMap extends Base implements IBookingAddonMap {
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bookingType!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bookingAddon!: number
}
