import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IGymUserHealth from "@classes/interface/IGymUserHealth"

@DB.Entity()
@GQL.ObjectType()
export default class GymUserHealth extends Base implements IGymUserHealth {
	@GQL.Field(type => Number)
	@DB.Column("integer", {nullable: true})
	public gymUser?: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public weight!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public height!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public bodyType!: number
	
}