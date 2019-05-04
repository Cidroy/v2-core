import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGymPackage from "@plugins/gymkonnect/interfaces/IGymPackage"
import { DURATION } from "@plugins/gymkonnect/enum/misc"

GQL.registerEnumType(DURATION, {
	name: "DURATION",
	description: "Duration"
})
@DB.Entity()
@GQL.ObjectType()
export default class GymPackage extends Base implements IGymPackage {

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false })
	public count!: number

	@GQL.Field(type => DURATION)
	@DB.Column({
		type: "enum",
		enum: DURATION,
		nullable: false
	})
	public duration!: DURATION

}
