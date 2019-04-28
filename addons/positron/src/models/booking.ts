import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IBooking from "@classes/interface/IBooking"

@DB.Entity()
@GQL.ObjectType()
export default class Booking extends Base implements IBooking {
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public user!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bookingType!: number

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public end!: Date

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public bookingPackage?: number

	@GQL.Field(type => [Number,], { nullable: true })
	@DB.Column("simple-array", {nullable: true })
	public bookingAddons?: number[]

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public payment?: number

}