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
export default class Client extends Base {
	
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

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public access: number = 0

	@GQL.Field(type => [String,])
	@DB.Column("simple-json")
	public permissions!: object
}