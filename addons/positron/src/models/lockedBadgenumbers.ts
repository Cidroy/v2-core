import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import ILockedBadgenumbers from "@classes/interface/ILockedBadgenumbers"

@DB.Entity()
@GQL.ObjectType()
export default class LockedBadgenumbers extends Base implements ILockedBadgenumbers {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false, unique: true })
	public badgenumber!: number

}