import ITransaction from "@classes/interface/ITransaction"
import * as DB from "typeorm"
import Base from "./base"
import * as GQL from "type-graphql"

@GQL.ObjectType()
@DB.Entity()
export default class Transaction extends Base implements ITransaction{
	// @GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer",{nullable: true})
	public gymUser?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public mode?: number

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public start!: Date

	@GQL.Field(type => Date)
	@DB.Column("datetime")
	public end!: Date

	@GQL.Field(type => Date)
	@DB.Column("datetime")
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

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public freezeId?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public payment?: number
 
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public paymentWorkoutCard?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public membershipType?: number

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public receipt?: string

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public offer?: number

	@GQL.Field(type => [ Number, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public addon?: number[]

	@GQL.Field(type => [ Number, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public programme?: number[]

	@GQL.Field(type => [ Number, ], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public purpose?: number[]

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public packages!: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public packageMagnitude!: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public amount?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public workoutCardStatus?: number

}