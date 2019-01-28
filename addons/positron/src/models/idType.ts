import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IIDType from "@classes/interface/IIDType"

@DB.Entity()
@GQL.ObjectType()
export default class IDType extends Base implements IIDType {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}