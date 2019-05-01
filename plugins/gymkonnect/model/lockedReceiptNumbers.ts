import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ILockedReceiptNumber from "@plugins/gymkonnect/interfaces/ILockedReceiptNumber"

@DB.Entity()
@GQL.ObjectType()
export default class LockedReceiptNumber extends Base implements ILockedReceiptNumber {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false, unique: true })
	public receiptNumber!: number

}