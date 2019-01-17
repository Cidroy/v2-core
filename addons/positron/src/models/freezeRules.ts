import * as DB from "typeorm"
import * as GQL from "type-graphql"
import IGymFreezeRules from "@classes/interface/IGymFreezeRules"
import Base from "./base"

@GQL.ObjectType()
@DB.Entity("gym_freeze_rules")
export default class GymFreezeRules extends Base implements IGymFreezeRules{
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public packages!: string

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public count!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public minDays!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public maxDays!: number
}