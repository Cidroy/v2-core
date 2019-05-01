import { IModification, IEntityBase } from "@plugins/core/interfaces/IEntityBase"
import * as GQL from "type-graphql"
import * as DB from "typeorm"
import { Positron } from "@positron/POSITRON"

@GQL.ObjectType()
export class Modifications implements IModification{
	@GQL.Field(type => Date)
	public modifiedAt!: Date
	@GQL.Field(type => Number)
	public modifier!: number
	@GQL.Field(type => [ String, ])
	public modification!: string[]
}

@GQL.ObjectType()
export default class Base extends DB.BaseEntity implements IEntityBase{
	@GQL.Field(type => Number, { description: "Entity Id" })
	@DB.PrimaryGeneratedColumn()
	public id !: number

	@GQL.Field(type => Boolean, { description: "Entity exists" })
	@DB.Column("tinyint")
	public active : boolean = true

	@GQL.Field(type => Date, { description: "Created at" })
	@DB.Column("datetime")
	public createdAt!: Date

	@GQL.Field(type => Number, { description: "Author of Entity" })
	@DB.Column("integer")
	public author!: number

	@GQL.Field(type => [ Modifications, ], { description: "List of Modifications" })
	@DB.Column("simple-json")
	public modifications: IModification[] = []

	@GQL.Field(type => Date, { description: "Last modification Date", nullable: true })
	@DB.Column("datetime", { nullable: true })
	public lastModifiedAt?: Date

	@GQL.Field(type => Number, { description: "Last Modifier", nullable: true })
	@DB.Column("integer", { nullable: true })
	public lastModifier?: number

	@GQL.Field(type => String, { description: "Last Modifier", nullable: true })
	@DB.Column("varchar", { nullable: true })
	public serverId?: string

	@DB.BeforeInsert()
	public beforeInsert(){
		this.author = Positron.User.id
		this.createdAt = new Date()
	}

	@DB.BeforeUpdate()
	public beforeUpdate(){
		this.lastModifier = Positron.User.id
		this.lastModifiedAt = new Date()
		this.modifications.push({
			modifier: this.lastModifier,
			modifiedAt: this.lastModifiedAt,
			modification: []
		})
	}

	// TODO: implement object-diff to store the difference
}