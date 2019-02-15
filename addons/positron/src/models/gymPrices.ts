import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IGymPrices from "@classes/interface/IGymPrices"

@DB.Entity()
@GQL.ObjectType()
export default class GymPrices extends Base implements IGymPrices {
	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public name?: string
	
	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public category?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public timeSlot?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public group?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public gymProgramme?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public gymPackage?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public membershipType?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public counsellorType?: number
	
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public trainerType?: number
	
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public price!: number
	
}