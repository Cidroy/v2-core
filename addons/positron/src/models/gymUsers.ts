import Base from "./base"
import { GENDER } from "@classes/enum/misc"
import * as GQL from "type-graphql"
import * as DB from "typeorm"
import IGymUsers from "@classes/interface/IGymUsers"

GQL.registerEnumType(GENDER, {
	name: "GENDER",
	description: "Gender of client"
})

@GQL.ObjectType()
@DB.Entity()
export default class GymUsers extends Base implements IGymUsers {
	@GQL.Field(type => Number)
	@DB.Column("integer",{nullable:false , unique: true})
	public userId!: number

	// @GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", {nullable: true})
	public mode?: number

	@GQL.Field(type => Boolean, { description: "Entity exists", nullable: true })
	@DB.Column("tinyint", { default: false, nullable: true})
	public isGrouped! : boolean

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public enquiryInitial?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public enquiryRecent?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public healthJoining?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public healthCurrent?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public referredByAdmin?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public referredByUser?: number

	@GQL.Field(type => [Number,])
	@DB.Column("simple-array", { nullable: true })
	public referredTo?: number[]

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public referredOther?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public transferFrom?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public transferTo?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public balance?: number

	// @GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public transaction?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public diet?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public personalTraining?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public counselling?: number

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public preferredTime?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public timeSlot ?: number

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public agreement?: number

	@GQL.Field(type => Date)
	@DB.Column("datetime", { nullable: true })
	public doj?: Date
	// public async beforeInsert() {
	// 	super.beforeInsert()
	// 	if (!this.badgenumber) {
	// 		let sql = User.createQueryBuilder()
	// 			.select("MAX(`badgenumber`)", "badgenumber")
	// 			.getSql()
	// 		let result = await User.query(sql)
	// 		result = result[0]
	// 		if (!result.badgenumber) result.badgenumber = 0
	// 		++result.badgenumber
	// 		this.badgenumber = result.badgenumber
	// 	}
	// }
}