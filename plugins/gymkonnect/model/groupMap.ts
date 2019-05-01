import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGroupMap from "@plugins/gymkonnect/interfaces/IGroupMap"

@DB.Entity()
@GQL.ObjectType()
export default class GroupMap extends Base implements IGroupMap {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public groupId!: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public gymUserId!: number

}