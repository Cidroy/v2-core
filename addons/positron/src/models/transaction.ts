import ITransaction from "@classes/interface/ITransaction"
import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"

@GQL.ObjectType()
@DB.Entity("user_transaction")
export default class Transaction extends Base implements ITransaction{
	@GQL.Field(type => String)
	@DB.Column("varchar")
	public user!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public mode?: string

	@GQL.Field(type => Date)
	@DB.Column("date")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("date")
	public end!: Date

	@GQL.Field(type => Date)
	@DB.Column("date")
	public endExtendedDate!: Date

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public dueDaysCount?: number

	@GQL.Field(type => [Date,], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public dueDays?: Date[]

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public freezeCount?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public freezeDays?: number

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public freezeId?: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public payment!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public paymentWorkoutCard?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public receipt?: string

	@GQL.Field(type => [ String, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public offer?: string[]

	@GQL.Field(type => [ String, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public addon?: string[]

	@GQL.Field(type => [ String, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public programme?: string[]

	@GQL.Field(type => [ String, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public purpose?: string[]

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public package?: string

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public amount?: number

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public workoutCardStatus?: string

}