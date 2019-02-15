import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"
import IZonesAvailable from "@classes/interface/IZonesAvailable"

@DB.Entity()
@GQL.ObjectType()
export default class ZonesAvailable extends Base implements IZonesAvailable {
	
	@GQL.Field(type => String)
	@DB.Column("varchar",{ nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public zoneName!: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false, unique: true })
	public zoneId!: number

}