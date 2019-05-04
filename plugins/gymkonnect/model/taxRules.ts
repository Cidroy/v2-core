import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ITaxRules from "@plugins/gymkonnect/interfaces/ITaxRules"
import { TAX_TYPE, SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

GQL.registerEnumType(TAX_TYPE, {
	name: "TAX_TYPE",
	description: "tax type"
})

GQL.registerEnumType(SERVICE_TYPE, {
	name: "SERVICE_TYPE",
	description: "service type"
})

@DB.Entity()
@GQL.ObjectType()
export default class TaxRules extends Base implements ITaxRules {
	@GQL.Field(type => String)
	@DB.Column("varchar", { unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => TAX_TYPE)
	@DB.Column({
		type: "enum",
		enum: TAX_TYPE
	})
	public taxType!: TAX_TYPE

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public magnitude!: number

	@GQL.Field(type => SERVICE_TYPE)
	@DB.Column({
		type: "enum",
		enum: SERVICE_TYPE
	})
	public serviceType!: SERVICE_TYPE

	@GQL.Field(type => Boolean, {nullable: true })
	@DB.Column("tinyint", { default: false})
	public isInclusive?: boolean

	@GQL.Field(type => Boolean, { nullable: true })
	@DB.Column("tinyint", { default: false })
	public showExplicitly?: boolean

}
