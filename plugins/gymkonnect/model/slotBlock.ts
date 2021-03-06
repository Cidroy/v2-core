import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ISlotBlock from "@plugins/gymkonnect/interfaces/ISlotBlock"

@DB.Entity()
@GQL.ObjectType()
export default class SlotBlock extends Base implements ISlotBlock {

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public End!: Date

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bookingType!: number

}
