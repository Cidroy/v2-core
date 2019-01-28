import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IGymPurpose from "@classes/interface/IGymPurpose"

@DB.Entity()
@GQL.ObjectType()
export default class GymPurpose extends Base implements IGymPurpose {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}