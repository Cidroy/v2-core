import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ISpaBooking from "@plugins/gymkonnect/interfaces/ISpaBooking"

@DB.Entity()
@GQL.ObjectType()
export default class SpaBooking extends Base implements ISpaBooking {
	@GQL.Field(type => [Number,], { nullable: true })
	@DB.Column("simple-array", {nullable: true})
	public amenities!: number[]

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public grouping!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public category!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public attendees!: number

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public startDate!: Date

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public endDate!: Date

	@GQL.Field(type => Date)
	@DB.Column("time")
	public time!: Date

	@GQL.Field(type => Number,{nullable: true})
	@DB.Column("integer",{nullable: true})
	public payment?: number

	@GQL.Field(type => Number,{nullable: true})
	@DB.Column("integer",{nullable: true})
	public user!: number

}
