import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IFreezes from "@classes/interface/IFreezes"

@GQL.ObjectType()
@DB.Entity("user_freezes")
export default class Freezes extends Base implements IFreezes{
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public user!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public transaction?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public count?: number

	@GQL.Field(type => Date)
	@DB.Column("date")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("date", { nullable: true })
	public end?: Date

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public payment?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public days?: number

}