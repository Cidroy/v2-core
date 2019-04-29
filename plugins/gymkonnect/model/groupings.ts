import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGroupings from "@classes/interface/IGroupings"

@DB.Entity()
@GQL.ObjectType()
export default class Groupings extends Base implements IGroupings {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public defaultCount!: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public minCount!: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public maxCount!: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public serviceType!: number

}