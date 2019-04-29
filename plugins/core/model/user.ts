import Base from "@plugins/core/model/base"
import { GENDER } from "@classes/enum/misc"
import * as GQL from "type-graphql"
import * as DB from "typeorm"
import * as Validate from "class-validator"
import { IUser } from "@classes/interface/IUser"

GQL.registerEnumType(GENDER, {
	name: "GENDER",
	description: "Gender of client"
})
@GQL.ObjectType()
export class WdmsID {
	@GQL.Field(type => Number)
	public zoneID!: number
	@GQL.Field(type => Number)
	public userID!: number
}
@DB.Entity()
@GQL.ObjectType()
export default class User extends Base implements IUser {
	@GQL.Field(type => String,{nullable: true})
	@DB.Column("varchar", { nullable:true, unique: true })
	public badgenumber?: string

	@GQL.Field(type => [WdmsID,])
	@DB.Column("simple-json", { nullable: true})
	public wdmsId?: WdmsID[]

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public firstName!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { length: 30, nullable: true  })
	public middleName?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { length: 30, nullable: true  })
	public lastName?: string

	@GQL.Field(type => Date, { nullable: true})
	@DB.Column("datetime", { default : null, nullable: true})
	public dob?: Date

	@GQL.Field(type => GENDER)
	@DB.Column({
		type: "enum",
		enum: GENDER
	})
	public gender?: GENDER

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30, nullable: false, unique: true })
	@Validate.IsPhoneNumber("IN")
	public mobile!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { length: 30, nullable: true })
	public whatsapp?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { length: 30, nullable: true })
	public officePhone?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { length: 30, nullable: true })
	public homeNumber?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { default: null })
	@Validate.IsEmail()
	public email?: string

	// @GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public address?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public IDType?: number

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public IDNumber?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public imagePath?: string

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public occupation?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public organization?: number

	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public category?: number

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public emergencyName?: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public emergencyNumber?: string

}