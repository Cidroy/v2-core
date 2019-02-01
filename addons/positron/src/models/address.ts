import IAddress from "@classes/interface/IAddress"
import Base from "@positron/models/base"
import * as DB from "typeorm"
import * as GQL from "type-graphql"

import { ADDRESS_TYPE } from "@classes/enum/misc"
import User from "./user"

GQL.registerEnumType(ADDRESS_TYPE,{
	name: "ADDRESS_TYPE",
	description: "Address type"
})

@DB.Entity()
export default class Address extends Base implements IAddress{
	@DB.ManyToOne(type => User, user => user.address)
	public user!: number

	@DB.Column({
		type: "enum",
		enum: ADDRESS_TYPE
	})
	public type!: ADDRESS_TYPE

	@DB.Column("varchar")
	public receiver!: string

	@DB.Column("varchar")
	public contact!: string

	@DB.Column("varchar")
	public house!: string

	@DB.Column("varchar")
	public locality?: string

	@DB.Column("varchar")
	public landmark?: string

	@DB.Column("varchar", { length: 50 })
	public city!: string

	@DB.Column("varchar", { length: 50 })
	public state!: string

	@DB.Column("varchar", { length: 50 })
	public country!: string

	@DB.Column("varchar", { length: 20 })
	public pincode!: string

	// TODO: implement toString()
}