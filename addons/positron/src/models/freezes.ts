import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IFreezes from "@classes/interface/IFreezes"

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
	@DB.Column("date")
	public start!: Date

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("date", { nullable: true })
	public end?: Date

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", {default:0,  nullable: true })
	public payment?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public days?: number

}