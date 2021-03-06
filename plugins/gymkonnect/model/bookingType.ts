import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IBookingType from "@plugins/gymkonnect/interfaces/IBookingType"

@DB.Entity()
@GQL.ObjectType()
export default class BookingType extends Base implements IBookingType {

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name! : string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public slotDuration! : number

	@GQL.Field(type => Date)
	@DB.Column("time")
	public slotStart! : Date

	@GQL.Field(type => Date)
	@DB.Column("time")
	public slotEnd! : Date

}
