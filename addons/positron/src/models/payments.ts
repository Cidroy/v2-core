import * as GQL from "type-graphql"
import * as DB from "typeorm"
import Base from "./base"
import IPayment from "@classes/interface/IPayment"

@GQL.ObjectType()
@DB.Entity("payments")
export default class Payment extends Base implements IPayment{
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public mode! : number
	
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public receipt! : string

	@GQL.Field(type => Number ,{nullable: true})
	@DB.Column("integer", { nullable: true })
	public transacionId? : number
	
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public amount! : number
	
	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable: true})
	public adjustment! : number

}