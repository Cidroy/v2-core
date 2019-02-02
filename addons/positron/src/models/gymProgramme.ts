import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IGymProgramme from "@classes/interface/IGymProgramme"

@DB.Entity()
@GQL.ObjectType()
export default class GymProgramme extends Base implements IGymProgramme {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}