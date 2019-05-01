import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IAmenities from "@plugins/gymkonnect/interfaces/IAmenities"

@DB.Entity()
@GQL.ObjectType()
export default class Amenities extends Base implements IAmenities {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public serviceType!: number

}