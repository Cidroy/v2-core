import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import ISlotBlock from "@classes/interface/ISlotBlock"

@DB.Entity()
@GQL.ObjectType()
export default class SlotBlock extends Base implements ISlotBlock {
	
	@GQL.Field(type => Date)
	@DB.Column("date")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("date")
	public End!: Date

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bookingType!: number

}