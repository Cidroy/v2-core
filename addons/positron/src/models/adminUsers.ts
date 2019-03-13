import * as DB from "typeorm"
import * as GQL from "type-graphql"

import Base from "@positron/models/base"
import { IAdminUsers } from "@classes/interface/IAdminUsers"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

GQL.registerEnumType(PASSWORD_PREFERENCE, {
	name: "PASSWORD_PREFERENCE",
	description: "Password preference of client"
})

@GQL.ObjectType()
@DB.Entity()
export default class AdminUsers extends Base implements IAdminUsers {
	@GQL.Field(type => Number)
	@DB.Column("integer", { nullable: false, unique: true })
	public userId!: number

	@GQL.Field(type => [Number,], { nullable: true })
	@DB.Column("simple-array", { nullable: true })
	public referredToUsers?: number[]

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 30 })
	public username!: string

	// @GQL.Field(type => String,{nullable: true})
	@DB.Column("varchar",{nullable: true})
	public password?: string

	// @GQL.Field(type => String,{nullable: true})
	@DB.Column("varchar",{nullable: true})
	public pin?: string

	@GQL.Field(type => PASSWORD_PREFERENCE)
	@DB.Column({
		type: "enum",
		enum: PASSWORD_PREFERENCE,
	})
	public passwordPreference: PASSWORD_PREFERENCE = PASSWORD_PREFERENCE.PASSWORD

	@GQL.Field(type => Number)
	@DB.Column("integer")
	public access: number = 0

	@GQL.Field(type => [String,], {nullable: true})
	@DB.Column("simple-json", {nullable: true})
	public permissions?: object
}