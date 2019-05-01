import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IServicesAvailable from "@plugins/gymkonnect/interfaces/IServicesAvailable"
import { SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

GQL.registerEnumType(SERVICE_TYPE, {
	name: "SERVICE_TYPE",
	description: "service type"
})
@DB.Entity()
@GQL.ObjectType()
export default class ServicesAvailable extends Base implements IServicesAvailable {
	@GQL.Field(type => SERVICE_TYPE)
	@DB.Column({
		type: "enum",
		enum: SERVICE_TYPE,
		nullable: false,
		unique: true
	})
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}