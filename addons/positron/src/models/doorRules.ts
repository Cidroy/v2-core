import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IDoorRules from "@classes/interface/IDoorRules"

@DB.Entity()
@GQL.ObjectType()
export default class DoorRules extends Base implements IDoorRules {
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public category?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public timeSlot?: number
	
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
	public zoneId!: number
}