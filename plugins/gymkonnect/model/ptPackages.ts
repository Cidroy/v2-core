import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IPTPackages from "@plugins/gymkonnect/interfaces/IPTPackages"

@DB.Entity()
@GQL.ObjectType()
export default class PTPackages extends Base implements IPTPackages {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}