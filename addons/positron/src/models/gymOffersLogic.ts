import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IGymOffersLogic from "@classes/interface/IGymOffersLogic"

@DB.Entity()
@GQL.ObjectType()
export default class GymOffersLogic extends Base implements IGymOffersLogic {
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public offer!: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public programme?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public category?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public packages?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public group?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public membershipType?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public discountPercentage?: number

}