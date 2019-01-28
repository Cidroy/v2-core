import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IBooking from "@classes/interface/IBooking"

@DB.Entity()
@GQL.ObjectType()
export default class Booking extends Base implements IBooking {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public user!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public bookingType!: string

	@GQL.Field(type => Date)
	@DB.Column("date")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("date")
	public end!: Date

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public bookingPackage?: string

	@GQL.Field(type => [String,])
	@DB.Column("simple-array", {nullable: true })
	public bookingAddons?: string[]

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public payment?: string

}