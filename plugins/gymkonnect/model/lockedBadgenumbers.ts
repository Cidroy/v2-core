import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ILockedBadgenumbers from "@plugins/gymkonnect/interfaces/ILockedBadgenumbers"

@DB.Entity()
@GQL.ObjectType()
export default class LockedBadgenumbers extends Base implements ILockedBadgenumbers {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false, unique: true })
	public badgenumber!: number

}