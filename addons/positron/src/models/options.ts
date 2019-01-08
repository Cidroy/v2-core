import * as DB from "typeorm"
import Base from "@positron/models/base"
import * as GQL from "type-graphql"

@GQL.ObjectType()
@DB.Entity()
export default class Options extends Base{
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name !: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public value !:string
}