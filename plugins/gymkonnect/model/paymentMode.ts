import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IPaymentMode from "@plugins/gymkonnect/interfaces/IPaymentMode"

@DB.Entity()
@GQL.ObjectType()
export default class PaymentMode extends Base implements IPaymentMode {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

	@GQL.Field(type => Boolean,{nullable: true})
	@DB.Column("tinyint",{default : false})
	public requireTransactionId?: boolean

}