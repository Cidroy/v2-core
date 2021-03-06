import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import IPriceList from "@plugins/gymkonnect/interfaces/IPriceList"

@DB.Entity()
@GQL.ObjectType()
export default class PriceList extends Base implements IPriceList {

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public typeName!: string

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public typeId!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public organization!: number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public price!: number

}
