import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IGymBodyType from "@classes/interface/IGymBodyType"

@DB.Entity()
@DB.Entity()
@GQL.ObjectType()
export default class GymBodyType extends Base implements IGymBodyType {
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String)
	@DB.Column("varchar" , {nullable : true})
	public description?: string

}