import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGymOffers from "@plugins/gymkonnect/interfaces/IGymOffers"

@DB.Entity()
@GQL.ObjectType()
export default class GymOffers extends Base implements IGymOffers {
	@GQL.Field(type => String)
	@DB.Column("varchar",{unique: true})
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("datetime", { nullable: true })
	public startDate?: Date

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("datetime", { nullable: true })
	public endDate?: Date

	@GQL.Field(type => Boolean, { nullable: true })
	@DB.Column("tinyint", { nullable: true })
	public isPrebookAvailable?: boolean

	@GQL.Field(type => Date, { nullable: true })
	@DB.Column("datetime", { nullable: true })
	public PrebookStartDate?: Date

}