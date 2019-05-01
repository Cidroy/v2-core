import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IFreezes from "@plugins/gymkonnect/interfaces/IFreezes"

@GQL.ObjectType()
@DB.Entity()
export default class Freezes extends Base implements IFreezes{
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public user!: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public count?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public transaction?: number

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("datetime")
	public start!: Date

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("datetime", { nullable: true })
	public end?: Date

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", {default:0,  nullable: true })
	public payment?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public days?: number

}