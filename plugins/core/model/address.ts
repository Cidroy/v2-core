import IAddress from "@classes/interface/IAddress"
import Base from "@plugins/core/model/base"
import * as DB from "typeorm"
import * as GQL from "type-graphql"

import { ADDRESS_TYPE } from "@classes/enum/misc"
import User from "../../../addons/positron/src/models/user"

GQL.registerEnumType(ADDRESS_TYPE,{
	name: "ADDRESS_TYPE",
	description: "Address type"
})

@DB.Entity()
@GQL.ObjectType()
export default class Address extends Base implements IAddress{
	@GQL.Field(type => Number, { nullable: true })
	@DB.Column("integer", { nullable: true })
	public user?: number

	@GQL.Field(type => ADDRESS_TYPE)
	@DB.Column({
		type: "enum",
		enum: ADDRESS_TYPE
	})
	public type!: ADDRESS_TYPE

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public receiver!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public contact!: string

	@GQL.Field(type => String)
	@DB.Column("varchar")
	public house!: string

	@GQL.Field(type => String,{nullable: true})
	@DB.Column("varchar",{nullable: true})
	public locality?: string

	@GQL.Field(type => String,{nullable :true})
	@DB.Column("varchar",{nullable :true})
	public landmark?: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 50 })
	public city!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 50 })
	public state!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 50 })
	public country!: string

	@GQL.Field(type => String)
	@DB.Column("varchar", { length: 20 })
	public pincode!: string

	// TODO: implement toString()
}