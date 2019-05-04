import * as GQL from "type-graphql"
import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import IPayment from "@plugins/gymkonnect/interfaces/IPayment"

@GQL.ObjectType()
@DB.Entity("payments")
export default class Payment extends Base implements IPayment{
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public mode! : number

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public receipt! : string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description! : string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public note! : string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public serviceType! : string

	@GQL.Field(type => Number ,{nullable: true})
	@DB.Column("integer", { nullable: true })
	public transacionId? : number

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public amount! : number

	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable: true})
	public adjustment! : number

	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable: true})
	public userId! : number

	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable: true})
	public taxAmount! : number

	// TODO: [Nikhil] make field resolver for details
	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable: true})
	public taxType! : number

}
