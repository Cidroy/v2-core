import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IBookingType from "@classes/interface/IBookingType"

@DB.Entity()
@GQL.ObjectType()
export default class BookingType extends Base implements IBookingType {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public user! : string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name! : string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string | undefined

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public slotDuration! : number

	@GQL.Field(type => Date)
	@DB.Column("date")
	public slotStart! : Date

	@GQL.Field(type => Date)
	@DB.Column("date")
	public slotEnd! : Date

}