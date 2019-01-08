import { IUser, PASSWORD_PREFERENCE } from "@classes/interface/IUser"
import { GENDER } from "@classes/enum/misc"

import * as Validate from "class-validator"
import * as DB from "typeorm"
import * as GQL from "type-graphql"

import Base from "@positron/models/base"
import Address from "@positron/models/address"

GQL.registerEnumType(PASSWORD_PREFERENCE, {
	name: "PASSWORD_PREFERENCE",
	description: "Password preference of client"
})

GQL.registerEnumType(GENDER, {
	name: "GENDER",
	description: "Gender of client"
})

@GQL.ObjectType()
@DB.Entity()
export default class Client extends Base implements IUser{
	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public firstName!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public middleName?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public lastName?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public username!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public password!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public pin!: string

	@GQL.Field(type => PASSWORD_PREFERENCE)
	@DB.Column({
		type: "enum",
		enum: PASSWORD_PREFERENCE,
	})
	public passwordPreference: PASSWORD_PREFERENCE = PASSWORD_PREFERENCE.PASSWORD

	@GQL.Field(type => Date)
	@DB.Column("date")
	public dob!: Date

	@GQL.Field(type => GENDER)
	@DB.Column({
		type: "enum",
		enum: GENDER
	})
	public gender!: GENDER

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public mobile!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public whatsapp?: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	@Validate.IsEmail()
	public email?: string

	@GQL.Field(type => String)
	@DB.OneToMany(type => Address, address => address.client)
	@DB.Column("varchar")
	public address!: string

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public access: number = 0

	@GQL.Field(type => [String,])
	@DB.Column("simple-json")
	public permissions!: object
}