import Base from "./base"
import ICustomer from "@classes/interface/ICustomer"
import {GENDER} from "@classes/enum/misc"
import * as GQL from "type-graphql"
import * as DB from "typeorm"
import * as Validate from "class-validator"
import { mysql } from "safesql"

GQL.registerEnumType(GENDER, {
	name: "GENDER",
	description: "Gender of client"
})

@GQL.ObjectType()
@DB.Entity("user_data")
export default class User extends Base implements ICustomer{
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public badgenumber!: number
	
	@GQL.Field(type => Number)
	@DB.Column("integer")
	public wdmsId!: number

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public mode!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public name!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public idCard!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public image!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public occupation!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public mobile!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30, nullable: true })
	public whatsapp?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30, nullable: true })
	public officePhone?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	@Validate.IsEmail()
	public email?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public address?: string

	@GQL.Field(type => Date)
	@DB.Column("date", { nullable: true })
	public dob?: Date

	@GQL.Field(type => GENDER)
	@DB.Column({
		type: "enum",
		enum: GENDER
	})
	public gender!: GENDER

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public enquiryInitial?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public enquiryRecent?: string

	@GQL.Field(type => Date)
	@DB.Column("date")
	public doj!: Date

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public healthJoining?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public healthCurrent?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public referredBy?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public referredOther?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public transferFrom?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public transferTo?: string

	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: true })
	public balance?: number

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public transaction?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public diet?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public personalTraining?: number

	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: true })
	public counselling?: string

	@GQL.Field(type => Date)
	@DB.Column("time")
	public preferredTime!: Date

	public async beforeInsert(){
		super.beforeInsert()
		if(!this.badgenumber){
			let sql = User.createQueryBuilder()
				.select("MAX(`badgenumber`)", "badgenumber")
				.getSql()
			let result = await User.query(sql)
			result = result[0]
			if(!result.badgenumber) result.badgenumber = 0
			++result.badgenumber
			this.badgenumber = result.badgenumber
		}
	}
}