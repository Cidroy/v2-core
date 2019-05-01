import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGroups from "@plugins/gymkonnect/interfaces/IGroups"

@DB.Entity()
@GQL.ObjectType()
export default class Groups extends Base implements IGroups {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public groupingId!: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public groupCount!: number

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true, unique: true })
	@DB.Generated("uuid")
	public groupName!: string

}