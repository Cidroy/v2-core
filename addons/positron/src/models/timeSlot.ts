import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ITimeSlot from "@classes/interface/ITimeSlot"

@DB.Entity()
@GQL.ObjectType()
export default class TimeSlot extends Base implements ITimeSlot {

	@GQL.Field(type => String)
	@DB.Column("varchar", {unique:true})
	public name!: string

	@GQL.Field(type => String)
	@DB.Column("time", { nullable: false })
	public startTime!: string

	@GQL.Field(type => String)
	@DB.Column("time", { nullable: false })
	public endTime!: string

}