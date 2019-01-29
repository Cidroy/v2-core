import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IOccupation from "@classes/interface/IOccupation"

@DB.Entity()
@GQL.ObjectType()
export default class Occupation extends Base implements IOccupation {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public description?: string

}