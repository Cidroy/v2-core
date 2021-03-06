import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGymUserHealth from "@plugins/gymkonnect/interfaces/IGymUserHealth"

@DB.Entity()
@GQL.ObjectType()
export default class GymUserHealth extends Base implements IGymUserHealth {
	@GQL.Field(type => Number)
	@DB.Column("integer", {nullable: true})
	public gymUser?: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public weight!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public height!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bodyType!: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", {nullable: true})
	public bloodGroup?: number

}
